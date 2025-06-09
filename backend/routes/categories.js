const express = require('express');
const Category = require('../models/Category');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all categories for user
router.get('/', auth, async (req, res) => {
  const categories = await Category.find({ user: req.user.id });
  res.json(categories);
});

// Create category
router.post('/', auth, async (req, res) => {
  const { name } = req.body;
  const category = new Category({ name, user: req.user.id });
  await category.save();
  res.status(201).json(category);
});

// Update category
router.put('/:id', auth, async (req, res) => {
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { name },
    { new: true }
  );
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json(category);
});

// Delete category
router.delete('/:id', auth, async (req, res) => {
  const category = await Category.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json({ message: 'Category deleted' });
});

module.exports = router; 