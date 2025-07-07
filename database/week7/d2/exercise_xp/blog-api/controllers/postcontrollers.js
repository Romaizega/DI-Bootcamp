const db = require("../db")

const getPosts = async (req, res) =>{
  try {
    const posts = await db("posts")
    .select("*")
    res.json(posts)
  } catch (error) {
    res.status(500).json({error: "Server error"})
  }
}

const getPost = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const post = await db("posts")
    .where({id}).first();
    if(!post){
      return res.status(404).json("Post not foud")
    }
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({error: "Post not found"});
  }
}

const postPost = async (req, res) => {
  try {
    const {title, content} = req.body;
    if(!title || !content){
      return  res.status(400).json({error:"Title and content are required"})
    }
    const [newPost] = await db("posts")
    .insert({title, content})
    .returning(["id", "title", "content"])
    res.status(200).json(newPost)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

const updatePost = async(req, res) => {
   const id = Number(req.params.id);
   const {title, content} = req.body
   try {
    const post = await db("posts")
    .where({id}).first();
    if(!post){
      return res.status(404).json("Post not foud")
    }
    const[updPost] = await db("posts")
    .where({id})
    .update({title, content})
    .returning(["id", "title", "content"])

   } catch (error) {
     res.status(500).json({ error: "Internal server error" })
   }
}

const deletePost = async(req, res) => {
  const id = Number(req.params.id);
  try {
    const post = await db("posts")
    .where({id}).first();
    if(!post){
      return res.status(404).json("Post not foud")
    }
    await db("posts").where({id}).del()
    res.status(200).json("Post deleted")
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  getPosts,
  getPost,
  postPost,
  updatePost,
  deletePost,
}