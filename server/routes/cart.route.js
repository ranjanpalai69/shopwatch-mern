const express = require("express");
const {
    addProductToCart, 
    getCartData,
    removeProductFromCart,
    incrementProductQuantityInCart,
    decrementProductQuantityInCart,
    removeAllProductsFromCart
} = require("../controller/cart.controller");
const authenticateUser = require("../middleware/authontication.middleware");



const cartRouter = express.Router();
cartRouter.use(authenticateUser)
cartRouter.post("/add", addProductToCart)
cartRouter.get("/get",getCartData)
cartRouter.delete("/remove",removeProductFromCart)
cartRouter.delete("/remove/all",removeAllProductsFromCart)
cartRouter.patch("/incrementQuantity",incrementProductQuantityInCart)
cartRouter.patch("/decrementQuantity",decrementProductQuantityInCart)

module.exports=cartRouter