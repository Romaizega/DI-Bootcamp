const express = require("express")
const router = express.Router()

const {
  getPosts,
  getPost,
  postPost,
  updatePost,
  deletePost,
} = require("../controllers/postcontrollers")

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", postPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost)

module.exports = router;