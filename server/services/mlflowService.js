const axios = require('axios');

class MLflowService {
  constructor() {
    this.baseUrl = process.env.MLFLOW_TRACKING_URI || 'http://localhost:5000';
  }

  // Get all experiments
  async getExperiments() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/2.0/mlflow/experiments/search`);
      return response.data;
    } catch (error) {
      console.error('Error fetching experiments:', error.message);
      throw error;
    }
  }

  // Get experiment by ID
  async getExperiment(experimentId) {
    try {
      const response = await axios.get(`${this.baseUrl}/api/2.0/mlflow/experiments/get`, {
        params: { experiment_id: experimentId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching experiment:', error.message);
      throw error;
    }
  }

  // Search runs
  async searchRuns(experimentIds, filter = '', maxResults = 100) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/2.0/mlflow/runs/search`, {
        experiment_ids: experimentIds,
        filter: filter,
        max_results: maxResults
      });
      return response.data;
    } catch (error) {
      console.error('Error searching runs:', error.message);
      throw error;
    }
  }

  // Get run by ID
  async getRun(runId) {
    try {
      const response = await axios.get(`${this.baseUrl}/api/2.0/mlflow/runs/get`, {
        params: { run_id: runId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching run:', error.message);
      throw error;
    }
  }

  // Get model versions
  async getModelVersions(modelName) {
    try {
      const response = await axios.get(`${this.baseUrl}/api/2.0/mlflow/model-versions/search`, {
        params: { filter: `name='${modelName}'` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching model versions:', error.message);
      throw error;
    }
  }

  // Update run tags (for validation status)
  async updateRunTag(runId, key, value) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/2.0/mlflow/runs/set-tag`, {
        run_id: runId,
        key: key,
        value: value
      });
      return response.data;
    } catch (error) {
      console.error('Error updating run tag:', error.message);
      throw error;
    }
  }
}

module.exports = new MLflowService();
