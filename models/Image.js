// models/Product.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  id: String,
  image: String,
});

module.exports = mongoose.model('Image', imageSchema, 'images');