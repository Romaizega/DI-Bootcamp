const express = require('express');
const app = express()

const dataPosts = [
  {
    id: 1,
    title: "Getting Started with JavaScript",
    content: "JavaScript is a versatile programming language used in web development..."
  },
  {
    id: 2,
    title: "Understanding Node.js",
    content: "Node.js allows JavaScript to run on the server side..."
  },
  {
    id: 3,
    title: "Mastering ES6 Features",
    content: "ES6 introduced several new features like let/const, arrow functions, template literals..."
  }
];

module.exports = {
  dataPosts,
}

const PORT = 3000
app.listen(PORT, () =>{
  console.log(`run on ${PORT}`);
});

app.use(express.json())


// get all posts
app.get('/posts', (req, res) => {
  res.json(dataPosts)
})


// get one post
app.get('/posts/:id', (req, res) => {
  const {id} = req.params;
  const post = dataPosts.find((item) => item.id == id);
  if(!post){
    res.status(404).json({message: "Post not found"});
  }
  res.json(post)
})

// post a post
app.post('/posts', (req, res)=> {
  const {title, content} = req.body;
  const newPost = {title, content, id: dataPosts.length + 1}
  dataPosts.push(newPost);
  res.json(dataPosts)
})

app.put('/posts/:id', (req, res)=>{
  const postId = Number(req.params.id);
  const {title, content} = req.body
  const post = dataPosts.find((item) => item.id == postId);
  if(!post){
    return res.status(404).json({message: "Post not found"});
  }
  if(title) post.title = title;
  if(content) post.content = content
  res.json(post)
})

app.delete('/posts/:id', (req, res)=>{
  const postId = Number(req.params.id);
  const index = dataPosts.findIndex((post) => post.id === postId);
  if (index === -1) {
    return res.status(404).send("Post not found");
  }
  dataPosts.splice(index, 1);
  res.status(200).json("Product deleted");
});