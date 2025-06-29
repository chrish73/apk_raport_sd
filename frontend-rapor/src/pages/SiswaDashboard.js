import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SiswaDashboard() {
  const [siswa, setSiswa] = useState(null);
  const [pesan, setPesan] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setPesan('Anda belum login sebagai siswa');
      return;
    }

    axios.get('http://127.0.0.1:8000/api/siswa/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })
    .then(response => {
      setSiswa(response.data);
    })
    .catch(error => {
      setPesan('Gagal mengambil data siswa');
      console.error(error);
    });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Halaman Siswa</h1>
      {pesan && <p style={{ color: 'red' }}>{pesan}</p>}

      {siswa && (
        <div>
          <p><strong>Nama:</strong> {siswa.nama}</p>
          <p><strong>Kelas:</strong> {siswa.kelas ? siswa.kelas.nama_kelas : '-'}</p>
          <p><strong>Alamat:</strong> {siswa.alamat}</p>
        </div>
      )}
    </div>
  );
}

export default SiswaDashboard;
