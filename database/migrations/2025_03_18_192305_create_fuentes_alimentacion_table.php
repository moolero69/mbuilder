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
        Schema::create('fuentes_alimentacion', function (Blueprint $table) {
            $table->string('id', 7)->primary();
            $table->string('nombre');
            $table->string('marca');
            $table->string('certificacion');
            $table->integer('potencia');
            $table->string('modular');
            $table->decimal('precio', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fuentes_alimentacion');
    }
};
