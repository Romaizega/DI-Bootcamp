const express = require("express");
const router = express.Router()

const {
  registeUser,
  loginUser,
  getAllUser,
  getUserById,
  updateUser
} = require("../controllers/userControllers.js")


router.post("/register", registeUser);
router.post("/login", loginUser);
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser)


module.exports = router
