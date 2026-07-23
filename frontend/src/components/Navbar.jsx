import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ background: '#1d4ed8', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
      <h1 style={{ color: 'white', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>SmartHire</h1>

      <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'transparent', border: '1px solid white', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '1.2rem' }}
        className="mobile-menu-btn">☰</button>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to='/jobs' style={{ color: 'white', textDecoration: 'none' }}>Jobs</Link>
        {user?.role === 'recruiter' && (
          <Link to='/post-job' style={{ color: 'white', textDecoration: 'none' }}>Post Job</Link>
        )}
        {user ? (
          <>
            <Link to='/dashboard' style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
            <Link to='/profile' style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
            <span style={{ color: 'white' }}>Hi, {user.name}</span>
            <button onClick={logout} style={{ color: 'white', background: 'transparent', border: '1px solid white', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/login' style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to='/register' style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
