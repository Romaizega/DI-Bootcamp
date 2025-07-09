const { error } = require("console");
const fs = require("fs");
const path = require("path")
const bcrypt = require("bcrypt")

const usersJson = path.join(__dirname, "../models/user.json")


const users = () => {
  try {
    const data = fs.readFileSync(usersJson, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erorr reading file")
    return []
  }
}

const getAllUser = (req, res) =>{
  try {
    res.status(200).json(users())
  } catch (error) {
    res.status(500).json({error: "Server error"})
  }
}

const getUserById = (req, res) => {
  const id = Number(req.params.id)
  try {
    const user = users().find((item)=> item.id ===id)
    if(!user){
      return res.status(404).json({error: "User not found"})
    } 
    res.status(200).json({message: "User founded" ,user})
  } catch (error) {
    res.status(500).json({error: "Server error"})
  }
}

const registeUser = async(req, res) => {
  const {username, first_name, last_name, email, password} = req.body
  if(!username || !first_name || !last_name || !email || !password){
    return res.status(400).json({error: "All fields are required"})
  }
  try {
    const allUser = users()
    const existUser = allUser.find((user)=> user.username === username)
    if(existUser){
      return res.status(409).json({error: "Username already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {username, first_name, last_name, email, password: hashedPassword, id: allUser.length + 1}
    allUser.push(newUser);
    fs.writeFileSync(usersJson, JSON.stringify(allUser, null, 2), "utf-8");
    res.status(201).json({message: "User created", newUser})
    
  } catch (error) {
    console.error("Register user", error)
    res.status(500).json({error: "Server error"})
  }
}

const loginUser = async(req, res) => {
  const allUser = users()
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const existUser = allUser.find((user)=> user.username === username)

    if (!existUser) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
}; 

const updateUser = (req, res) => {
  const id = Number(req.params.id)
  const allUser = users()
  const {username, password, first_name, last_name, email} = req.body
  const index = allUser.findIndex((item)=> item.id === id)
  try {
      if(index === -1){
        return res.status(404).json({error: "User not found"})
      }
    allUser[index] = {...allUser[index], username, password, first_name, last_name, email};
    fs.writeFileSync(usersJson, JSON.stringify(allUser, null, 2), "utf-8");
    res.status(200).json({message: "User updated"})
  } catch (error) {
    res.status(500).json({error: "Server error"})
  }
} 

module.exports = {
  getAllUser,
  getUserById,
  registeUser,
  loginUser,
  updateUser,
}