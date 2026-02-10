import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// MLflow API
export const mlflowAPI = {
  getExperiments: () => api.get('/mlflow/experiments'),
  getExperiment: (id) => api.get(`/mlflow/experiments/${id}`),
  searchRuns: (experimentIds, filter, maxResults) =>
    api.post('/mlflow/runs/search', { experimentIds, filter, maxResults }),
  getRun: (id) => api.get(`/mlflow/runs/${id}`),
  getModelVersions: (name) => api.get(`/mlflow/models/${name}/versions`),
};

// Validation API
export const validationAPI = {
  submitValidation: (data) => api.post('/validation/submit', data),
  getValidationStatus: (runId) => api.get(`/validation/status/${runId}`),
  getPendingValidations: (experimentIds) =>
    api.get('/validation/pending', { params: { experimentIds } }),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
