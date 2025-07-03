const express = require('express');
const app = express();
const {fetchPosts} = require('./data/dataService.js');
fetchPosts();



const PORT = 5000;
app.listen(PORT, ()=>{
  console.log(`server runs on ${PORT}`);
})

app.get('/api/posts', (req, res) => {
  fetchPosts()
    .then(data => {
      res.json(data);
      console.log("successfully");
    })
    .catch(err => {
      console.error("Failed to fetch posts:", err.message);
      res.status(500).json({ error: 'Failed to fetch posts' });
    });
});