const mongoose = require("mongoose");

const forgetPasswordSchema = mongoose.Schema({

    userId:{
        type: String,
        trim: true,
    },
    token: {
        type: String,
        trim: true,
       
    },
    expirationDate: {
        type: Date,
        required: true,
    },
}, {
    versionKey: false
});

// add the remove method to the schema
forgetPasswordSchema.methods.removeToken = function () {
    return this.deleteOne();
};


// user modal 

const forgotModal = mongoose.model("forgetPasswordToken", forgetPasswordSchema);

module.exports = forgotModal

// token,
// expirationDate,