import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export const useProfile = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
  const defaultProfile = {
    name: 'Brayan Jair Chavez Oscor',
    role: 'Ciberseguridad',
    avatar: 'BJ',
    email: 'brayan.chavez@sentinelops.local',
    phone: '+51 987 654 321'
  };

  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('sentinel-profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const updateProfile = (newData) => {
    setProfileData(newData);
    localStorage.setItem('sentinel-profile', JSON.stringify(newData));
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
