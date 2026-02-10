import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Validation from './pages/Validation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-content">
            <Link to="/" className="logo">
              MLflow AI Validation
            </Link>
            <div className="nav-links">
              <Link to="/">Dashboard</Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/validate/:runId" element={<Validation />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>MLflow AI Validation App - Connect end users with AI engineers</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
