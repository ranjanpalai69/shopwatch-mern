const express = require("express");
const {
    createUser,
    loginUser,
    getAllUsers,
    addUser,
    updateUser,
    removeUser,
    getSingleUser,
    ChangePassword,
    forgetPassword,
    resetPassword,
    getToken,
    getLoggedUserData,


} = require("../controller/users.controller");
const authenticateUser = require("../middleware/authontication.middleware");
const { SuperAdminAccess } = require("../middleware/authorised.middleware");
// const { SuperAdminAccess, adminAccess } = require("../middleware/authorised.middleware");
const validateUserFields = require("../middleware/userRegisterFieldsAnalyzer.middleware");


const userRouter = express.Router();

userRouter.post('/resetPassword', resetPassword);
userRouter.post("/register", validateUserFields, createUser);
userRouter.post("/login", loginUser)
userRouter.post("/change/password",ChangePassword)
userRouter.post("/forget/password",forgetPassword)

// get token and user

userRouter.get("/get/token", authenticateUser,getToken)
userRouter.get("/get/user", authenticateUser,getLoggedUserData)

// SuperAdmin
userRouter.use(authenticateUser, SuperAdminAccess,)
userRouter.get("/get", getAllUsers)
userRouter.get("/SuperAdmin/get/single",getSingleUser)
userRouter.post("/superAdmin/register",validateUserFields,addUser)
userRouter.patch("/SuperAdmin/update", updateUser)
userRouter.delete("/SuperAdmin/remove",removeUser)


module.exports = userRouter