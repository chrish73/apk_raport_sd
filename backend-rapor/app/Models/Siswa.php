<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    public function kelas(){
        return $this->belongsTo(Kelas::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
