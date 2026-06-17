import React from 'react';
import './MetricsCard.css';

export default function MetricsCard({ title, value, unit, trend, color = "cyan" }) {
  const trendClass = trend > 0 ? 'trend-up' : 'trend-down';
  const colorClass = `color-${color}`;

  return (
    <div className={`metrics-card glass-panel ${colorClass}`}>
      <h3 className="metrics-title">{title}</h3>
      <div className="metrics-value-container">
        <span className="metrics-value">{value}</span>
        <span className="metrics-unit">{unit}</span>
      </div>
      <div className={`metrics-trend ${trendClass}`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last hour
      </div>
    </div>
  );
}
