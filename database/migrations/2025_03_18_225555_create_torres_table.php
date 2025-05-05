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
        Schema::create('torres', function (Blueprint $table) {
            $table->string('id', 7)->primary();
            $table->string('nombre');
            $table->string('marca');
            $table->string('factor_forma',10);
            $table->string('soporte_RGB');
            $table->integer('longitud_maxima_gpu');
            $table->string('refrigeracion_liquida');
            $table->decimal('precio', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('torres');
    }
};
