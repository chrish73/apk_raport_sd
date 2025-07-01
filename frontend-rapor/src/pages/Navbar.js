// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
//import logo from './logo.png';

const Navbar = ({ peran, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          {/* <img src={logo} alt="Logo" className="logo-image" /> */}
          <div>
            <h1 className="logo-title">Rapor Digital SD</h1>
            <p className="logo-sub">Kementerian Pendidikan</p>
          </div>
        </div>
      </div>

      <div className="navbar-right">
        {peran === 'guru' && (
          <>
            <button onClick={() => navigate('/guru')} className="nav-btn">Dashboard</button>
            <button onClick={() => navigate('/guru/input-nilai')} className="nav-btn">Input Nilai</button>
          </>
        )}
        {peran === 'admin' && (
          <>
            <button onClick={() => navigate('/admin')} className="nav-btn">Dashboard</button>
            <button onClick={() => navigate('/admin/data')} className="nav-btn">Kelola Data</button>
          </>
        )}
        {peran === 'siswa' && (
          <button onClick={() => navigate('/siswa')} className="nav-btn">Rapor Saya</button>
        )}
        <button onClick={onLogout} className="nav-btn logout">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;