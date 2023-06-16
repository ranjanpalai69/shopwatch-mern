const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        }
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["cashOn", "UPI", "creditCard"],
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "packed", "dispatch", "cancelled", "delivered"],
      default: "pending",
    
    },
    deliveryAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "deliveryAddres",
      required: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

// order model

const orderModel = mongoose.model("order", orderSchema);

module.exports=orderModel 