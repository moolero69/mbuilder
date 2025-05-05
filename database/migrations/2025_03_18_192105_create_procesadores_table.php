<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('procesadores', function (Blueprint $table) {
            $table->string('id', 7)->primary();
            $table->string('nombre');
            $table->string('marca');
            $table->string('socket');
            $table->string('graficos_integrados');
            $table->decimal('frecuencia_base', 3, 1);
            $table->decimal('frecuencia_turbo', 3, 1);
            $table->integer('nucleos');
            $table->integer('hilos');
            $table->integer('cache');
            $table->string('disipador_incluido');
            $table->integer('passmark');
            $table->integer('consumo');
            $table->decimal('precio', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procesadores');
    }
};
