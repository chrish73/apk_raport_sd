<?php

namespace App\Http\Middleware;

use Illuminate\Cookie\Middleware\EncryptCookies as Middleware;

class EncryptCookies extends Middleware
{
    /**
     * Nama-nama cookie yang tidak perlu dienkripsi.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
    ];
}
