const express = require("express");
const userRoute = require("./router/user.route");
const postRoute = require("./router/post.route");
const kycRoute = require("./router/kyc.route");
const mongoose = require("mongoose");
const port = 4000;
const cookieParser = require("cookie-parser");
const server = express();
const dotenv = require("dotenv");
dotenv.config();

//create connection to mongoose
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("connection was successful"))
	.catch((error) => console.log(error));

//cookie parser
server.use(cookieParser());

// to convert to json
server.use(express.json());

//calling endpoints for the student database manipulation
server.use(userRoute);

// calling endpoints for posting
server.use(postRoute);

//KYC route and endpoints
server.use(kycRoute);

//server listen and Port
server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
