const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please provide product title"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Please provide product description"]
    },
    image: {
        type: String,
        required: [true, "Please provide product single image link"]
    },
    images: [
        {
            type: String,
            required: [true, "Please provide product multiple images link"],
        },
    ],
    originalPrice: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    discountPrice: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    category: {
        type: String,
        required: [true, "Please provide product category"],
    },
    brand: {
        type: String,
        required: [true, "Please provide Product brand"]
    },
    ratings: {
        type: Number,
        default: 0,
    },

    Stock: {
        type: Number,
        required: [true, "Please provide product Stock"],
        maxLength: [30, "Stock cannot exceed 4 characters"],
        default: 1,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: false,
            },
            name:{
                type: String,
                required: false,
            },
            rating: {
                type: Number,
                required: false,
            },
            comment: {
                type: String,
                required: false,
            },
        },
    ],


    numOfReviews: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

},
    {
        versionKey: false
    })


// products  modal

const productModal = mongoose.model("product", productSchema);

module.exports = productModal