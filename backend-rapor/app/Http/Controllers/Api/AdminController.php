<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Guru;
use App\Models\Siswa;
use App\Models\Kelas;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // =========================
    // GURU
    // =========================

    public function storeGuru(Request $request)
    {
        $validated = $request->validate([
            'nama'     => 'required|string|max:255',
            'nip'      => 'required|string|max:20|unique:gurus,nip',
            'email'    => 'required|email|unique:gurus,email',
            'password' => 'required|string|min:6',
        ]);

        $guru = Guru::create([
            'nama'     => $validated['nama'],
            'nip'      => $validated['nip'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json([
            'message' => 'Guru berhasil ditambahkan',
            'data'    => $guru
        ], 201);
    }

    public function getAllGuru()
    {
        return response()->json(Guru::all());
    }

    public function updateGuru(Request $request, $id)
    {
        $guru = Guru::findOrFail($id);

        $validated = $request->validate([
            'nama'     => 'required|string',
            'nip'      => 'required|string|unique:gurus,nip,' . $id,
            'email'    => 'required|email|unique:gurus,email,' . $id,
            'password' => 'nullable|string|min:6',
        ]);

        $guru->nama  = $validated['nama'];
        $guru->nip   = $validated['nip'];
        $guru->email = $validated['email'];

        if (!empty($validated['password'])) {
            $guru->password = Hash::make($validated['password']);
        }

        $guru->save();

        return response()->json([
            'message' => 'Data guru berhasil diperbarui',
            'data'    => $guru
        ]);
    }

    public function destroyGuru($id)
    {
        $guru = Guru::findOrFail($id);
        $guru->delete();

        return response()->json(['message' => 'Guru berhasil dihapus']);
    }

    // =========================
    // SISWA
    // =========================

    public function getAllSiswa()
    {
        return response()->json(Siswa::with('kelas')->get());
    }

    public function storeSiswa(Request $request)
    {
        $validated = $request->validate([
            'nama'      => 'required|string',
            'nism'      => 'required|string|unique:siswas,nism',
            'kelas_id'  => 'required|exists:kelas,id',
            'password'  => 'required|string|min:6',
        ]);

        $siswa = Siswa::create([
            'nama'      => $validated['nama'],
            'nism'      => $validated['nism'],
            'kelas_id'  => $validated['kelas_id'],
            'password'  => Hash::make($validated['password']),
        ]);

        return response()->json(['message' => 'Siswa berhasil ditambahkan'], 201);
    }

    public function updateSiswa(Request $request, $id)
    {
        $siswa = Siswa::findOrFail($id);

        $validated = $request->validate([
            'nama'      => 'required|string',
            'nism'      => 'required|string|unique:siswas,nism,' . $id,
            'kelas_id'  => 'required|exists:kelas,id',
            'password'  => 'nullable|string|min:6',
        ]);

        $siswa->nama     = $validated['nama'];
        $siswa->nism     = $validated['nism'];
        $siswa->kelas_id = $validated['kelas_id'];

        if (!empty($validated['password'])) {
            $siswa->password = Hash::make($validated['password']);
        }

        $siswa->save();

        return response()->json(['message' => 'Siswa berhasil diperbarui']);
    }

    public function deleteSiswa($id)
    {
        $siswa = Siswa::findOrFail($id);
        $siswa->delete();

        return response()->json(['message' => 'Siswa berhasil dihapus']);
    }

    // =========================
    // KELAS
    // =========================

    public function getAllKelas()
    {
        return response()->json(Kelas::all());
    }
}
