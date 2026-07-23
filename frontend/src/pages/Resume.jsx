
import React, { useState } from 'react';
import API from '../utils/api';

function Resume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) return setError('Please select a PDF file!');
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const { data } = await API.post('/resume/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed');
    }
    setLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 70) return '#16a34a';
    if (score >= 50) return '#d97706';
    return '#dc2626';
  };

  const getScoreLabel = (score) => {
    if (score >= 70) return 'Excellent! 🎉';
    if (score >= 50) return 'Good 👍';
    return 'Needs Work 💪';
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '750px', margin: '0 auto' }}>
      <h2 style={{ color: '#1d4ed8', marginBottom: '0.5rem', fontSize: '1.8rem' }}>AI Resume Analyzer 🤖</h2>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Upload your resume and get instant AI-powered feedback!</p>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: '2rem' }}>
        <div style={{ border: '2px dashed #e5e7eb', borderRadius: '10px', padding: '2rem', textAlign: 'center', marginBottom: '1rem', background: '#f9fafb' }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</p>
          <p style={{ color: '#666', marginBottom: '1rem' }}>Upload your resume in PDF format</p>
          <input type='file' accept='.pdf' onChange={e => setFile(e.target.files[0])} style={{ marginBottom: '0.5rem' }} />
          {file && <p style={{ color: '#16a34a', fontSize: '0.9rem', marginTop: '0.5rem' }}>✅ {file.name} selected</p>}
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
            ⚠️ {error}
          </div>
        )}

        <button onClick={handleUpload} disabled={loading} style={{ width: '100%', padding: '0.9rem', background: loading ? '#93c5fd' : 'linear-gradient(135deg, #1d4ed8, #7c3aed)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? '⏳ Analyzing your resume...' : '🚀 Analyze Resume'}
        </button>
      </div>

      {result && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '1.5rem', background: '#f9fafb', borderRadius: '10px' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: `conic-gradient(${getScoreColor(result.score)} ${result.score * 3.6}deg, #e5e7eb 0deg)`, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getScoreColor(result.score) }}>{result.score}</span>
                <span style={{ fontSize: '0.7rem', color: '#888' }}>/ 100</span>
              </div>
            </div>
            <h3 style={{ marginTop: '1rem', color: getScoreColor(result.score), fontSize: '1.3rem' }}>{getScoreLabel(result.score)}</h3>
            <p style={{ color: '#666', marginTop: '0.5rem', lineHeight: '1.6' }}>{result.summary}</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#1d4ed8', marginBottom: '0.8rem', fontSize: '1.1rem' }}>🛠️ Skills Found</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {result.skills?.map((skill, i) => (
                <span key={i} style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '500', border: '1px solid #bfdbfe' }}>{skill}</span>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#f0fdf4', padding: '1.2rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
              <h3 style={{ color: '#16a34a', marginBottom: '0.8rem', fontSize: '1rem' }}>💪 Strengths</h3>
              {result.strengths?.map((s, i) => (
                <p key={i} style={{ color: '#444', marginBottom: '0.5rem', fontSize: '0.9rem' }}>✅ {s}</p>
              ))}
            </div>
            <div style={{ background: '#fff7ed', padding: '1.2rem', borderRadius: '10px', border: '1px solid #fed7aa' }}>
              <h3 style={{ color: '#d97706', marginBottom: '0.8rem', fontSize: '1rem' }}>📈 Improvements</h3>
              {result.improvements?.map((imp, i) => (
                <p key={i} style={{ color: '#444', marginBottom: '0.5rem', fontSize: '0.9rem' }}>⚠️ {imp}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resume;
