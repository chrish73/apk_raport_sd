import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditUser({ userId, onBack }) {
  const [user, setUser] = useState(null);
  const [pesan, setPesan] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })
    .then(res => setUser(res.data))
    .catch(err => setPesan('Gagal mengambil data user.'));
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/admin/users/${userId}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })
    .then(() => {
      setPesan('User berhasil diupdate');
    })
    .catch(err => {
      console.error(err);
      setPesan('Gagal update user.');
    });
  };

  if (!user) return <p>Memuat data...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Edit Pengguna</h2>
      {pesan && <p>{pesan}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama:</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div>
          <label>Peran:</label>
          <select name="peran" value={user.peran} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="guru">Guru</option>
            <option value="siswa">Siswa</option>
          </select>
        </div>
        <button type="submit">Simpan</button>
        <button type="button" onClick={onBack}>Kembali</button>
      </form>
    </div>
  );
}

export default EditUser;
