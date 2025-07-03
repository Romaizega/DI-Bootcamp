const axios = require("axios");

const fetchPosts = () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

module.exports = {
  fetchPosts,
};