const kycModel = require("../models/kyc.model");
const userModel = require("../models/user.model");

const createKyc = async (req, res) => {
	const payload = req.body;
	const { id } = req.user;
	try {
		//create KYC
		const newKyc = new kycModel({ user: id, ...payload });
		const saveKyc = await newKyc.save();

		//update the users account
		await userModel.findByIdAndUpdate(id, { kyc: saveKyc.id }, { new: true });
	} catch (error) {
		return res.send("something went wrong");
	}
};

module.exports = { createKyc };
