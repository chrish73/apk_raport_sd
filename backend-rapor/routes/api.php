<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\GuruController;

Route::post('/admin/login', [AuthController::class, 'adminLogin']);
Route::post('/guru/login', [AuthController::class, 'guruLogin']);
Route::post('/siswa/login', [AuthController::class, 'siswaLogin']);

Route::post('/admin/gurus', [AdminController::class, 'storeGuru']);
Route::get('/admin/gurus', [AdminController::class, 'getAllGuru']); // hanya satu GET ke /admin/gurus
Route::put('/admin/gurus/{id}', [AdminController::class, 'updateGuru']);
Route::delete('/admin/gurus/{id}', [AdminController::class, 'destroyGuru']);

// Siswa
Route::get('siswas', [AdminController::class, 'getAllSiswa']);
Route::post('siswas', [AdminController::class, 'storeSiswa']);
Route::put('siswas/{id}', [AdminController::class, 'updateSiswa']);
Route::delete('siswas/{id}', [AdminController::class, 'deleteSiswa']);

Route::get('/kelas', [AdminController::class, 'getAllKelas']);

Route::get('guru/siswas/{id}', [GuruController::class, 'showSiswaWithNilai']);
Route::put('guru/siswas/{id}/nilai', [GuruController::class, 'updateNilai']);

Route::get('/guru/siswas/by-kelas/{kelas_id}', [\App\Http\Controllers\Api\GuruController::class, 'getSiswaByKelas']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/guru/siswas/{id}', [GuruController::class, 'showSiswaWithNilai']);
    Route::put('/guru/siswas/{id}/nilai', [GuruController::class, 'updateNilaiSiswa']);
});

Route::get('/debug-api', function () {
    return response()->json(['message' => 'API route terbaca']);
});
