
import React from 'react';

function JobCard({ job, onApply, isApplied }) {
  return (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
      <h3 style={{ color: '#1d4ed8', fontSize: '1.2rem' }}>{job.title}</h3>
      <p style={{ color: '#444', marginTop: '0.3rem', fontWeight: '500' }}>{job.company}</p>
      <p style={{ color: '#666', marginTop: '0.3rem' }}>📍 {job.location}</p>
      <p style={{ color: '#666', marginTop: '0.3rem' }}>💰 {job.salary}</p>
      <p style={{ color: '#888', marginTop: '0.5rem', fontSize: '0.9rem' }}>{job.description?.slice(0, 100)}...</p>
      <div style={{ marginTop: '0.8rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {job.skillsRequired?.map((skill, i) => (
          <span key={i} style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem' }}>{skill}</span>
        ))}
      </div>
      <button
        onClick={() => !isApplied && onApply(job._id)}
        disabled={isApplied}
        style={{
          marginTop: '1rem',
          padding: '0.6rem 1.5rem',
          background: isApplied ? '#86efac' : '#1d4ed8',
          color: isApplied ? '#166534' : 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isApplied ? 'not-allowed' : 'pointer',
          fontWeight: '500'
        }}>
        {isApplied ? '✅ Applied' : 'Apply Now'}
      </button>
    </div>
  );
}

export default JobCard;
