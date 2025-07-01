<?php

namespace App\Models;

// app/Models/Siswa.php

use Illuminate\Foundation\Auth\User as Authenticatable;

class Siswa extends Authenticatable
{
    protected $fillable = [
        'nama', 'nism', 'kelas_id', 'password'
    ];

    protected $hidden = [
        'password',
    ];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function nilai()
    {
        return $this->hasOne(Nilai::class);
    }
}

