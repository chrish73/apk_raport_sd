import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditNilaiSiswa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [siswa, setSiswa] = useState(null);
  const [nilai, setNilai] = useState({
    matematika: '', b_indonesia: '', b_inggris: '', ipa: '', ips: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://127.0.0.1:8000/api/guru/siswas/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setSiswa(res.data);
      setNilai(res.data.nilai || {});
    });
  }, [id]);

  const handleChange = (e) => {
    setNilai({ ...nilai, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`http://127.0.0.1:8000/api/guru/siswas/${id}/nilai`, nilai, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      alert("Nilai berhasil diperbarui");
      navigate('/guru/dashboard');
    }).catch(() => alert("Gagal menyimpan nilai"));
  };

  if (!siswa) return <p>Loading...</p>;

  return (
    <div className="form-box">
      <h2>Edit Nilai: {siswa.nama}</h2>
      <form onSubmit={handleSubmit}>
        {['matematika', 'b_indonesia', 'b_inggris', 'ipa', 'ips'].map((mapel) => (
          <div key={mapel}>
            <label>{mapel.toUpperCase()}</label>
            <input
              type="number"
              name={mapel}
              value={nilai[mapel] || ''}
              onChange={handleChange}
              placeholder={`Nilai ${mapel}`}
              min="0"
              max="100"
            />
          </div>
        ))}
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}

export default EditNilaiSiswa;
