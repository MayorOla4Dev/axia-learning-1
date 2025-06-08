const mongoose = require("mongoose");
//creating userSchema
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		gender: {
			type: String,
			required: true,
			enum: ["Male", "Female"],
		},
		password: {
			type: String,
			required: true,
		},
		married: {
			type: Boolean,
			required: true,
		},
		admin: {
			type: Boolean,
			default: false,
		},
		hobbies: {
			type: [String],
			required: true,
		},
	},
	{ timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
