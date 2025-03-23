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
        Schema::create('discos_duros', function (Blueprint $table) {
            $table->string('id', 7)->primary();
            $table->string('nombre');
            $table->string('tecnologia');
            $table->string('almacenamiento');
            $table->string('conexion');
            $table->decimal('pulgadas', 3, 1);
            $table->integer('velocidad');
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
        Schema::dropIfExists('discos_duros');
    }
};
