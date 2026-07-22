
import React, { useState, useEffect } from 'react';
import API from '../utils/api';

function Profile() {
  const [form, setForm] = useState({ name: '', bio: '', skills: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get('/users/profile');
      setForm({
        name: data.name || '',
        bio: data.bio || '',
        skills: data.skills?.join(', ') || ''
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedData = {
        name: form.name,
        bio: form.bio,
        skills: form.skills.split(',').map(s => s.trim())
      };
      await API.put('/users/profile', updatedData);
      setMessage('Profile updated successfully! ✅');
      localStorage.setItem('user', JSON.stringify({ ...user, name: form.name }));
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1d4ed8', marginBottom: '1.5rem' }}>My Profile 👤</h2>
        {message && <p style={{ color: 'green', marginBottom: '1rem' }}>{message}</p>}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: '#444', fontWeight: '500' }}>Full Name</label>
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: '#444', fontWeight: '500' }}>Email</label>
          <input value={user?.email} disabled style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', background: '#f9fafb', color: '#888' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: '#444', fontWeight: '500' }}>Role</label>
          <input value={user?.role} disabled style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', background: '#f9fafb', color: '#888' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: '#444', fontWeight: '500' }}>Bio</label>
          <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={3} placeholder='Tell us about yourself...' style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: '#444', fontWeight: '500' }}>Skills (comma separated)</label>
          <input value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} placeholder='React, Node.js, MongoDB...' style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>

        <button onClick={handleUpdate} disabled={loading} style={{ width: '100%', padding: '0.8rem', background: loading ? '#93c5fd' : '#1d4ed8', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1rem' }}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </div>
  );
}

export default Profile;
