import { useState, useEffect } from 'react';
import { validationAPI, mlflowAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [experiments, setExperiments] = useState([]);
  const [pendingRuns, setPendingRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Fetch experiments
      const experimentsResponse = await mlflowAPI.getExperiments();
      setExperiments(experimentsResponse.data.experiments || []);

      // Fetch pending validations
      const experimentIds = experimentsResponse.data.experiments?.map(e => e.experiment_id).join(',');
      const pendingResponse = await validationAPI.getPendingValidations(experimentIds);
      setPendingRuns(pendingResponse.data.runs || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard">
      <h1>AI Model Validation Dashboard</h1>

      <section className="experiments-section">
        <h2>Experiments</h2>
        <div className="experiments-list">
          {experiments.length === 0 ? (
            <p>No experiments found</p>
          ) : (
            experiments.map((exp) => (
              <div key={exp.experiment_id} className="experiment-card">
                <h3>{exp.name}</h3>
                <p>ID: {exp.experiment_id}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="pending-section">
        <h2>Pending Validations ({pendingRuns.length})</h2>
        <div className="runs-list">
          {pendingRuns.length === 0 ? (
            <p>No pending validations</p>
          ) : (
            pendingRuns.map((run) => (
              <div key={run.info.run_id} className="run-card">
                <h3>Run: {run.info.run_name || run.info.run_id}</h3>
                <p>Experiment ID: {run.info.experiment_id}</p>
                <p>Status: {run.info.status}</p>
                <button onClick={() => navigate(`/validate/${run.info.run_id}`)}>
                  Validate
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
