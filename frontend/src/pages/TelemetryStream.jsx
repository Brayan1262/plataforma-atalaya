import React, { useState, useEffect } from 'react';

export default function TelemetryStream() {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8081/api/stream');
    
    eventSource.onopen = () => setStatus("● Listening to Kafka Broker (Real-time)");
    eventSource.onerror = () => setStatus("Connection Lost. Retrying...");
    
    eventSource.onmessage = (event) => {
        setLogs(prev => {
            const newLog = {
                ts: new Date().toISOString(),
                offset: prev.length ? prev[0].offset + 1 : 1000,
                payload: event.data
            };
            return [newLog, ...prev.slice(0, 49)]; // Mantener los últimos 50 eventos
        });
    };

    return () => eventSource.close();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <header className="top-header">
        <div>
          <h1 className="page-title">Real Kafka Stream</h1>
          <p className="page-subtitle">Raw events consumed directly from Strimzi via SSE</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="glass-btn" style={{ borderColor: status.includes('Listening') ? 'var(--neon-green)' : '#FF1744', color: status.includes('Listening') ? 'var(--neon-green)' : '#FF1744' }}>
             {status}
          </button>
        </div>
      </header>

      <div className="glass-panel" style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'Courier New, monospace' }}>
        {logs.length === 0 && <div style={{color: '#94A3B8'}}>Waiting for events... Make sure the traffic generator in Command Center is running.</div>}
        {logs.map(log => (
          <div key={log.offset} style={{ padding: '12px', background: 'rgba(0,0,0,0.4)', borderLeft: log.payload.includes('DETECTED') || log.payload.includes('FAILED') ? '3px solid #FF1744' : '3px solid var(--neon-cyan)', borderRadius: '6px', fontSize: '0.9rem', display: 'flex', gap: '15px' }}>
            <span style={{ color: '#94A3B8', minWidth: '220px' }}>[{log.ts}]</span>
            <span style={{ color: 'var(--neon-green)', minWidth: '80px' }}>[o:{log.offset}]</span>
            <span style={{ color: log.payload.includes('DETECTED') ? '#FF1744' : 'var(--neon-cyan)', flex: 1 }}>{log.payload}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
