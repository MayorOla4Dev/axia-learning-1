const postModel = require("../models/post.model");

const createPost = async (req, res) => {
	return res.send("Making post");
};

module.exports = { createPost };
