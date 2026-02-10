import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mlflowAPI, validationAPI } from '../services/api';

function Validation() {
  const { runId } = useParams();
  const navigate = useNavigate();
  const [run, setRun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('approved');
  const [comments, setComments] = useState('');
  const [userId, setUserId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadRun();
  }, [runId]);

  const loadRun = async () => {
    try {
      setLoading(true);
      const response = await mlflowAPI.getRun(runId);
      setRun(response.data.run);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await validationAPI.submitValidation({
        runId,
        status,
        comments,
        userId,
      });
      alert('Validation submitted successfully!');
      navigate('/');
    } catch (err) {
      alert('Error submitting validation: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading run details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!run) return <div className="error">Run not found</div>;

  const metrics = run.data?.metrics || [];
  const params = run.data?.params || [];

  return (
    <div className="validation-page">
      <h1>Validate Run</h1>

      <section className="run-details">
        <h2>Run Information</h2>
        <p><strong>Run ID:</strong> {run.info.run_id}</p>
        <p><strong>Run Name:</strong> {run.info.run_name || 'N/A'}</p>
        <p><strong>Experiment ID:</strong> {run.info.experiment_id}</p>
        <p><strong>Status:</strong> {run.info.status}</p>
        <p><strong>Start Time:</strong> {new Date(run.info.start_time).toLocaleString()}</p>
      </section>

      <section className="metrics">
        <h2>Metrics</h2>
        {metrics.length === 0 ? (
          <p>No metrics found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, idx) => (
                <tr key={idx}>
                  <td>{metric.key}</td>
                  <td>{metric.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="params">
        <h2>Parameters</h2>
        {params.length === 0 ? (
          <p>No parameters found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {params.map((param, idx) => (
                <tr key={idx}>
                  <td>{param.key}</td>
                  <td>{param.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="validation-form">
        <h2>Submit Validation</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId">Your User ID:</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Validation Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="needs_review">Needs Review</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="comments">Comments:</label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows="5"
              placeholder="Add your validation comments here..."
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Validation'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Validation;
