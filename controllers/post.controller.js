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

//update a post
const updatePost = async (req, res) => {
	const { postId, userId } = req.body;
	const body = req.body;

	//get the post
	const post = await postModel.findById(postId);
	if (!post) {
		return res.send("Post does not exist");
	}
	//check if is the owner
	if (userId != post.creator) {
		return res.send("You can only update your post");
	}
	try {
		await postModel.findByIdAndUpdate(postId, { ...body }, { new: true });
		res.send("post updated successfully");
	} catch (error) {
		return res.send("something went wrong");
	}
};

//get all post

const getUserPosts = async (req, res) => {
	const { userId } = req.query;

	try {
		const posts = await postModel.find({ creator: userId });
		return res.send(posts);
	} catch (error) {
		return res.send("Something went wrong");
	}
};

//get single post

const getSinglePost = async (req, res) => {
	const { postId } = req.query;
	try {
		const post = await postModel.findById(postId);
		return res.json(post);
	} catch (error) {
		return res.send("Something went wrong");
	}
};

module.exports = {
	createPost,
	deletePost,
	updatePost,
	getUserPosts,
	getSinglePost,
};
