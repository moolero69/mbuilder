<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('links_compartidos', function (Blueprint $table) {
            $table->id();
            $table->string('hash')->unique();
            $table->json('datos_montaje')->nullable();
            $table->unsignedBigInteger('montaje_id')->nullable();
            $table->timestamps();

            $table->foreign('montaje_id')->references('id')->on('montajes')->onDelete('cascade');
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('links_compartidos');
    }
};
