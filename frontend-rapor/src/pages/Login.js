import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
// import logo from './logo.png';

const Login = () => {
  const [peran, setPeran] = useState('siswa');
  const [nism, setNism] = useState('');
  const [nip, setNip] = useState('');
  const [email, setEmail] = useState('');
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');
  const [pesan, setPesan] = useState('');

  const handlePeranChange = (role) => {
    setPeran(role);
    setPesan('');
    setNism('');
    setNip('');
    setEmail('');
    setNama('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = '';
    let data = {};

    if (peran === 'siswa') {
      url = 'http://127.0.0.1:8000/api/siswa/login';
      data = { nism, password };
    } else if (peran === 'guru') {
      url = 'http://127.0.0.1:8000/api/guru/login';
      data = { nip, password };
    } else {
      url = 'http://127.0.0.1:8000/api/admin/login';
      data = { email, password };
    }

    try {
      const res = await axios.post(url, data);
      localStorage.setItem('peran', peran);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setPesan('Login berhasil');

      window.location.href = `/${peran}`;
    } catch (err) {
      setPesan(err.response?.data?.message || 'Login gagal. Coba lagi.');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="header-section">
        {/* <img src={logo} alt="Logo" className="logo-image" /> */}
        <h1 className="main-title">Rapor Digital Siswa</h1>
        <p className="subtitle">Kementerian Pendidikan</p>
        <h2 className="school-name">SD Indonesia</h2>
      </div>

      <div className="login-box">
        <div className="role-buttons">
          <button onClick={() => handlePeranChange('siswa')} className={peran === 'siswa' ? 'active' : ''}>Siswa</button>
          <button onClick={() => handlePeranChange('guru')} className={peran === 'guru' ? 'active' : ''}>Guru</button>
          <button onClick={() => handlePeranChange('admin')} className={peran === 'admin' ? 'active' : ''}>Admin</button>
        </div>

        <div className="role-title">Login {peran.charAt(0).toUpperCase() + peran.slice(1)}</div>

        <p className="error-message">{pesan}</p>

        <form onSubmit={handleSubmit}>
          {peran === 'siswa' && (
            <>
              <div className="input-group">
                <label>NISM</label>
                <input
                  type="text"
                  value={nism}
                  onChange={(e) => setNism(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {peran === 'guru' && (
            <>
              <div className="input-group">
                <label>NIP</label>
                <input
                  type="text"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {peran === 'admin' && (
            <>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
