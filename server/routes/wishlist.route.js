const express = require("express");
const authenticateUser = require("../middleware/authontication.middleware");
const {
    addToWishList,
    getWishlist,
    removeFromWishlist,
} = require("../controller/wishlist.controller");
const wishlistRouter = express.Router();

wishlistRouter.use(authenticateUser)
wishlistRouter.post("/add", addToWishList)
wishlistRouter.get("/get", getWishlist)
wishlistRouter.delete("/remove", removeFromWishlist)

module.exports = wishlistRouter