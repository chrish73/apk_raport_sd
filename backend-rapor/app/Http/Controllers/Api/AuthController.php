<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Guru;
use App\Models\Siswa;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function adminLogin(Request $request)
    {
        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json(['message' => 'Login gagal'], 401);
        }

        return response()->json(['message' => 'Login berhasil', 'user' => $admin]);
    }

    public function guruLogin(Request $request)
    {
        $guru = Guru::where('nip', $request->nip)->first();

        if (!$guru || !Hash::check($request->password, $guru->password)) {
            return response()->json(['message' => 'Login gagal'], 401);
        }

        return response()->json(['message' => 'Login berhasil', 'user' => $guru]);
    }

    public function siswaLogin(Request $request)
    {
        $siswa = Siswa::where('nism', $request->nism)->first();

        if (!$siswa || !Hash::check($request->password, $siswa->password)) {
            return response()->json(['message' => 'Login gagal'], 401);
        }

        return response()->json(['message' => 'Login berhasil', 'user' => $siswa]);
    }
}
