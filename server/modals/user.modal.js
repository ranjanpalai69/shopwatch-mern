const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide your name"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Please provide your email"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"]
    },
    mobile: {
        type: Number,
        minLength: [10, "mobile number can not less 10 digits"],
        maxLength: [10, "mobile number can not exceeded 10 digits"],
        required: [true, "Please provide mobile number"]
    },
    avator: {
        type: String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyu8pvIy6jXwRi9VluYbqkKBjhiM_YlZIGww&usqp=CAU"

    },

    role: {
        type: String,
        enum: ["user", "admin", "superAdmin"],
        message: "provide user , admin or superAdmin",
        default: "user",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

},
    {
        versionKey: false
    })


// user modal 

const userModal = mongoose.model("User", userSchema);

module.exports = userModal