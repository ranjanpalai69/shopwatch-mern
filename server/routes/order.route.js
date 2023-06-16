const express = require("express");
const validateOrderFields = require("../middleware/ValidateOrderFields.middleware");
const authenticateUser = require("../middleware/authontication.middleware");
const { SuperAdminAccess } = require("../middleware/authorised.middleware");
const {
    PostOrder,
    GetOrders,
    getSingleOrder,
    removeOrder,
    updateOrderStatus,
    countDeliveredOrders,
    getallOrders,

} = require("../controller/orders.controller");

const orderRouter = express.Router();

orderRouter.use(authenticateUser)
orderRouter.post("/post", validateOrderFields, PostOrder)
orderRouter.get("/get", GetOrders)
orderRouter.post("/get/singleOrder", getSingleOrder)
orderRouter.delete("/remove", removeOrder)
orderRouter.patch("/updateStatus", SuperAdminAccess, updateOrderStatus)
orderRouter.get("/deiveredCount", SuperAdminAccess, countDeliveredOrders)
orderRouter.get("/get/all", SuperAdminAccess, getallOrders)

module.exports = orderRouter