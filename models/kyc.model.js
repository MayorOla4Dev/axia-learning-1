const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
	{
		selfiePix: {
			type: String,
			required: true,
		},
		docType: {
			type: String,
			required: true,
		},

		docFrontPix: {
			type: String,
			required: true,
		},
		docBackPix: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{ timestamps: true }
);

const kycModel = mongoose.model("kyc", kycSchema);
module.exports = kycModel;
