import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GuruDashboard() {
  const [siswas, setSiswas] = useState([]);
  const [pesan, setPesan] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setPesan('Anda belum login sebagai guru');
      return;
    }

    axios.get('http://127.0.0.1:8000/api/guru/siswas', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })
    .then(response => {
      setSiswas(response.data);
    })
    .catch(error => {
      setPesan('Gagal mengambil data siswa');
      console.error(error);
    });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Halaman Guru</h1>
      {pesan && <p style={{ color: 'red' }}>{pesan}</p>}

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Kelas</th>
          </tr>
        </thead>
        <tbody>
          {siswas.map((siswa) => (
            <tr key={siswa.id}>
              <td>{siswa.id}</td>
              <td>{siswa.nama}</td>
              <td>{siswa.kelas ? siswa.kelas.nama_kelas : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuruDashboard;
