const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});


const cartModal = mongoose.model("cart_item", cartSchema)
module.exports = cartModal