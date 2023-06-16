const express = require("express");
const createDeliveryAddress = require("../controller/deliveryAddress.controller");
const deliveryAddressValidation = require("../middleware/ValidateOrderAddress.middleware");
const authenticateUser = require("../middleware/authontication.middleware");

const orderAddressRouter = express.Router();

orderAddressRouter.post("/address", authenticateUser, deliveryAddressValidation, createDeliveryAddress)

module.exports = orderAddressRouter