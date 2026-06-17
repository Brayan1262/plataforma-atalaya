import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulated auth delay
    setTimeout(() => {
      setLoading(false);
      
      if (username.toLowerCase() === 'brayan' && password === '123456') {
        navigate('/dashboard');
      } else {
        alert('Credenciales incorrectas. (Pista: brayan / 123456)');
      }
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-glass glass-panel">
        <div className="login-header">
          <div className="login-logo">
            <span className="logo-icon">🛡️</span>
            <h2>SentinelOps</h2>
          </div>
          <p className="login-subtitle">Command Center Authentication</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Operator ID</label>
            <input 
              type="text" 
              placeholder="Enter your ID" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Access Code</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                'INITIALIZE UPLINK'
              )}
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>Secure connection established via ISTIO mTLS.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
