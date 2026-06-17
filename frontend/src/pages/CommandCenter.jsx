import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MetricsCard from '../components/MetricsCard';

// Función para simular envío de telemetría a nuestro Gateway real
const shootTelemetry = async () => {
    const IPs = ['192.168.1.104', '10.0.5.22', '172.16.0.8', '8.8.8.8', '114.114.114.114'];
    const Actions = ['LOGIN_SUCCESS', 'DATA_EXFILTRATION_ATTEMPT', 'API_RATE_LIMIT', 'AUTH_FAILED', 'SQL_INJECTION_DETECTED'];
    const payload = {
        deviceId: 'react-frontend-sim',
        eventData: `{"ip": "${IPs[Math.floor(Math.random() * IPs.length)]}", "action": "${Actions[Math.floor(Math.random() * Actions.length)]}"}`
    };
    try {
        await fetch('http://localhost:8081/api/telemetry/ingest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch(e) {
        console.error("No se pudo conectar al Gateway. Asegúrate de tener port-forward a localhost:8081", e);
    }
};

export default function CommandCenter() {
  const [data, setData] = useState(Array.from({length: 10}).map((_, i) => ({ time: `19:10:0${i}`, events: 0 })));
  const [stream, setStream] = useState([]);
  const [status, setStatus] = useState("Connecting to SSE...");
  
  const eventsInSecond = useRef(0);

  useEffect(() => {
    // 1. Conectar a Server-Sent Events desde el Analyzer Service
    const eventSource = new EventSource('http://localhost:8081/api/stream');
    
    eventSource.onopen = () => setStatus("Connected to Kafka Stream");
    eventSource.onerror = () => setStatus("SSE Connection Error (Is K8s port-forward running?)");
    
    eventSource.onmessage = (event) => {
        eventsInSecond.current += 1;
        
        // El payload viene como string desde Spring. Por simplicidad lo parseamos
        let parsed;
        try {
            const raw = JSON.parse(event.data);
            parsed = JSON.parse(raw.eventData); // Extraemos el JSON interior simulado
        } catch(e) {
            parsed = { ip: "unknown", action: "RAW_EVENT" };
        }

        const newEvent = {
            ts: new Date().toLocaleTimeString(),
            id: 'evt_' + Math.random().toString(36).substr(2, 6),
            ip: parsed.ip || '0.0.0.0',
            status: parsed.action || 'Processed'
        };
        
        setStream(prev => [newEvent, ...prev.slice(0, 4)]);
    };

    // 2. Simulador de tráfico (Envía datos al Gateway cada 500ms)
    const trafficInterval = setInterval(() => {
        shootTelemetry();
        if(Math.random() > 0.5) shootTelemetry(); // A veces manda doble para variar la gráfica
    }, 500);

    // 3. Actualizador de gráfica (Mide eventos por segundo y los dibuja)
    const chartInterval = setInterval(() => {
        setData(prev => {
            const now = new Date().toLocaleTimeString([], { hour12: false });
            return [...prev.slice(1), { time: now, events: eventsInSecond.current }];
        });
        eventsInSecond.current = 0; // Reset
    }, 1000);

    return () => {
        eventSource.close();
        clearInterval(trafficInterval);
        clearInterval(chartInterval);
    };
  }, []);

  return (
    <div className="command-center">
      <header className="cc-header">
        <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div>
            <h1 className="page-title">Global Overview</h1>
            <p className="page-subtitle">Real-time telemetry and infrastructure status | <span className="status-text" style={{color: status.includes('Connected') ? 'var(--neon-green)' : '#FF1744'}}>{status}</span></p>
          </div>
          <button className="glass-btn manual-event-btn" onClick={shootTelemetry}>Enviar Evento Manual</button>
        </div>
      </header>

      <section className="metrics-grid">
        <MetricsCard title="Ingestion Rate" value={data[data.length - 1]?.events || 0} unit="evts/sec" trend={2.4} color="cyan" />
        <MetricsCard title="Active Threats" value={stream.filter(s => s.status.includes('ATTEMPT') || s.status.includes('DETECTED') || s.status.includes('FAILED')).length} unit="detected" trend={0} color="green" />
        <MetricsCard title="Kafka Latency" value={Math.floor(Math.random() * 5) + 2} unit="ms" trend={-1.1} color="cyan" />
      </section>

      <section className="charts-section glass-panel" style={{ height: '300px', padding: '20px' }}>
         <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="time" stroke="#94A3B8" tick={{fill: '#94A3B8'}} axisLine={false} tickLine={false} />
              <YAxis stroke="#94A3B8" tick={{fill: '#94A3B8'}} axisLine={false} tickLine={false} />
              <Tooltip 
                 contentStyle={{ backgroundColor: 'rgba(18, 25, 43, 0.9)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '8px' }} 
                 itemStyle={{ color: '#00E5FF' }} 
              />
              <Line type="monotone" dataKey="events" stroke="#00E5FF" strokeWidth={3} dot={{ r: 4, fill: '#00E5FF', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#00E676' }} isAnimationActive={false} />
            </LineChart>
         </ResponsiveContainer>
      </section>

      <section className="data-section glass-panel">
        <h2 className="section-title">Live Telemetry Stream (from Kubernetes)</h2>
        <div className="mock-table">
          <div className="table-header">
            <span>Timestamp</span>
            <span>Event ID</span>
            <span>Source IP</span>
            <span>Status</span>
          </div>
          {stream.map((evt) => (
            <div className="table-row" key={evt.id}>
              <span>{evt.ts}</span>
              <span>{evt.id}</span>
              <span>{evt.ip}</span>
              <span className={`status-badge ${evt.status.includes('SUCCESS') || evt.status === 'Processed' ? 'success' : 'warning'}`}>{evt.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
