<?php

use App\Http\Controllers\Montaje\MontajeDiscoDuroController;
use App\Http\Controllers\Montaje\MontajeFuenteAlimentacionController;
use App\Http\Controllers\Montaje\MontajePlacaBaseController;
use App\Http\Controllers\Montaje\MontajeProcesadorController;
use App\Http\Controllers\Montaje\MontajeRamController;
use App\Http\Controllers\Montaje\MontajeResumenController;
use App\Http\Controllers\Montaje\MontajeTarjetaGraficaController;
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
    Route::get('montaje/memoriaRam', [MontajeRamController::class, 'index'])->name('montaje.memoriaRam');
    Route::get('montaje/discoDuro', [MontajeDiscoDuroController::class, 'index'])->name('montaje.discoDuro');
    Route::get('montaje/tarjetaGrafica', [MontajeTarjetaGraficaController::class, 'index'])->name('montaje.tarjetaGrafica');
    Route::get('montaje/fuenteAlimentacion', [MontajeFuenteAlimentacionController::class, 'index'])->name('montaje.fuenteAlimentacion');
    Route::get('montaje/resumen', [MontajeResumenController::class, 'index'])->name('montaje.resumen');
    Route::get('pruebas', PruebasController::class)->name('pruebas');

});













require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
