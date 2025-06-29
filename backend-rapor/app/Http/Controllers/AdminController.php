<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Guru;
use App\Models\Siswa;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function index()
    {
        // hanya admin yang bisa akses
        if (auth()->user()->peran !== 'admin') {
            return response()->json(['pesan' => 'Akses ditolak'], 403);
        }

        $users = User::where('peran', '!=', 'admin')->get();

        return response()->json($users);
    }

    public function tetapkanMapel(Request $request)
    {
        $request->validate([
            'guru_id' => 'required|exists:users,id',
            'mata_pelajaran_ids' => 'required|array',
            'mata_pelajaran_ids.*' => 'exists:mata_pelajarans,id',
        ]);

        $guru = User::find($request->guru_id);
        $guru->mataPelajarans()->sync($request->mata_pelajaran_ids);

        return response()->json(['pesan' => 'Mata pelajaran berhasil ditetapkan ke guru']);
    }

    public function destroy($id)
    {
        if (auth()->user()->peran !== 'admin') {
            return response()->json(['pesan' => 'Akses ditolak'], 403);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json(['pesan' => 'User tidak ditemukan'], 404);
        }

        $user->delete();

        return response()->json(['pesan' => 'User berhasil dihapus']);
    }
    // Tambah Guru
    public function tambahGuru(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'nip' => 'required|unique:gurus'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'peran' => 'guru'
        ]);

        Guru::create([
            'user_id' => $user->id,
            'nip' => $request->nip,
            // tambahkan kolom lain jika ada
        ]);

        return response()->json(['pesan' => 'Guru berhasil ditambahkan']);
    }

    // Hapus Guru
    public function hapusGuru($id)
    {
        $guru = Guru::findOrFail($id);
        $guru->user->delete(); // sekaligus hapus user-nya
        $guru->delete();

        return response()->json(['pesan' => 'Guru berhasil dihapus']);
    }

    // Tambah Siswa
    public function tambahSiswa(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'nis' => 'required|unique:siswas'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'peran' => 'siswa'
        ]);

        Siswa::create([
            'user_id' => $user->id,
            'nis' => $request->nis,
            // tambahkan kolom lain jika ada
        ]);

        return response()->json(['pesan' => 'Siswa berhasil ditambahkan']);
    }

    // Hapus Siswa
    public function hapusSiswa($id)
    {
        $siswa = Siswa::findOrFail($id);
        $siswa->user->delete(); // hapus user
        $siswa->delete();

        return response()->json(['pesan' => 'Siswa berhasil dihapus']);
    }

        public function show($id)
            {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        return response()->json($user);
                }

}
