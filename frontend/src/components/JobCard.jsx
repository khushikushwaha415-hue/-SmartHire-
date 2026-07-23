
import React from 'react';

function JobCard({ job, onApply, isApplied }) {
  return (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '1rem', border: '1px solid #f3f4f6', transition: 'transform 0.2s, box-shadow 0.2s' }}
      onMouseOver={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 20px rgba(0,0,0,0.12)'; }}
      onMouseOut={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'; }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
        <div>
          <h3 style={{ color: '#1d4ed8', fontSize: '1.2rem', fontWeight: '600' }}>{job.title}</h3>
          <p style={{ color: '#444', marginTop: '0.2rem', fontWeight: '500' }}>{job.company}</p>
        </div>
        {isApplied && (
          <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '500', border: '1px solid #bbf7d0' }}>✅ Applied</span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
        <span style={{ color: '#666', fontSize: '0.9rem' }}>📍 {job.location || 'Remote'}</span>
        <span style={{ color: '#666', fontSize: '0.9rem' }}>💰 {job.salary || 'Not specified'}</span>
        <span style={{ color: '#666', fontSize: '0.9rem' }}>🕐 Full Time</span>
      </div>

      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5' }}>{job.description?.slice(0, 120)}...</p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {job.skillsRequired?.map((skill, i) => (
          <span key={i} style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500' }}>{skill}</span>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#999', fontSize: '0.8rem' }}>Posted by {job.postedBy?.name || 'Recruiter'}</span>
        <button
          onClick={() => !isApplied && onApply(job._id)}
          disabled={isApplied}
          style={{
            padding: '0.6rem 1.5rem',
            background: isApplied ? '#f0fdf4' : 'linear-gradient(135deg, #1d4ed8, #7c3aed)',
            color: isApplied ? '#16a34a' : 'white',
            border: isApplied ? '1px solid #bbf7d0' : 'none',
            borderRadius: '8px',
            cursor: isApplied ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}>
          {isApplied ? '✅ Applied' : 'Apply Now →'}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
