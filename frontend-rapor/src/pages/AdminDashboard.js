import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditUser from './EditUser';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [pesan, setPesan] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setPesan('Anda belum login sebagai admin');
      return;
    }

    axios.get('http://127.0.0.1:8000/api/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    })
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      setPesan('Gagal mengambil data user');
      console.error(error);
    });
  }, []);

  if (editingUserId) {
    return <EditUser userId={editingUserId} onBack={() => setEditingUserId(null)} />;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Halaman Admin</h1>
      {pesan && <p style={{ color: 'red' }}>{pesan}</p>}

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Peran</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.peran}</td>
              <td>
                <button onClick={() => setEditingUserId(user.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
