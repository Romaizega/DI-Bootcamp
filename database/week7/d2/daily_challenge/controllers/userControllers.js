const db = require("../models/db")
const bcrypt = require("bcrypt");

const getUsers = async(req, res) => {
  try {
    const users = await db("users")
    .select("*")
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({error: "Server error"})
  }
}

const getUserById = async(req, res) => {
  const id = Number(req.params.id)
  try {
    const user = await db("users")
    .where({id}).first()
  if(!user){
    res.status(404).json({error: "User not found"})
  }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({error: "Server error"})
  }
}

const updateUser = async (req, res) => {
  const id = Number(req.params.id)
  const {email, username, first_name, last_name} = req.body
   try {
    const user = await db("users")
    .where({id}).first();
    if(!user){
      return res.status(404).json("User not foud")
    }
    const[updatUser] = await db("users")
    .where({id})
    .update({email, username, first_name, last_name})
    .returning(["id", "email", "username", "first_name", "last_name"])

   } catch (error) {
     res.status(500).json({ error: "Internal server error" })
   }
}

const registerUser = async (req, res) => {
  const { username, password, email, first_name, last_name } = req.body;

  if (!username || !password || !email || !first_name || !last_name) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    let newUser = null;
    await db.transaction(async trx => {
      const existUser = await trx("users").where({ username }).first();
      if (existUser) {
        throw new Error("Username already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const [user] = await trx("users")
        .insert({
          username,
          email,
          first_name,
          last_name
        })
        .returning("*");
      newUser = user;
      await trx("hashpwd").insert({
        username,
        password: hashedPassword
      });
    });
    res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Registration failed" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const user = await db("hashpwd").where({ username }).first();

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  registerUser,
  loginUser
}