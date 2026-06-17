import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { useProfile } from './ProfileContext';
import './TopBar.css';

function TopBar() {
  const { isLightMode, toggleTheme } = useTheme();
  const { profileData } = useProfile();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* User Profile on the LEFT */}
        <div className="profile-container" onClick={() => setShowProfileMenu(!showProfileMenu)}>
          <div 
            className="profile-avatar glass-panel"
            style={{
              background: profileData.avatar.length <= 3 
                ? 'linear-gradient(135deg, var(--neon-cyan), var(--neon-green))' 
                : `url(${profileData.avatar}) center/cover`
            }}
          >
            {profileData.avatar.length <= 3 ? <span className="avatar-text">{profileData.avatar}</span> : ''}
          </div>
          <div className="profile-info">
            <span className="profile-name">{profileData.name}</span>
            <span className="profile-role">{profileData.role}</span>
          </div>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="profile-dropdown glass-panel" style={{ left: 0, right: 'auto' }}>
              <ul>
                <li onClick={() => window.location.href = '/profile'}>
                  <span className="dropdown-icon">👤</span> Mi Perfil
                </li>
                <li onClick={() => window.location.href = '/settings'}>
                  <span className="dropdown-icon">⚙️</span> Configuración
                </li>
                <li className="dropdown-divider"></li>
                <li className="logout-item" onClick={() => window.location.href = '/login'}>
                  <span className="dropdown-icon">🚪</span> Cerrar Sesión
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="topbar-right">
        {/* Theme Toggle */}
        <button 
          className="theme-toggle-btn glass-panel" 
          onClick={toggleTheme}
          title={isLightMode ? "Cambiar a Modo Oscuro" : "Cambiar a Modo Claro"}
        >
          {isLightMode ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}

export default TopBar;
