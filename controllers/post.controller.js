const postModel = require("../models/post.model");

const createPost = async (req, res) => {
	const body = req.body;
	try {
		const newPost = new postModel(body);
		const savedPost = await newPost.save();
		return res.json(savedPost);
	} catch (error) {
		return res.send("something went wrong");
	}
};

module.exports = { createPost };
