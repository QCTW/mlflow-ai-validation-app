const express = require('express');
const router = express.Router();
const mlflowService = require('../services/mlflowService');

// Get all experiments
router.get('/experiments', async (req, res) => {
  try {
    const experiments = await mlflowService.getExperiments();
    res.json(experiments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get experiment by ID
router.get('/experiments/:id', async (req, res) => {
  try {
    const experiment = await mlflowService.getExperiment(req.params.id);
    res.json(experiment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search runs
router.post('/runs/search', async (req, res) => {
  try {
    const { experimentIds, filter, maxResults } = req.body;
    const runs = await mlflowService.searchRuns(experimentIds, filter, maxResults);
    res.json(runs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get run by ID
router.get('/runs/:id', async (req, res) => {
  try {
    const run = await mlflowService.getRun(req.params.id);
    res.json(run);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get model versions
router.get('/models/:name/versions', async (req, res) => {
  try {
    const versions = await mlflowService.getModelVersions(req.params.name);
    res.json(versions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
