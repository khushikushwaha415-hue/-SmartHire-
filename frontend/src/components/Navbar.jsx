
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    color: isActive(path) ? '#fbbf24' : 'white',
    textDecoration: 'none',
    fontWeight: isActive(path) ? '600' : '400',
    borderBottom: isActive(path) ? '2px solid #fbbf24' : '2px solid transparent',
    paddingBottom: '2px',
    transition: 'all 0.2s'
  });

  return (
    <nav style={{ background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
      <h1 onClick={() => navigate(user ? '/dashboard' : '/login')} style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '0.5px' }}>
        Smart<span style={{ color: '#fbbf24' }}>Hire</span>
      </h1>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to='/jobs' style={linkStyle('/jobs')}>Jobs</Link>
        {user?.role === 'jobseeker' && (
          <Link to='/my-applications' style={linkStyle('/my-applications')}>My Applications</Link>
        )}
        {user?.role === 'recruiter' && (
          <Link to='/post-job' style={linkStyle('/post-job')}>Post Job</Link>
        )}
        {user ? (
          <>
            <Link to='/dashboard' style={linkStyle('/dashboard')}>Dashboard</Link>
            <Link to='/resume' style={linkStyle('/resume')}>Resume</Link>
            <Link to='/profile' style={linkStyle('/profile')}>Profile</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '1rem' }}>
              <div style={{ background: '#fbbf24', color: '#1d4ed8', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <button onClick={logout} style={{ color: 'white', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '0.3rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to='/login' style={linkStyle('/login')}>Login</Link>
            <Link to='/register' style={{ color: '#1d4ed8', background: 'white', padding: '0.4rem 1rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
