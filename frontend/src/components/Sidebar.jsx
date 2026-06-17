import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, ShieldAlert, Settings } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar glass-panel">
      <div className="logo-container">
        <div className="logo-icon"></div>
        <h2 className="logo-text">Sentinel<span>Ops</span></h2>
      </div>
      <nav className="nav-menu">
        <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard size={20} />
          <span>Command Center</span>
        </NavLink>
        <NavLink to="/telemetry" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Activity size={20} />
          <span>Telemetry Stream</span>
        </NavLink>
        <NavLink to="/policies" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <ShieldAlert size={20} />
          <span>Security Policies</span>
        </NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Settings size={20} />
          <span>System Settings</span>
        </NavLink>
      </nav>
      <div className="status-indicator">
        <div className="pulse-dot"></div>
        <span>System Online</span>
      </div>
    </aside>
  );
}
