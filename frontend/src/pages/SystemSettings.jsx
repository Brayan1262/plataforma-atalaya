import React from 'react';

export default function SystemSettings() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <header className="top-header">
        <div>
          <h1 className="page-title">System Settings</h1>
          <p className="page-subtitle">Core Infrastructure & External Integrations</p>
        </div>
        <button className="glass-btn" style={{ borderColor: 'var(--neon-green)', color: 'var(--neon-green)' }}>Save Configuration</button>
      </header>

      <div className="glass-panel" style={{ padding: '35px', display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '800px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ color: 'var(--neon-cyan)', fontWeight: '600', letterSpacing: '0.5px' }}>Keycloak OIDC Issuer URL</label>
          <input type="text" defaultValue="https://keycloak.sentinelops.local/realms/sentinel" style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'rgba(0,0,0,0.3)', color: 'white', width: '100%', fontSize: '1rem', outline: 'none' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>The URL used by the Gateway to validate JWT tokens.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ color: 'var(--neon-cyan)', fontWeight: '600', letterSpacing: '0.5px' }}>HashiCorp Vault Endpoint</label>
          <input type="text" defaultValue="http://vault.sentinelops.local:8200" style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'rgba(0,0,0,0.3)', color: 'white', width: '100%', fontSize: '1rem', outline: 'none' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Internal Kubernetes DNS for secrets management.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ color: 'var(--neon-cyan)', fontWeight: '600', letterSpacing: '0.5px' }}>Kafka Bootstrap Servers (Data Layer)</label>
          <input type="text" defaultValue="sentinel-cluster-kafka-bootstrap.data-layer.svc.cluster.local:9092" style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'rgba(0,0,0,0.3)', color: 'white', width: '100%', fontSize: '1rem', outline: 'none' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Strimzi broker URL. Requires mTLS if STRICT mode is enabled.</span>
        </div>

        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px', marginTop: '10px' }}>
           <h3 style={{ color: '#FF1744', marginBottom: '15px' }}>Danger Zone</h3>
           <button className="glass-btn" style={{ borderColor: '#FF1744', color: '#FF1744' }}>Restart All Kubernetes Pods</button>
        </div>

      </div>
    </div>
  );
}
