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
        Schema::create('placas_base', function (Blueprint $table) {
            $table->string('id', 7)->primary();
            $table->string('nombre');
            $table->string('marca');
            $table->string('socket');
            $table->string('factor_forma',10);
            $table->integer('zocalos_ram');
            $table->integer('puertos_m2');
            $table->integer('puertos_sata');
            $table->integer('puertos_pcie');
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
        Schema::dropIfExists('placas_base');
    }
};
