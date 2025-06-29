const express = require("express");
const {
	createPost,
	deletePost,
	updatePost,
	getUserPosts,
	getSinglePost,
} = require("../controllers/post.controller");
const authentication = require("../middlewares/auth.middleware");

const route = express.Router();

route.post("/post", authentication, createPost);

route.delete("/post", authentication, deletePost);

route.put("/post", updatePost);

route.get("/get-all-post", getUserPosts);

route.get("/get-single-post", getSinglePost);
module.exports = route;
