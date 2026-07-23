
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'jobseeker' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem', color: 'white' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>SmartHire</h1>
        <p style={{ fontSize: '1.2rem', opacity: '0.9', textAlign: 'center', maxWidth: '300px' }}>Join thousands of job seekers and recruiters!</p>
        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🤖</span>
            <span>AI Resume Analyzer</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ fontSize: '1.5rem' }}>💼</span>
            <span>Smart Job Matching</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🚀</span>
            <span>Easy Apply System</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', background: 'white' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1d4ed8', marginBottom: '0.5rem' }}>Create Account</h2>
          <p style={{ color: '#888', marginBottom: '2rem' }}>Join SmartHire today — it's free!</p>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#444', fontWeight: '500', fontSize: '0.9rem' }}>Full Name</label>
            <input placeholder='Enter your full name' value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} onFocus={e => e.target.style.border='2px solid #1d4ed8'} onBlur={e => e.target.style.border='2px solid #e5e7eb'} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#444', fontWeight: '500', fontSize: '0.9rem' }}>Email</label>
            <input placeholder='Enter your email' value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} onFocus={e => e.target.style.border='2px solid #1d4ed8'} onBlur={e => e.target.style.border='2px solid #e5e7eb'} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#444', fontWeight: '500', fontSize: '0.9rem' }}>Password</label>
            <input type='password' placeholder='Create a password' value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} onFocus={e => e.target.style.border='2px solid #1d4ed8'} onBlur={e => e.target.style.border='2px solid #e5e7eb'} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#444', fontWeight: '500', fontSize: '0.9rem' }}>I am a</label>
            <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', outline: 'none', background: 'white' }} onFocus={e => e.target.style.border='2px solid #1d4ed8'} onBlur={e => e.target.style.border='2px solid #e5e7eb'}>
              <option value='jobseeker'>Job Seeker</option>
              <option value='recruiter'>Recruiter</option>
            </select>
          </div>

          <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '0.9rem', background: loading ? '#93c5fd' : 'linear-gradient(135deg, #1d4ed8, #7c3aed)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? '⏳ Creating account...' : 'Create Account →'}
          </button>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#888' }}>
            Already have an account? <Link to='/login' style={{ color: '#1d4ed8', fontWeight: '600', textDecoration: 'none' }}>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
