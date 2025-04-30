<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('ajustes/perfil', [ProfileController::class, 'edit'])->name('perfil.editar');
    Route::patch('ajustes/perfil', [ProfileController::class, 'update'])->name('perfil.actualizar');
    Route::delete('ajustes/perfil', [ProfileController::class, 'destroy'])->name('perfil.eliminar');

    Route::get('ajustes/contraseña', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('ajustes/contraseña', [PasswordController::class, 'update'])->name('contraseña.actualizar');

    Route::get('ajustes/apariencia', function () {
        return Inertia::render('settings/apariencia');
    })->name('appearance');
});
