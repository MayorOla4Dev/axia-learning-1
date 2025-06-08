const express = require("express");
const userRoute = require("./route/user.route");
const postRoute = require("./route/post.route");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
//create connection
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("connection was successful"))
	.catch(() => console.log("oops something went wrong"));

app.use(express.json()); // to convert to json

//calling endpoints for the student database manipulation
app.use(userRoute);

// calling endpoints for posting
app.use(postRoute);

//login a user

app.listen(5000, () => {
	console.log("App is running on port 5000");
});
