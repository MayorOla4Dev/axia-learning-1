const express = require("express");
const route = express.Router();
const { createKyc } = require("../controllers/kyc.controller");
const authentication = require("../middlewares/auth.middleware");

route.post("/kyc", authentication, createKyc);

module.exports = route;
