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

const deletePost = async (req, res) => {
	const { postId } = req.query;
	const { userId } = req.body;
	// check post

	const post = await postModel.findById(postId);
	if (!post) {
		return res.send("Post does not exist");
	}

	//check if is the creator
	if (userId != post.creator) {
		return res.send("this post does not belong to you");
	}

	try {
		await postModel.findByIdAndDelete(postId);
		return res.send("Post deleted successfully!!!");
	} catch (error) {
		return res.send(error.message);
	}
};

module.exports = { createPost, deletePost };
