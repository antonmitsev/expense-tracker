const mongoose = require('mongoose');

const spendSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Spend', spendSchema); 