import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './AdminDashboard.css';
import axios from 'axios';
import { data } from 'react-router-dom';

function AdminDashboard() {
  const [guruList, setGuruList] = useState([]);
  const [siswaList, setSiswaList] = useState([]);
  const [kelasList, setKelasList] = useState([]);
  const [mode, setMode] = useState('');

  const [namaGuru, setNamaGuru] = useState('');
  const [nipGuru, setNipGuru] = useState('');
  const [emailGuru, setEmailGuru] = useState('');
  const [passwordGuru, setPasswordGuru] = useState('');
  const [editIdGuru, setEditIdGuru] = useState(null);

  const [namaSiswa, setNamaSiswa] = useState('');
  const [nismSiswa, setNismSiswa] = useState('');
  const [kelasSiswa, setKelasSiswa] = useState('');
  const [passwordSiswa, setPasswordSiswa] = useState('');
  const [editIdSiswa, setEditIdSiswa] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://127.0.0.1:8000/api/admin/gurus').then(res => setGuruList(res.data));
    axios.get('http://127.0.0.1:8000/api/siswas').then(res => setSiswaList(res.data));
    axios.get('http://127.0.0.1:8000/api/kelas').then(res => setKelasList(res.data));
  };

  const handleClick = (label, item = null) => {
    setMode(label);
    if (label.includes('Guru')) {
      if (item) {
        setEditIdGuru(item.id);
        setNamaGuru(item.nama);
        setNipGuru(item.nip);
        setEmailGuru(item.email);
        setPasswordGuru('');
      } else {
        setEditIdGuru(null);
        setNamaGuru('');
        setNipGuru('');
        setEmailGuru('');
        setPasswordGuru('');
      }
    } else if (label.includes('Siswa')) {
      if (item) {
        setEditIdSiswa(item.id);
        setNamaSiswa(item.nama);
        setNismSiswa(item.nism);
        setKelasSiswa(item.kelas_id);
        setPasswordSiswa('');
      } else {
        setEditIdSiswa(null);
        setNamaSiswa('');
        setNismSiswa('');
        setKelasSiswa('');
        setPasswordSiswa('');
      }
    }
  };

  const handleSubmitGuru = (e) => {
    e.preventDefault();
    const data = { nama: namaGuru, nip: nipGuru, email: emailGuru, password: passwordGuru };
    const request = editIdGuru
      ? axios.put(`http://127.0.0.1:8000/api/admin/gurus/${editIdGuru}`, data)
      : axios.post('http://127.0.0.1:8000/api/admin/gurus', data);

    request.then(() => {
      alert(editIdGuru ? 'Guru diperbarui' : 'Guru ditambahkan');
      fetchData();
      setMode('');
    }).catch(() => alert('Gagal menyimpan guru'));
  };

  const handleDeleteGuru = (id) => {
    if (window.confirm('Hapus guru ini?')) {
      axios.delete(`http://127.0.0.1:8000/api/admin/gurus/${id}`)
        .then(() => { alert('Guru dihapus'); fetchData(); })
        .catch(() => alert('Gagal menghapus guru'));
    }
  };

  const handleSubmitSiswa = (e) => {
    e.preventDefault();
    const data = { nama: namaSiswa, nism: nismSiswa, kelas_id: kelasSiswa, password: passwordSiswa };
    const request = editIdSiswa
      ? axios.put(`http://127.0.0.1:8000/api/siswas/${editIdSiswa}`, data)
      : axios.post('http://127.0.0.1:8000/api/siswas', data);

    request.then(() => {
      alert(editIdSiswa ? 'Siswa diperbarui' : 'Siswa ditambahkan');
      fetchData();
      setMode('');
    }).catch(() => alert('Gagal menyimpan siswa'));
  };

  const handleDeleteSiswa = (id) => {
    if (window.confirm('Hapus siswa ini?')) {
      axios.delete(`http://127.0.0.1:8000/api/siswas/${id}`)
        .then(() => { alert('Siswa dihapus'); fetchData(); })
        .catch(() => alert('Gagal menghapus siswa'));
    }
  };

  const renderForm = () => {
    switch (mode) {
      case 'Tambah Guru':
      case 'Edit Guru':
        return (
          <div className="form-box">
            <h3>{mode}</h3>
            <form onSubmit={handleSubmitGuru}>
              <input type="text" placeholder="Nama Guru" value={namaGuru} onChange={(e) => setNamaGuru(e.target.value)} required />
              <input type="text" placeholder="Kode Guru (NIP)" value={nipGuru} onChange={(e) => setNipGuru(e.target.value)} required />
              <input type="email" placeholder="Email" value={emailGuru} onChange={(e) => setEmailGuru(e.target.value)} required />
              <input type="password" placeholder="Password Baru" value={passwordGuru} onChange={(e) => setPasswordGuru(e.target.value)} required={!editIdGuru} />
              <button type="submit">Simpan</button>
            </form>
          </div>
        );
      case 'Tambah Siswa':
      case 'Edit Siswa':
        return (
          <div className="form-box">
            <h3>{mode}</h3>
            <form onSubmit={handleSubmitSiswa}>
              <input type="text" placeholder="Nama Siswa" value={namaSiswa} onChange={(e) => setNamaSiswa(e.target.value)} required />
              <input type="text" placeholder="NISM" value={nismSiswa} onChange={(e) => setNismSiswa(e.target.value)} required />
              <select value={kelasSiswa} onChange={(e) => setKelasSiswa(e.target.value)} required>
                <option value="">Pilih Kelas</option>
                {kelasList.map(k => (
                  <option key={k.id} value={k.id}>{k.nama_kelas}</option>
                ))}
              </select>
              <input type="password" placeholder="Password Baru" value={passwordSiswa} onChange={(e) => setPasswordSiswa(e.target.value)} required={!editIdSiswa} />
              <button type="submit">Simpan</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar peran="admin" />
      <div className="dashboard-container">
        <div className="logo-wrapper">
          <h1 className="main-title">Dashboard Admin</h1>
          <p className="subtitle">Kelola data akun dan statistik</p>
        </div>

        <div className="section">
          <h2 className="section-title">Manajemen Akun</h2>
          <div className="section-buttons">
            {['Tambah Guru', 'Tambah Siswa'].map(label => (
              <button key={label} className="section-button" onClick={() => handleClick(label)}>{label}</button>
            ))}
          </div>
          {(mode.includes('Guru') || mode.includes('Siswa')) && renderForm()}

          <span className="table-caption">Data Guru</span>
          <table className="table-data">
            <thead>
              <tr><th>ID</th><th>Nama</th><th>Email</th><th>Aksi</th></tr>
            </thead>
            <tbody>
              {guruList.map(g => (
                <tr key={g.id}>
                  <td>{g.id}</td><td>{g.nama}</td><td>{g.email}</td>
                  <td>
                    <button onClick={() => handleClick('Edit Guru', g)}>Edit</button>
                    <button onClick={() => handleDeleteGuru(g.id)}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <span className="table-caption">Data Siswa</span>
          <table className="table-data">
            <thead>
              <tr><th>ID</th><th>Nama</th><th>NISM</th><th>Kelas</th><th>Aksi</th></tr>
            </thead>
            <tbody>
              {siswaList.map(s => (
                <tr key={s.id}>
                  <td>{s.id}</td><td>{s.nama}</td><td>{s.nism}</td><td>{s.kelas?.nama_kelas || '-'}</td>
                  <td>
                    <button onClick={() => handleClick('Edit Siswa', s)}>Edit</button>
                    <button onClick={() => handleDeleteSiswa(s.id)}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
