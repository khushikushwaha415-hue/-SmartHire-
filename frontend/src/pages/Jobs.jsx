
import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import JobCard from '../components/JobCard';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [message, setMessage] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [skill, setSkill] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    fetchJobs();
    fetchMyApplications();
    window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 768));
    return () => window.removeEventListener('resize', () => setIsMobile(window.innerWidth <= 768));
  }, []);

  useEffect(() => {
    filterJobs();
  }, [search, location, skill, jobs]);

  const fetchJobs = async () => {
    try {
      const { data } = await API.get('/jobs');
      setJobs(data);
      setFiltered(data);
    } catch (err) {
      setMessage('Failed to load jobs');
    }
  };

  const fetchMyApplications = async () => {
    try {
      const { data } = await API.get('/applications/my');
      setAppliedJobs(data.map(app => app.job._id));
    } catch (err) {
      console.log(err);
    }
  };

  const filterJobs = () => {
    let result = jobs;
    if (search) result = result.filter(job => job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase()));
    if (location) result = result.filter(job => job.location?.toLowerCase().includes(location.toLowerCase()));
    if (skill) result = result.filter(job => job.skillsRequired?.some(s => s.toLowerCase().includes(skill.toLowerCase())));
    setFiltered(result);
  };

  const handleApply = async (jobId) => {
    try {
      await API.post('/applications/apply', { jobId });
      setAppliedJobs([...appliedJobs, jobId]);
      setMessage('Applied successfully! ✅');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Apply failed');
    }
  };

  const clearFilters = () => {
    setSearch('');
    setLocation('');
    setSkill('');
  };

  return (
    <div style={{ padding: isMobile ? '1rem' : '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#1d4ed8' }}>Available Jobs</h2>

      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
          <input placeholder='🔍 Search job or company...' value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.9rem' }} />
          <input placeholder='📍 Filter by location...' value={location} onChange={e => setLocation(e.target.value)} style={{ padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.9rem' }} />
          <input placeholder='🛠️ Filter by skill...' value={skill} onChange={e => setSkill(e.target.value)} style={{ padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.9rem' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Showing {filtered.length} of {jobs.length} jobs</p>
          <button onClick={clearFilters} style={{ padding: '0.4rem 1rem', background: '#f3f4f6', border: 'none', borderRadius: '6px', cursor: 'pointer', color: '#666' }}>Clear Filters</button>
        </div>
      </div>

      {message && <p style={{ color: 'green', marginBottom: '1rem' }}>{message}</p>}

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '10px' }}>
          <p style={{ fontSize: '2rem' }}>🔍</p>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>No jobs found!</p>
          <button onClick={clearFilters} style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', background: '#1d4ed8', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Clear Filters</button>
        </div>
      ) : (
        filtered.map(job => (
          <JobCard key={job._id} job={job} onApply={handleApply} isApplied={appliedJobs.includes(job._id)} />
        ))
      )}
    </div>
  );
}

export default Jobs;
