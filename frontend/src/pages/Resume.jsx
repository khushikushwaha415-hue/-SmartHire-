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

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1d4ed8', marginBottom: '1.5rem' }}>AI Resume Analyzer 🤖</h2>
        <input type='file' accept='.pdf' onChange={e => setFile(e.target.files[0])} style={{ marginBottom: '1rem', width: '100%' }} />
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <button onClick={handleUpload} disabled={loading} style={{ width: '100%', padding: '0.8rem', background: loading ? '#93c5fd' : '#1d4ed8', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1rem' }}>
          {loading ? 'Analyzing... ⏳' : 'Analyze Resume'}
        </button>

        {result && (
          <div style={{ marginTop: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: result.score >= 70 ? '#16a34a' : result.score >= 50 ? '#d97706' : '#dc2626' }}>
                {result.score}/100
              </div>
              <p style={{ color: '#666' }}>Resume Score</p>
            </div>

            <p style={{ color: '#444', marginBottom: '1.5rem', lineHeight: '1.6' }}>{result.summary}</p>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#1d4ed8', marginBottom: '0.8rem' }}>Skills Found</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {result.skills?.map((skill, i) => (
                  <span key={i} style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.9rem' }}>{skill}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#16a34a', marginBottom: '0.8rem' }}>Strengths 💪</h3>
              {result.strengths?.map((s, i) => (
                <p key={i} style={{ color: '#444', marginBottom: '0.4rem' }}>✅ {s}</p>
              ))}
            </div>

            <div>
              <h3 style={{ color: '#dc2626', marginBottom: '0.8rem' }}>Areas to Improve 📈</h3>
              {result.improvements?.map((imp, i) => (
                <p key={i} style={{ color: '#444', marginBottom: '0.4rem' }}>⚠️ {imp}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Resume;