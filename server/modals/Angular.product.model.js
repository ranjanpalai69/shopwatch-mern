const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema
const AngularProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

// Create the model
const angularproductModel = mongoose.model('AngularProduct', AngularProductSchema);

module.exports = angularproductModel;
