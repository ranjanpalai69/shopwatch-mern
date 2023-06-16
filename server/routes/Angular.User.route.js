const express = require("express")
const { registerUser, loginUser } = require("../controller/Angular.User.controller")
const AngularUserRouter = express.Router()

AngularUserRouter.post("/register",registerUser);
AngularUserRouter.post("/login",loginUser);

module.exports=AngularUserRouter

