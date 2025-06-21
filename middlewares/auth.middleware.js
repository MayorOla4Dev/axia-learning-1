const jwt = require("jsonwebtoken");
const { Query } = require("mongoose");
const authentication = async (req, res, next) => {
	const { token } = req.headers;

	//check if token exist / user logged in
	if (!token) {
		return res.json({ message: "please login to create post" });
	}
	const bearerToken = token.split(" ")[1];
	jwt.verify(bearerToken, process.env.JWT_SECRET, (error, payload) => {
		if (error) {
			return res.json({ message: "session expired" });
		}
		req.user = { id: payload.id, admin: payload.admin };
	});
	next();
};

module.exports = authentication;
