const mongoose = require("mongoose")


const deliveryAddressSchema = mongoose.Schema({
    address: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    city: {
        type: String,
        required: true
    },
    block: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const deliveryAddressModel = mongoose.model("deliveryAddres", deliveryAddressSchema)
module.exports = deliveryAddressModel