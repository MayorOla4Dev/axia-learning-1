const express = require("express");
const {
	createPost,
	deletePost,
	updatePost,
} = require("../controllers/post.controller");

const route = express.Router();

route.post("/post", createPost);

route.delete("/post", deletePost);

route.put("/post", updatePost);

module.exports = route;
