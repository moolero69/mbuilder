<?php

use App\Http\Controllers\Montaje\MontajeController;
use Illuminate\Support\Facades\Route;


Route::post('/montaje/{montajeId}/ver-link', [MontajeController::class, 'verLinkCompartido'])->name('montaje.ver.link');
Route::get('/compartido/{hash}', [MontajeController::class, 'verMontajeCompartido'])->name('montaje.compartido');
