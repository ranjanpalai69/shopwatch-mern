const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role_type: {
        type: String,
        enum: ["seller", "user"],
        default: "user"
    }
}, {
    timestamps: false,
    versionKey: false
});

// Export the model
module.exports = mongoose.model('AngularUser', userSchema);
