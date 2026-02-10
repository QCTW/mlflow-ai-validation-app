const express = require('express');
const router = express.Router();
const mlflowService = require('../services/mlflowService');

// Submit validation request
router.post('/submit', async (req, res) => {
  try {
    const { runId, status, comments, userId } = req.body;

    // Update MLflow run with validation status
    await mlflowService.updateRunTag(runId, 'validation.status', status);
    await mlflowService.updateRunTag(runId, 'validation.comments', comments);
    await mlflowService.updateRunTag(runId, 'validation.user', userId);
    await mlflowService.updateRunTag(runId, 'validation.timestamp', new Date().toISOString());

    res.json({ success: true, message: 'Validation submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get validation status for a run
router.get('/status/:runId', async (req, res) => {
  try {
    const run = await mlflowService.getRun(req.params.runId);
    const tags = run.run?.data?.tags || [];

    const validationData = {
      status: tags.find(t => t.key === 'validation.status')?.value || 'pending',
      comments: tags.find(t => t.key === 'validation.comments')?.value || '',
      user: tags.find(t => t.key === 'validation.user')?.value || '',
      timestamp: tags.find(t => t.key === 'validation.timestamp')?.value || ''
    };

    res.json(validationData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all runs pending validation
router.get('/pending', async (req, res) => {
  try {
    const { experimentIds } = req.query;
    const ids = experimentIds ? experimentIds.split(',') : [];

    const runs = await mlflowService.searchRuns(ids);

    // Filter runs that are pending validation
    const pendingRuns = runs.runs?.filter(run => {
      const tags = run.data?.tags || [];
      const status = tags.find(t => t.key === 'validation.status')?.value;
      return !status || status === 'pending';
    }) || [];

    res.json({ runs: pendingRuns });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
