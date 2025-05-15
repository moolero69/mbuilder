<?php

use App\Http\Controllers\Medidor\MedidorController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('medidor', [MedidorController::class, 'index'])->name('medidor.index');
});
