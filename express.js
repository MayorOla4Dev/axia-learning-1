const express = require("express");
const userRoute = require("./router/user.route");
const postRoute = require("./router/post.route");
const mongoose = require("mongoose");
const port = 4000;
const cookieParser = require("cookie-parser");
const JWT = require("jsonwebtoken");
const server = express();
const dotenv = require("dotenv");
dotenv.config();
//create connection
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("connection was successful"))
	.catch((error) => console.log(error));

server.use(cookieParser());

server.use(express.json()); // to convert to json

//calling endpoints for the student database manipulation
server.use(userRoute);

// calling endpoints for posting
server.use(postRoute);

//login a user

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
