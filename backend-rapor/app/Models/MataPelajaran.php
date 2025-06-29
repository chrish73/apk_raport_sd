<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MataPelajaran extends Model
{
    protected $fillable = ['nama'];

    public function guru()
    {
        return $this->belongsToMany(User::class, 'guru_mapel');
    }
}
