// app.js
const express = require('express');
const cookieParser = require('cookie-parser');
const { router } = require('./auth');
const authenticateJWT = require('./authMiddleware');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/', router);

app.get('/', (req, res) => {
  res.send('Hello, JWT Authentication!');
});

app.get('/profile', authenticateJWT, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}!` });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


// auth.js

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const router = express.Router();
const authenticateJWT = require('./authMiddleware');
const { SECRET_KEY } = require('./config');

const app = express();
const PORT = 5000;

router.use(express.json());
app.use(cookieParser());

const users = [];
const revokedTokens = [];


router.post('/register', async (req, res)=> {
  const {username, password, email} = req.body;

  if(!username || username.length < 3) {
    return res.status(400).json({message: "Username must be at least 3 chars long"})
  };

  const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if(!strongPasswordRegex.test(password)){
    return res.status(400).json({
      message: "Password must be at least 8 characters long and include at least one letter and one number"
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!email || !emailRegex.test(email)) {
    return res.status(400).json({message: "Invalid email format"})
  }

  const exisitUser = users.find(user => user.username === username);
  if(exisitUser) return res.status(400).send("User already exists")

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    email,
    isConfirmed: false
  }
  users.push(newUser)

  const confirmationToken = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: '1d' });
  const confirmLink = `http://localhost:${PORT}/confirm/${confirmationToken}`;
  console.log(`🔗 Confirm your email: ${confirmLink}`);

  res.status(201).json({ message: 'User registered successfully. Please check your email to confirm.' });
});

router.get('/confirm/:token', (req, res) => {
  const { token } = req.params;

  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(400).json({ message: 'Invalid or expired confirmation token' });
    }

    const user = users.find((user) => user.id === decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isConfirmed) {
      return res.status(400).json({ message: 'Email is already confirmed' });
    }

    user.isConfirmed = true;

    res.status(200).json({ message: 'Email confirmed successfully' });
  });
});


router.post('/login', async (req, res)=> {
  const {username, password} = req.body;

  const user = users.find(user => user.username === username);
  if(!user) return res.status(401).json({message: "Invalid user"})

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(401).json({message: "Invalid password"})

   const accessToken = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '7d' });

  res.cookie('token', accessToken, { httpOnly: true });
  res.cookie('refreshToken', refreshToken, { httpOnly: true });
  res.status(200).json({ message: 'Login successful' });
});

router.post('/logout', (req, res) => {
  const refreshToken = req.cookies.refreshToken
  if(refreshToken) {
    revokedTokens.push(refreshToken)
  }
  res.clearCookie('token');
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logout successful' });
});


router.put('/update', authenticateJWT, (req, res)=> {
  const {username: newUsername, password: newPassword} = req.body;

  const user = users.find((user)=> user.id === req.user.id);
  if(!user) return res.status(404).json({message: "User not found"})

      if (newUsername) {
    if (newUsername.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }

    user.username = newUsername;
  }

  if (newPassword) {
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!strongPasswordRegex.test(newPassword)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long and include at least one letter and one number' });
    }

    user.password = bcrypt.hashSync(newPassword, 10);
  }

  res.status(200).json({ message: 'Profile updated successfully' });
})

router.post('/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not found' });
  }

  if (revokedTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Refresh token has been revoked' });
  }

  jwt.verify(refreshToken, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Refresh token verification failed' });
    }

    const accessToken = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.cookie('token', accessToken, { httpOnly: true });
    res.status(200).json({ message: 'Token refreshed successfully' });
  });
});


module.exports = {router, users, SECRET_KEY}


// authMiddleware.js

// authMiddleware.js
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./config');

function authenticateJWT(req, res, next) {
  const accessToken = req.cookies.token;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token not found' });
  }

  jwt.verify(accessToken, SECRET_KEY, (err, user) => {
    if (err) {
      if (!refreshToken) {
        return res.status(403).json({ message: 'Token verification failed' });
      }

      jwt.verify(refreshToken, SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Refresh token verification failed' });
        }

        const newAccessToken = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
          expiresIn: '1h'
        });

        res.cookie('token', newAccessToken, { httpOnly: true });
        req.user = user;
        next();
      });
    } else {
      req.user = user;
      next();
    }
  });
}

module.exports = authenticateJWT;
