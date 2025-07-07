const express = require("express");
const router = express.Router()

const {
  getUsers,
  getUserById,
  updateUser,
  registerUser,
  loginUser,
} = require("../controllers/userControllers")


router.get("/", getUsers);
router.get("/:id", getUserById)
router.put("/:id", updateUser)
router.post("/register", registerUser)
router.post("/login", loginUser)

module.exports = router;