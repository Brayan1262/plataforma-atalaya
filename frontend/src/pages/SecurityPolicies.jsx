import React from 'react';

export default function SecurityPolicies() {
  const policies = [
    { id: 'pol-001', name: 'Require mTLS (Istio Strict Mode)', status: 'Enforced', type: 'Network' },
    { id: 'pol-002', name: 'Block Malicious IPs (Threat Intel)', status: 'Enforced', type: 'Firewall' },
    { id: 'pol-003', name: 'Global Rate Limit (1000 req/s)', status: 'Audit Mode', type: 'Gateway' },
    { id: 'pol-004', name: 'JWT Validation (Keycloak Realm)', status: 'Enforced', type: 'Identity' },
    { id: 'pol-005', name: 'Prevent Privilege Escalation', status: 'Enforced', type: 'Kubernetes OPA' },
    { id: 'pol-006', name: 'Geo-blocking (Non-US traffic)', status: 'Disabled', type: 'Gateway' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <header className="top-header">
        <div>
          <h1 className="page-title">Zero-Trust Policies</h1>
          <p className="page-subtitle">OPA Gatekeeper & Istio Authorization Rules</p>
        </div>
        <button className="glass-btn">+ Create New Policy</button>
      </header>

      <div className="metrics-grid">
        {policies.map(p => (
          <div key={p.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '15px', transition: 'all 0.3s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--neon-cyan)', fontSize: '0.85rem', fontWeight: 'bold' }}>{p.id} • {p.type}</span>
              <span className={`status-badge ${p.status === 'Enforced' ? 'success' : (p.status === 'Audit Mode' ? 'warning' : '')}`} style={p.status === 'Disabled' ? { background: 'rgba(255,255,255,0.1)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.2)' } : {}}>
                {p.status}
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', color: p.status === 'Disabled' ? '#94A3B8' : 'white' }}>{p.name}</h3>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Toggle Enforcement</span>
                <input type="checkbox" defaultChecked={p.status === 'Enforced'} style={{ accentColor: 'var(--neon-cyan)', width: '18px', height: '18px', cursor: 'pointer' }} />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
