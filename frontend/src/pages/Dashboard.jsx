import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [stats, setStats] = useState({ appliedJobs: 0, availableJobs: 0 });
  const [profile, setProfile] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    if (!user) navigate('/login');
    fetchStats();
    fetchProfile();
    window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 768));
    return () => window.removeEventListener('resize', () => setIsMobile(window.innerWidth <= 768));
  }, []);

  const fetchStats = async () => {
    try {
      const [jobsRes, appsRes] = await Promise.all([
        API.get('/jobs'),
        API.get('/applications/my')
      ]);
      setStats({ availableJobs: jobsRes.data.length, appliedJobs: appsRes.data.length });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProfile = async () => {
    try {
      const { data } = await API.get('/users/profile');
      setProfile(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProfileCompletion = () => {
    if (!profile) return 0;
    let score = 0;
    if (profile.name) score += 25;
    if (profile.email) score += 25;
    if (profile.bio) score += 25;
    if (profile.skills?.length > 0) score += 25;
    return score;
  };

  const getCompletionMessage = () => {
    const score = getProfileCompletion();
    if (score === 100) return 'Profile complete! 🎉';
    if (!profile?.bio && !profile?.skills?.length) return 'Add bio & skills';
    if (!profile?.bio) return 'Add bio to improve';
    if (!profile?.skills?.length) return 'Add skills to improve';
    return 'Almost there!';
  };

  const completion = getProfileCompletion();
  const cols = isMobile ? '1fr' : 'repeat(3, 1fr)';

  return (
    <div style={{ padding: isMobile ? '1rem' : '2rem', maxWidth: '1000px', margin: '0 auto' }}>

      <div style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', padding: '2rem', borderRadius: '12px', color: 'white', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: isMobile ? '1.3rem' : '1.8rem', marginBottom: '0.5rem' }}>Welcome back, {user?.name}! 👋</h2>
        <p style={{ opacity: '0.85', fontSize: isMobile ? '0.85rem' : '1rem' }}>Role: {user?.role} • {user?.email}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1d4ed8' }}>{stats.availableJobs}</div>
          <p style={{ color: '#666', marginTop: '0.3rem' }}>Available Jobs</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#16a34a' }}>{stats.appliedJobs}</div>
          <p style={{ color: '#666', marginTop: '0.3rem' }}>Jobs Applied</p>
        </div>
        <div onClick={() => navigate('/profile')} style={{ background: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center', cursor: 'pointer', border: '2px solid transparent' }} onMouseOver={e => e.currentTarget.style.border='2px solid #9333ea'} onMouseOut={e => e.currentTarget.style.border='2px solid transparent'}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: completion === 100 ? '#16a34a' : '#9333ea' }}>{completion}%</div>
          <p style={{ color: '#666', marginTop: '0.3rem' }}>Profile Complete</p>
          <p style={{ color: '#999', fontSize: '0.8rem', marginTop: '0.2rem' }}>{getCompletionMessage()}</p>
          <div style={{ marginTop: '0.5rem', background: '#f3f4f6', borderRadius: '10px', height: '6px' }}>
            <div style={{ width: `${completion}%`, background: completion === 100 ? '#16a34a' : '#9333ea', height: '6px', borderRadius: '10px' }}></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '1rem' }}>
        <div onClick={() => navigate('/jobs')} style={{ background: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center', cursor: 'pointer', border: '2px solid transparent' }} onMouseOver={e => e.currentTarget.style.border='2px solid #1d4ed8'} onMouseOut={e => e.currentTarget.style.border='2px solid transparent'}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💼</div>
          <h3 style={{ color: '#1d4ed8' }}>Browse Jobs</h3>
          <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.3rem' }}>Find your dream job</p>
        </div>
        <div onClick={() => navigate('/resume')} style={{ background: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center', cursor: 'pointer', border: '2px solid transparent' }} onMouseOver={e => e.currentTarget.style.border='2px solid #16a34a'} onMouseOut={e => e.currentTarget.style.border='2px solid transparent'}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
          <h3 style={{ color: '#16a34a' }}>Analyze Resume</h3>
          <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.3rem' }}>Get AI feedback</p>
        </div>
        <div onClick={() => navigate('/profile')} style={{ background: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center', cursor: 'pointer', border: '2px solid transparent' }} onMouseOver={e => e.currentTarget.style.border='2px solid #9333ea'} onMouseOut={e => e.currentTarget.style.border='2px solid transparent'}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👤</div>
          <h3 style={{ color: '#9333ea' }}>My Profile</h3>
          <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.3rem' }}>Update your info</p>
        </div>
      </div>

      {user?.role === 'recruiter' && (
        <div onClick={() => navigate('/post-job')} style={{ marginTop: '1rem', background: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center', cursor: 'pointer', border: '2px solid transparent' }} onMouseOver={e => e.currentTarget.style.border='2px solid #f59e0b'} onMouseOut={e => e.currentTarget.style.border='2px solid transparent'}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
          <h3 style={{ color: '#f59e0b' }}>Post a Job</h3>
          <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.3rem' }}>Hire the best talent</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
