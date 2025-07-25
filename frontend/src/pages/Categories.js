import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Grid,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import categoryService from '../api/categoryService';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllCategories();
      setCategories(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await categoryService.updateCategory(editingId, formData);
        setSuccess('Category updated successfully');
      } else {
        await categoryService.createCategory(formData);
        setSuccess('Category created successfully');
      }
      setFormData({ name: '' });
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
    });
    setEditingId(category._id);
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await categoryService.deleteCategory(categoryToDelete._id);
      setSuccess('Category deleted successfully');
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete category');
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleCancelEdit = () => {
    setFormData({ name: '' });
    setEditingId(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess('')}
      >
        <Alert severity="success" onClose={() => setSuccess('')}>
          {success}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the category "{categoryToDelete?.name}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {editingId ? 'Edit Category' : 'Add New Category'}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Category Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
                disabled={loading}
              />
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : editingId ? (
                    'Update Category'
                  ) : (
                    'Add Category'
                  )}
                </Button>
                {editingId && (
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleCancelEdit}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                )}
              </Box>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <List>
                {categories.map((category) => (
                  <ListItem key={category._id}>
                    <ListItemText primary={category.name} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEdit(category)}
                        disabled={loading}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteClick(category)}
                        disabled={loading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                {categories.length === 0 && (
                  <ListItem>
                    <ListItemText primary="No categories found" />
                  </ListItem>
                )}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Categories; 