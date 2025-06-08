const express = require("express");
const { createPost } = require("../controllers/post.controller");

const route = express.Router();

route.post("/post", createPost);

module.exports = route;
