<?php

// app/Models/Guru.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Guru extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'nip',
        'email',
        'password',
    ];

    protected $hidden = ['password'];
}

