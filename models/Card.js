// models/Product.js
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: String,
  id: String,
  image: String,
  faction: [String],
  wave: Number,
  rarity: Number,
});

module.exports = mongoose.model('Card', cardSchema, 'cards');