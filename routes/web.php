<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('pagina-inicio');
})->name('home');


require __DIR__ . '/ajustes.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/montaje.php';
require __DIR__ . '/linksCompartidos.php';
require __DIR__ . '/stripe.php';
require __DIR__ . '/medidor.php';
require __DIR__ . '/footer.php';