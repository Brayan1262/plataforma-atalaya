import React, { useState, useRef } from 'react';
import { useProfile } from '../components/ProfileContext';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  
  // Usar el contexto global
  const { profileData, updateProfile } = useProfile();

  const [formData, setFormData] = useState({ ...profileData });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ ...formData });
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Guarda la imagen en base64 en el estado formData
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page" style={{ animation: 'fadeIn 0.5s ease', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: 'var(--neon-cyan)', margin: 0 }}>Mi Perfil</h1>
        {!isEditing && (
          <button 
            className="glass-btn" 
            onClick={() => {
              setFormData({ ...profileData });
              setIsEditing(true);
            }}
            style={{ padding: '10px 20px', cursor: 'pointer', background: 'rgba(0, 229, 255, 0.1)', border: '1px solid var(--neon-cyan)', color: 'var(--text-main)', borderRadius: '8px' }}
          >
            ✏️ Editar Perfil
          </button>
        )}
      </div>

      <div className="glass-panel" style={{ padding: '40px', display: 'flex', gap: '48px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {/* AVATAR SECTION */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div 
            onClick={() => isEditing && fileInputRef.current.click()}
            style={{
              width: '160px', height: '160px', borderRadius: '50%',
              background: (isEditing ? formData.avatar : profileData.avatar).length <= 3 
                ? 'linear-gradient(135deg, var(--neon-cyan), var(--neon-green))' 
                : `url(${isEditing ? formData.avatar : profileData.avatar}) center/cover`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '3.5rem', fontWeight: 'bold', color: '#000',
              border: '4px solid var(--border-light)',
              boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)',
              cursor: isEditing ? 'pointer' : 'default',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {(isEditing ? formData.avatar : profileData.avatar).length <= 3 ? (isEditing ? formData.avatar : profileData.avatar) : ''}
            
            {/* Overlay para indicar que se puede hacer clic */}
            {isEditing && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'rgba(0,0,0,0.6)', color: 'white',
                fontSize: '0.8rem', padding: '8px 0', textAlign: 'center'
              }}>
                📷 Cambiar
              </div>
            )}
          </div>

          <input 
            type="file" 
            accept="image/jpeg, image/png, image/webp" 
            ref={fileInputRef}
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />

          {isEditing && (
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Haz clic en la foto para subir una (.jpg, .png)
            </span>
          )}
        </div>

        {/* INFO / EDIT SECTION */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          {!isEditing ? (
            <>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--text-main)' }}>{profileData.name}</h2>
              <p style={{ color: 'var(--neon-green)', fontSize: '1.6rem', fontWeight: '600', marginBottom: '24px', letterSpacing: '1px' }}>
                {profileData.role}
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div>
                  <h4 style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Correo Electrónico</h4>
                  <p style={{ fontSize: '1.1rem' }}>{profileData.email}</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Teléfono Móvil</h4>
                  <p style={{ fontSize: '1.1rem' }}>{profileData.phone}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                <div className="glass-panel" style={{ padding: '20px', flex: 1, border: '1px solid rgba(0, 230, 118, 0.3)' }}>
                  <h4 style={{ color: 'var(--text-muted)' }}>Nivel de Acceso</h4>
                  <p style={{ fontSize: '1.8rem', color: 'var(--neon-green)', fontWeight: 'bold' }}>Tier 1 (Raíz)</p>
                </div>
                <div className="glass-panel" style={{ padding: '20px', flex: 1, border: '1px solid rgba(0, 229, 255, 0.3)' }}>
                  <h4 style={{ color: 'var(--text-muted)' }}>Eventos Analizados</h4>
                  <p style={{ fontSize: '1.8rem', color: 'var(--neon-cyan)', fontWeight: 'bold' }}>1,048,576</p>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Nombre Completo</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-light)', color: '#fff', fontSize: '1.1rem' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Rol en la Plataforma</label>
                <input 
                  type="text" 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  style={{ padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-light)', color: 'var(--neon-green)', fontSize: '1.1rem', fontWeight: 'bold' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Correo Electrónico</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{ padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-light)', color: '#fff', fontSize: '1rem' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Teléfono Móvil</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    style={{ padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-light)', color: '#fff', fontSize: '1rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <button type="submit" style={{ padding: '12px 24px', borderRadius: '8px', background: 'var(--neon-green)', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
                  Guardar Cambios
                </button>
                <button type="button" onClick={() => setIsEditing(false)} style={{ padding: '12px 24px', borderRadius: '8px', background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem' }}>
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
