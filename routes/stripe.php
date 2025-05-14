<?php

use App\Http\Controllers\Stripe\StripeController;
use Illuminate\Support\Facades\Route;

Route::get('suscribirse', [StripeController::class, 'index'])->name('usuario.suscribirse');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('suscribirse/pago', [StripeController::class, 'checkout'])->name('stripe.pago');
    Route::get('suscribirse/pago/success', [StripeController::class, 'success'])->name('stripe.success');
    Route::get('suscribirse/pago/error', [StripeController::class, 'error'])->name('stripe.error');
});
