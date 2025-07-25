import api from './config';

const categoryService = {
  // Get all categories
  async getAllCategories() {
    const response = await api.get('/categories');
    return response.data;
  },

  // Create a new category
  async createCategory(categoryData) {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },

  // Update an existing category
  async updateCategory(id, categoryData) {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  // Delete a category
  async deleteCategory(id) {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },

  // Get a single category by ID
  async getCategoryById(id) {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  }
};

export default categoryService; 