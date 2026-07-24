
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

  const getCompletion = () => {
    let score = 0;
    if (form.name) score += 25;
    if (user?.email) score += 25;
    if (form.bio) score += 25;
    if (form.skills) score += 25;
    return score;
  };

  const completion = getCompletion();

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)', padding: '2rem', borderRadius: '12px', color: 'white', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#1d4ed8', flexShrink: 0 }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{form.name || user?.name}</h2>
          <p style={{ opacity: '0.85', fontSize: '0.9rem' }}>{user?.email}</p>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', marginTop: '0.3rem', display: 'inline-block' }}>{user?.role}</span>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fbbf24' }}>{completion}%</div>
          <p style={{ fontSize: '0.8rem', opacity: '0.85' }}>Profile Complete</p>
          <div style={{ marginTop: '0.3rem', background: 'rgba(255,255,255,0.3)', borderRadius: '10px', height: '4px', width: '80px' }}>
            <div style={{ width: `${completion}%`, background: '#fbbf24', height: '4px', borderRadius: '10px' }}></div>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
        <h3 style={{ color: '#1d4ed8', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Edit Profile</h3>

        {message && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {message}
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: '#444', fontWeight: '500', fontSize: '0.9rem' }}>Full Name</label>
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} onFocus={e => e.target.style.border='2px solid #1d4ed8'} onBlur={e => e.target.style.border='2px solid #e5e7eb'} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: '#444', fontWeight: '500', fontSize: '0.9rem' }}>Email</label>
          <input value={user?.email} disabled style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', background: '#f9fafb', color: '#888' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: '#444', fontWeight: '500', fontSize: '0.9rem' }}>Role</label>
          <input value={user?.role} disabled style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', background: '#f9fafb', color: '#888' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: '#444', fontWeight: '500', fontSize: '0.9rem' }}>Bio</label>
          <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={3} placeholder='Tell us about yourself...' style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', outline: 'none', resize: 'vertical' }} onFocus={e => e.target.style.border='2px solid #1d4ed8'} onBlur={e => e.target.style.border='2px solid #e5e7eb'} />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: '#444', fontWeight: '500', fontSize: '0.9rem' }}>Skills <span style={{ color: '#888', fontWeight: '400' }}>(comma separated)</span></label>
          <input value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} placeholder='React, Node.js, MongoDB...' style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} onFocus={e => e.target.style.border='2px solid #1d4ed8'} onBlur={e => e.target.style.border='2px solid #e5e7eb'} />
          {form.skills && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.8rem' }}>
              {form.skills.split(',').map((skill, i) => skill.trim() && (
                <span key={i} style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.2rem 0.7rem', borderRadius: '20px', fontSize: '0.85rem', border: '1px solid #bfdbfe' }}>{skill.trim()}</span>
              ))}
            </div>
          )}
        </div>

        <button onClick={handleUpdate} disabled={loading} style={{ width: '100%', padding: '0.9rem', background: loading ? '#93c5fd' : 'linear-gradient(135deg, #1d4ed8, #7c3aed)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? '⏳ Updating...' : 'Update Profile →'}
        </button>
      </div>
    </div>
  );
}

export default Profile;
