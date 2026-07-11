
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2>Welcome, {user.name}! 👋</h2>
        <p style={{ marginTop: '0.5rem', color: '#666' }}>Role: {user.role}</p>
        <p style={{ marginTop: '0.5rem', color: '#666' }}>Email: {user.email}</p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <div onClick={() => navigate('/jobs')} style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '8px', flex: 1, textAlign: 'center', cursor: 'pointer' }}>
            <h3 style={{ color: '#1d4ed8' }}>Jobs</h3>
            <p style={{ color: '#666', marginTop: '0.5rem' }}>Browse available jobs</p>
          </div>
          <div onClick={() => navigate('/resume')} style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '8px', flex: 1, textAlign: 'center', cursor: 'pointer' }}>
            <h3 style={{ color: '#16a34a' }}>Resume</h3>
            <p style={{ color: '#666', marginTop: '0.5rem' }}>Upload & analyze resume</p>
          </div>
          <div onClick={() => navigate('/profile')} style={{ background: '#fdf4ff', padding: '1.5rem', borderRadius: '8px', flex: 1, textAlign: 'center', cursor: 'pointer' }}>
            <h3 style={{ color: '#9333ea' }}>Profile</h3>
            <p style={{ color: '#666', marginTop: '0.5rem' }}>Update your profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
