import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pesan, setPesan] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/masuk', {
        email,
        password
      });

      // Simpan token ke localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('peran', res.data.user.peran);
      setPesan('Login berhasil');

      // Redirect sesuai peran (bisa kamu sesuaikan)
      if (res.data.user.peran === 'admin') {
        window.location.href = '/admin';
      } else if (res.data.user.peran === 'guru') {
        window.location.href = '/guru';
      } else {
        window.location.href = '/siswa';
      }

    } catch (err) {
      if (err.response) {
        setPesan(err.response.data.pesan);
      } else {
        setPesan('Gagal login. Coba lagi.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <p className="text-red-500 mb-2">{pesan}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
