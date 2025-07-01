<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nilai extends Model
{
    use HasFactory;

    protected $fillable = [
        'siswa_id',
        'matematika',
        'b_indonesia',
        'b_inggris',
        'ipa',
        'ips',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }
}
