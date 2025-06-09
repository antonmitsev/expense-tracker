import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import spendService from '../api/spendService';
import categoryService from '../api/categoryService';

const Dashboard = () => {
  const [spends, setSpends] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: new Date(),
    category: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSpends();
    fetchCategories();
  }, []);

  const fetchSpends = async () => {
    try {
      const data = await spendService.getAllSpends();
      setSpends(data);
    } catch (err) {
      setError('Failed to fetch spends');
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await spendService.updateSpend(editingId, formData);
      } else {
        await spendService.createSpend(formData);
      }
      setFormData({
        amount: '',
        description: '',
        date: new Date(),
        category: '',
      });
      setEditingId(null);
      fetchSpends();
    } catch (err) {
      setError('Failed to save spend');
    }
  };

  const handleEdit = (spend) => {
    setFormData({
      amount: spend.amount,
      description: spend.description,
      date: new Date(spend.date),
      category: spend.category._id,
    });
    setEditingId(spend._id);
  };

  const handleDelete = async (id) => {
    try {
      await spendService.deleteSpend(id);
      fetchSpends();
    } catch (err) {
      setError('Failed to delete spend');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Add New Expense
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                required
              />
              <DatePicker
                label="Date"
                value={formData.date}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" required />
                )}
              />
              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                margin="normal"
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                {editingId ? 'Update Expense' : 'Add Expense'}
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Expenses
            </Typography>
            {error && (
              <Typography color="error" gutterBottom>
                {error}
              </Typography>
            )}
            <List>
              {spends.map((spend) => (
                <ListItem key={spend._id}>
                  <ListItemText
                    primary={`${spend.description} - $${spend.amount}`}
                    secondary={`${new Date(spend.date).toLocaleDateString()} - ${
                      spend.category.name
                    }`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEdit(spend)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(spend._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 