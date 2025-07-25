import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import GuruDashboard from './pages/GuruDashboard';
import SiswaDashboard from './pages/SiswaDashboard';
import EditNilaiSiswa from './pages/EditNilaiSiswa';
// import EditUser from './pages/EditUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/guru" element={<GuruDashboard />} />
        <Route path="/siswa" element={<SiswaDashboard />} />
        <Route path="/guru/edit-nilai/:id" element={<EditNilaiSiswa />} />
      </Routes>
    </Router>
  );
}

export default App;