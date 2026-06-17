import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { ThemeProvider } from './components/ThemeProvider';
import { ProfileProvider } from './components/ProfileContext';
import CommandCenter from './pages/CommandCenter';
import TelemetryStream from './pages/TelemetryStream';
import SecurityPolicies from './pages/SecurityPolicies';
import SystemSettings from './pages/SystemSettings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import './App.css';

// Componente para agrupar la estructura base del Dashboard
const DashboardLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <TopBar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <Router>
          <Routes>
            {/* Ruta de Login pura, sin Sidebar ni TopBar */}
            <Route path="/login" element={<Login />} />
            
            {/* Rutas protegidas (Dashboard) */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardLayout><CommandCenter /></DashboardLayout>} />
            <Route path="/telemetry" element={<DashboardLayout><TelemetryStream /></DashboardLayout>} />
            <Route path="/policies" element={<DashboardLayout><SecurityPolicies /></DashboardLayout>} />
            <Route path="/settings" element={<DashboardLayout><SystemSettings /></DashboardLayout>} />
            <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ProfileProvider>
    </ThemeProvider>
  );
}

export default App;
