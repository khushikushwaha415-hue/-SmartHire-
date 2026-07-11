
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

function PostJob() {
  const [form, setForm] = useState({ title: '', company: '', description: '', skillsRequired: '', location: '', salary: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const jobData = {
        ...form,
        skillsRequired: form.skillsRequired.split(',').map(s => s.trim())
      };
      await API.post('/jobs', jobData);
      setMessage('Job posted successfully! ✅');
      setTimeout(() => navigate('/jobs'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to post job');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#1d4ed8' }}>Post a Job</h2>
        {message && <p style={{ color: 'green', marginBottom: '1rem' }}>{message}</p>}
        <input placeholder='Job Title' value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        <input placeholder='Company Name' value={form.company} onChange={e => setForm({...form, company: e.target.value})} style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        <input placeholder='Location' value={form.location} onChange={e => setForm({...form, location: e.target.value})} style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        <input placeholder='Salary (e.g. 5-8 LPA)' value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        <input placeholder='Skills Required (comma separated)' value={form.skillsRequired} onChange={e => setForm({...form, skillsRequired: e.target.value})} style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        <textarea placeholder='Job Description' value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={4} style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        <button onClick={handleSubmit} style={{ width: '100%', padding: '0.8rem', background: '#1d4ed8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>Post Job</button>
      </div>
    </div>
  );
}

export default PostJob;
