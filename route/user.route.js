const express = require("express");
const {
	createUser,
	getUsers,
	updateUser,
	deleteUser,
	loginUser,
} = require("../controllers/user.controller");
const route = express.Router();

route.get("/", getUsers);

route.post("/", createUser);

route.put("/", updateUser);

route.delete("/", deleteUser);

route.post("/user-login", loginUser);
module.exports = route;
