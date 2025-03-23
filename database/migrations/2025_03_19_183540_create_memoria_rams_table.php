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
        Schema::create('memorias_ram', function (Blueprint $table) {
            $table->string('id', 7)->primary();
            $table->string('nombre');
            $table->string('marca');
            $table->integer('almacenamiento');
            $table->string('tipo');
            $table->integer('pack');
            $table->integer('frecuencia');
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
        Schema::dropIfExists('memorias_ram');
    }
};
