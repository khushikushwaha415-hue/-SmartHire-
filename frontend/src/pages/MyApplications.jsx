
import React, { useState, useEffect } from 'react';
import API from '../utils/api';

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await API.get('/applications/my');
      setApplications(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'selected': return { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' };
      case 'rejected': return { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' };
      case 'reviewed': return { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' };
      default: return { bg: '#fefce8', color: '#d97706', border: '#fde68a' };
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'selected': return '🎉 Selected';
      case 'rejected': return '❌ Rejected';
      case 'reviewed': return '👀 Reviewed';
      default: return '⏳ Applied';
    }
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
      <p style={{ fontSize: '2rem' }}>⏳</p>
      <p>Loading your applications...</p>
    </div>
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#1d4ed8', marginBottom: '0.5rem', fontSize: '1.8rem' }}>My Applications 📋</h2>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Track all your job applications here!</p>

      {applications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: '3rem' }}>📭</p>
          <h3 style={{ color: '#444', marginTop: '1rem' }}>No applications yet!</h3>
          <p style={{ color: '#888', marginTop: '0.5rem' }}>Browse jobs and start applying!</p>
          <button onClick={() => window.location.href='/jobs'} style={{ marginTop: '1.5rem', padding: '0.8rem 2rem', background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Browse Jobs →</button>
        </div>
      ) : (
        <>
          <div style={{ background: 'white', padding: '1rem 1.5rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '1.5rem', display: 'flex', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1d4ed8' }}>{applications.length}</div>
              <p style={{ color: '#888', fontSize: '0.85rem' }}>Total Applied</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#16a34a' }}>{applications.filter(a => a.status === 'selected').length}</div>
              <p style={{ color: '#888', fontSize: '0.85rem' }}>Selected</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1d4ed8' }}>{applications.filter(a => a.status === 'reviewed').length}</div>
              <p style={{ color: '#888', fontSize: '0.85rem' }}>Reviewed</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#d97706' }}>{applications.filter(a => a.status === 'applied').length}</div>
              <p style={{ color: '#888', fontSize: '0.85rem' }}>Pending</p>
            </div>
          </div>

          {applications.map(app => {
            const statusStyle = getStatusColor(app.status);
            return (
              <div key={app._id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '1rem', border: '1px solid #f3f4f6' }}
                onMouseOver={e => e.currentTarget.style.boxShadow='0 8px 20px rgba(0,0,0,0.12)'}
                onMouseOut={e => e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ color: '#1d4ed8', fontSize: '1.1rem', fontWeight: '600' }}>{app.job?.title}</h3>
                    <p style={{ color: '#444', marginTop: '0.2rem' }}>{app.job?.company}</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                      <span style={{ color: '#666', fontSize: '0.85rem' }}>📍 {app.job?.location || 'Remote'}</span>
                      <span style={{ color: '#666', fontSize: '0.85rem' }}>💰 {app.job?.salary || 'Not specified'}</span>
                    </div>
                  </div>
                  <span style={{ background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}`, padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '500', whiteSpace: 'nowrap' }}>
                    {getStatusLabel(app.status)}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.8rem' }}>
                  {app.job?.skillsRequired?.map((skill, i) => (
                    <span key={i} style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem' }}>{skill}</span>
                  ))}
                </div>
                <p style={{ color: '#999', fontSize: '0.8rem', marginTop: '0.8rem' }}>
                  Applied on: {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default MyApplications;
