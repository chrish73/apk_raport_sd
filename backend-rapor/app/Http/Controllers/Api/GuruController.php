<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Siswa;
use App\Models\Nilai;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    public function showSiswaWithNilai($id)
    {
        $siswa = Siswa::with(['nilai', 'kelas'])->findOrFail($id);
        return response()->json($siswa);
    }

    public function updateNilaiSiswa(Request $request, $id)
    {
        $request->validate([
            'matematika' => 'nullable|numeric|min:0|max:100',
            'b_indonesia' => 'nullable|numeric|min:0|max:100',
            'b_inggris' => 'nullable|numeric|min:0|max:100',
            'ipa' => 'nullable|numeric|min:0|max:100',
            'ips' => 'nullable|numeric|min:0|max:100',
        ]);

        $siswa = Siswa::findOrFail($id);

        $nilai = $siswa->nilai ?? new Nilai(['siswa_id' => $siswa->id]);

        $nilai->matematika = $request->matematika;
        $nilai->b_indonesia = $request->b_indonesia;
        $nilai->b_inggris = $request->b_inggris;
        $nilai->ipa = $request->ipa;
        $nilai->ips = $request->ips;
        $nilai->save();

        return response()->json(['message' => 'Nilai berhasil diperbarui']);
    }

    public function getSiswaByKelas($kelas_id)
    {
        $siswas = Siswa::with(['kelas', 'nilai'])
                    ->where('kelas_id', $kelas_id)
                    ->get();

        return response()->json($siswas);
    }
}
