<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/cookies', function () {
    return Inertia::render('legal/cookies/politicaCookies');
})->name('cookies');

Route::get('/privacidad', function () {
    return Inertia::render('legal/privacidad/politicaPrivacidad');
})->name('privacidad');

Route::get('/filtros/montaje', function () {
    return Inertia::render('filtros/filtrosMontaje');
})->name('filtros.montaje');

Route::get('/filtros/medidor', function () {
    return Inertia::render('filtros/filtrosMedidor');
})->name('filtros.medidor');