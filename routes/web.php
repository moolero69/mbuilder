<?php

use App\Http\Controllers\Montaje\MontajePlacaBaseController;
use App\Http\Controllers\Montaje\MontajeProcesadorController;
use App\Http\Controllers\PruebasController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('montaje/procesador', [MontajeProcesadorController::class, 'index'])->name('montaje.procesador');
    Route::get('montaje/placaBase', [MontajePlacaBaseController::class, 'index'])->name('montaje.placaBase');
    Route::get('pruebas', PruebasController::class)->name('pruebas');

});













require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
