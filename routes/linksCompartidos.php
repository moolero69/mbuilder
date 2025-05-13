<?php

use App\Http\Controllers\Montaje\MontajeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::post('/montaje/compartir', [MontajeController::class, 'compartir'])->name('montaje.compartir');
Route::get('/compartido/{hash}', [MontajeController::class, 'verMontajeCompartido'])->name('montaje.compartido');
