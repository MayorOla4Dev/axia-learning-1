const express = require("express");
const {
	createPost,
	deletePost,
	updatePost,
	getUserPosts,
	getSinglePost,
} = require("../controllers/post.controller");

const route = express.Router();

route.post("/post", createPost);

route.delete("/post", deletePost);

route.put("/post", updatePost);

route.get("/get-all-post", getUserPosts);

route.get("/get-single-post", getSinglePost);
module.exports = route;
