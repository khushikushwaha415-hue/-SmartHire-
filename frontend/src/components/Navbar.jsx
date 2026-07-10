import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ background: '#1d4ed8', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ color: 'white', fontSize: '1.5rem' }}>SmartJobs</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {user ? (
          <>
            <span style={{ color: 'white' }}>Hi, {user.name}</span>
            <button onClick={logout} style={{ color: 'white', background: 'transparent', border: '1px solid white', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/login' style={{ color: 'white' }}>Login</Link>
            <Link to='/register' style={{ color: 'white' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
