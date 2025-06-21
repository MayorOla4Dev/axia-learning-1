const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
	//get the user's registration details and spread others
	const { email, password, ...others } = req.body;

	//check if email and password exist
	if (!email || !password) {
		return res.send("Please provide valid registration credentials");
	}

	//now create a hashed password
	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);
	console.log(hashedPassword);

	//Check if user exist on our database
	const isUser = await userModel.findOne({ email });
	if (isUser) {
		return res.send("User already exist, please login to your account");
	}

	//continue with registration
	try {
		const newUser = new userModel({
			email,
			password: hashedPassword,
			...others,
		});
		const savedUser = await newUser.save();
		return res.json(savedUser);
	} catch (error) {
		console.log(error);
		return res.send("Something went wrong");
	}
};

const getUsers = async (req, res) => {
	const allUsers = await userModel.find();
	return res.json(allUsers);
};
const updateUser = async (req, res) => {
	const { id, ...others } = req.body;
	const payload = req.body;
	const updateUser = await userModel.findByIdAndUpdate(
		id,
		{ ...payload },
		{ new: true }
	);
	return res.json(updateUser);
};

const deleteUser = async (req, res) => {
	const { id } = req.query;
	const deletedUser = await userModel.findByIdAndDelete(id);
	return res.json(deletedUser);
};

//login a user
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	// getting the user from the database
	const user = await userModel.findOne({ email });
	if (!user) {
		return res.send("This account does not exist, create account");
	}

	//compare password
	const isValid = bcrypt.compareSync(req.body.password, user.password);
	if (!isValid) {
		return res.send("Invalid password!");
	}

	//create JWT first

	const token = jwt.sign(
		{ id: user.id, admin: user.admin },
		process.env.JWT_SECRET,
		{ expiresIn: "2hr" }
	);

	//return basic information

	res.cookie("token", token, {
		maxAge: 1000 * 60 * 60,
		secure: true,
		httpOnly: true,
	});
	return res.json({ message: "This was successful" });
};

module.exports = { createUser, getUsers, updateUser, deleteUser, loginUser };
