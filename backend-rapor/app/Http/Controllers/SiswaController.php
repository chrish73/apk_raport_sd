<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    public function profile(Request $request)
    {
        if ($request->user()->peran !== 'siswa') {
            return response()->json(['pesan' => 'Akses hanya untuk siswa'], 403);
        }

        // Ambil data siswa yang berelasi dengan user yang sedang login
        $userId = $request->user()->id;
        $siswa = Siswa::with('kelas')->where('user_id', $userId)->first();

        if (!$siswa) {
            return response()->json(['pesan' => 'Data siswa tidak ditemukan'], 404);
        }

        return response()->json($siswa);
    }
}
