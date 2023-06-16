const express = require("express");
const {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createReview,
    getAllReviewOfAproduct,
    getSingleReview,
    deleteReview,

} = require("../controller/products.controllers");
const authenticateUser = require("../middleware/authontication.middleware");
const { adminAccess } = require("../middleware/authorised.middleware");
const validateProduct = require("../middleware/productFieldsAnalyzer.middleware");
const validateUpdateProductFields = require("../middleware/updateProduct.middleware");
const validateReviewData = require("../middleware/Review.middleware");
const { SuperAdminAccess } = require("../middleware/authorised.middleware");

const productRouter = express.Router();
productRouter.get("/get", getProducts)
productRouter.get("/get/:id", getSingleProduct)


// review
productRouter.post("/review", authenticateUser, validateReviewData, createReview)
productRouter.get('/reviews',getAllReviewOfAproduct)
productRouter.get("/review/:reviewId",getSingleReview)



// superAdmin

productRouter.delete("/review/remove",authenticateUser,SuperAdminAccess,deleteReview)

productRouter.use(authenticateUser,adminAccess)
productRouter.post("/add", validateProduct, createProduct);
productRouter.patch("/update",validateUpdateProductFields,updateProduct)
productRouter.delete("/delete",deleteProduct)




module.exports = productRouter