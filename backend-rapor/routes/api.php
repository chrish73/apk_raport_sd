<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\SiswaController;

Route::post('/daftar', [AuthController::class, 'register']);
Route::post('/masuk', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/keluar', [AuthController::class, 'logout']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/admin/users', [AdminController::class, 'index']);
    Route::middleware('auth:sanctum')->get('/admin/users/{id}', [AdminController::class, 'show']);
    Route::post('/admin/tetapkan-mapel', [AdminController::class, 'tetapkanMapel']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'destroy']);
    Route::post('/admin/guru', [AdminController::class, 'tambahGuru']);
    Route::delete('/admin/guru/{id}', [AdminController::class, 'hapusGuru']);
    Route::post('/admin/siswa', [AdminController::class, 'tambahSiswa']);
    Route::delete('/admin/siswa/{id}', [AdminController::class, 'hapusSiswa']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/guru/siswas', [GuruController::class, 'index']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/siswa/profile', [SiswaController::class, 'profile']);
});
