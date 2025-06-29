const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},

		description: {
			type: String,
			required: true,
		},
		previewPix: {
			type: String,
			required: true,
		},

		detailsPix: {
			type: String,
			required: true,
		},
		creator: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
	},
	{ timestamps: true }
);

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
