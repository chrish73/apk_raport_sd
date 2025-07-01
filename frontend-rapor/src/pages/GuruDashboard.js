import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './GuruDashboard.css';
//import logo from './logo.png';

function GuruDashboard() {
  const [siswas, setSiswas] = useState([]);
  const [pesan, setPesan] = useState('');
  const [kelasAktif, setKelasAktif] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  const ambilSiswaByKelas = (kelasId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    setPesan('Token tidak ditemukan');
    return;
  }

  setIsLoading(true);
  axios.get(`http://127.0.0.1:8000/api/guru/siswas/by-kelas/${kelasId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
  })
    .then(response => {
      setSiswas(response.data);
      setKelasAktif(kelasId);
      setIsLoading(false);
    })
    .catch(error => {
      console.error(error);
      setPesan('Gagal mengambil data siswa');
      setIsLoading(false);
    });
};


    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        setPesan('Anda belum login sebagai guru');
        setIsLoading(false);
    }

    axios.get('http://127.0.0.1:8000/api/guru/siswas', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })
    .then(response => {
      setSiswas(response.data);
      setIsLoading(false);
    })
    .catch(error => {
      setPesan('Gagal mengambil data siswa');
      setIsLoading(false);
      console.error(error);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

    const filteredSiswas = siswas.filter(siswa =>
    siswa.nama.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
      <Navbar peran="guru" onLogout={handleLogout} />

      <div className="dashboard-container">
        <div className="logo-wrapper">
          {/* <img src={logo} alt="Logo" className="logo-image" /> */}
          <h1 className="main-title">Dashboard Guru</h1>
          <p className="subtitle">Pantau data siswa dan input nilai rapor</p>
        </div>

        {pesan && <p className="alert-error">{pesan}</p>}

        <div className="kelas-buttons">
        {[1, 2, 3, 4, 5, 6].map(k => (
            <button
            key={k}
            onClick={() => ambilSiswaByKelas(k)} // sebelumnya setKelasAktif(k)
            className={`kelas-btn ${kelasAktif === k ? 'active' : ''}`}
            >
            Kelas {k}
            </button>
        ))}
        </div>


        {kelasAktif && (
          <input
            type="text"
            placeholder="Cari nama siswa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        )}

        {!kelasAktif && <p className="pilih-kelas-info">Pilih kelas untuk menampilkan data siswa.</p>}

        {kelasAktif && (
          isLoading ? <p>Loading data siswa...</p> : (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th className="small-cell">Matematika</th>
                  <th className="small-cell">B. Indonesia</th>
                  <th className="small-cell">B. Inggris</th>
                  <th className="small-cell">IPA</th>
                  <th className="small-cell">IPS</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {filteredSiswas.length > 0 ? (
                  filteredSiswas.map((siswa) => (
                    <tr key={siswa.id}>
                      <td>{siswa.id}</td>
                      <td className="nama-cell">{siswa.nama}</td>
                      <td>{siswa.nilai?.matematika || '-'}</td>
                      <td>{siswa.nilai?.b_indonesia || '-'}</td>
                      <td>{siswa.nilai?.b_inggris || '-'}</td>
                      <td>{siswa.nilai?.ipa || '-'}</td>
                      <td>{siswa.nilai?.ips || '-'}</td>
                      <td>
                        <button
                          className="action-btn"
                          onClick={() => window.location.href = `/guru/edit-nilai/${siswa.id}`}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">Tidak ada data siswa ditemukan.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )
        )}
      </div>
    </>
  );
}

export default GuruDashboard;
