<?php

use App\Http\Controllers\Montaje\MontajeController;
use App\Http\Controllers\Montaje\MontajeDiscoDuroController;
use App\Http\Controllers\Montaje\MontajeFuenteAlimentacionController;
use App\Http\Controllers\Montaje\MontajePlacaBaseController;
use App\Http\Controllers\Montaje\MontajeProcesadorController;
use App\Http\Controllers\Montaje\MontajeDisipadorController;
use App\Http\Controllers\Montaje\MontajeRamController;
use App\Http\Controllers\Montaje\MontajeTarjetaGraficaController;
use App\Http\Controllers\Montaje\MontajeTorreController;
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

    Route::get('montaje/tipo-montaje', function () {return Inertia::render('montaje/tipoMontaje');})->name('montaje.tipo');
    Route::get('montaje/procesador', MontajeProcesadorController::class)->name('montaje.procesador');
    Route::get('montaje/disipador', MontajeDisipadorController::class)->name('montaje.disipador');
    Route::get('montaje/placaBase', MontajePlacaBaseController::class)->name('montaje.placaBase');
    Route::get('montaje/memoriaRam', MontajeRamController::class)->name('montaje.memoriaRam');
    Route::get('montaje/discoDuro', MontajeDiscoDuroController::class)->name('montaje.discoDuro');
    Route::get('montaje/tarjetaGrafica', MontajeTarjetaGraficaController::class)->name('montaje.tarjetaGrafica');
    Route::get('montaje/fuenteAlimentacion', MontajeFuenteAlimentacionController::class)->name('montaje.fuenteAlimentacion');
    Route::get('montaje/torre', MontajeTorreController::class)->name('montaje.torre');
    Route::get('montaje/resumen', function () {return Inertia::render('montaje/resumen');})->name('montaje.resumen');
    Route::post('montaje/guardar', [MontajeController::class, 'store'])->name('montaje.guardar');
    Route::get('montaje/editar/confirmar', function () {return Inertia::render('montaje/editarMontaje');})->name('montaje.editar.confirmar');
    Route::post('montaje/editar', [MontajeController::class, 'update'])->name('montaje.editar');
    Route::delete('montaje/eliminar', [MontajeController::class, 'destroy'])->name('montaje.eliminar');
    Route::get('usuario/montajes', [MontajeController::class, 'show'])->name('usuario.montajes');

    Route::get('pruebas', PruebasController::class)->name('pruebas');

});













require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
