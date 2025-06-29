<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->peran !== 'guru') {
            return response()->json(['pesan' => 'Akses hanya untuk guru'], 403);
        }

        $siswas = Siswa::with('kelas')->get();

        return response()->json($siswas);
    }
}
