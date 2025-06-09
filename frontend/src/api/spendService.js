import api from './config';

const spendService = {
  async getAllSpends() {
    const response = await api.get('/spends');
    return response.data;
  },

  async createSpend(spendData) {
    const response = await api.post('/spends', spendData);
    return response.data;
  },

  async updateSpend(id, spendData) {
    const response = await api.put(`/spends/${id}`, spendData);
    return response.data;
  },

  async deleteSpend(id) {
    const response = await api.delete(`/spends/${id}`);
    return response.data;
  },
};

export default spendService; 