const express = require('express');
const Spend = require('../models/Spend');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all spends for user
router.get('/', auth, async (req, res) => {
  const spends = await Spend.find({ user: req.user.id }).populate('category');
  res.json(spends);
});

// Create spend
router.post('/', auth, async (req, res) => {
  const { amount, description, date, category } = req.body;
  const spend = new Spend({ amount, description, date, category, user: req.user.id });
  await spend.save();
  res.status(201).json(spend);
});

// Update spend
router.put('/:id', auth, async (req, res) => {
  const { amount, description, date, category } = req.body;
  const spend = await Spend.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { amount, description, date, category },
    { new: true }
  );
  if (!spend) return res.status(404).json({ message: 'Spend not found' });
  res.json(spend);
});

// Delete spend
router.delete('/:id', auth, async (req, res) => {
  const spend = await Spend.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!spend) return res.status(404).json({ message: 'Spend not found' });
  res.json({ message: 'Spend deleted' });
});

module.exports = router; 