<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('nilais', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('siswa_id')->unique();
            $table->integer('matematika')->nullable();
            $table->integer('b_indonesia')->nullable();
            $table->integer('b_inggris')->nullable();
            $table->integer('ipa')->nullable();
            $table->integer('ips')->nullable();
            $table->timestamps();

            $table->foreign('siswa_id')->references('id')->on('siswas')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nilais');
    }
};
