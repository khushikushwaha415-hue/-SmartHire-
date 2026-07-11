
import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import JobCard from '../components/JobCard';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchMyApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await API.get('/jobs');
      setJobs(data);
    } catch (err) {
      setMessage('Failed to load jobs');
    }
  };

  const fetchMyApplications = async () => {
    try {
      const { data } = await API.get('/applications/my');
      const appliedJobIds = data.map(app => app.job._id);
      setAppliedJobs(appliedJobIds);
    } catch (err) {
      console.log(err);
    }
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

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#1d4ed8' }}>Available Jobs</h2>
      {message && <p style={{ color: 'green', marginBottom: '1rem' }}>{message}</p>}
      {jobs.length === 0 ? (
        <p style={{ color: '#666', textAlign: 'center', marginTop: '2rem' }}>No jobs available yet!</p>
      ) : (
        jobs.map(job => (
          <JobCard
            key={job._id}
            job={job}
            onApply={handleApply}
            isApplied={appliedJobs.includes(job._id)}
          />
        ))
      )}
    </div>
  );
}

export default Jobs;
