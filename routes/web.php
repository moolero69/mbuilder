<?php

use App\Http\Controllers\Admin\AdminDiscosDurosController;
use App\Http\Controllers\Admin\AdminDisipadoresController;
use App\Http\Controllers\Admin\AdminFuentesAlimentacionController;
use App\Http\Controllers\Admin\AdminMemoriasRamController;
use App\Http\Controllers\Admin\AdminPlacasBaseController;
use App\Http\Controllers\Admin\AdminProcesadoresController;
use App\Http\Controllers\Admin\AdminTarjetasGraficasController;
use App\Http\Controllers\Admin\AdminTorresController;
use App\Http\Controllers\Admin\AdminUsuariosController;
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

    Route::get('montaje/tipo-montaje', function () {
        return Inertia::render('montaje/tipoMontaje');
    })->name('montaje.tipo');
    Route::get('montaje/procesador', MontajeProcesadorController::class)->name('montaje.procesador');
    Route::get('montaje/disipador', MontajeDisipadorController::class)->name('montaje.disipador');
    Route::get('montaje/placaBase', MontajePlacaBaseController::class)->name('montaje.placaBase');
    Route::get('montaje/memoriaRam', MontajeRamController::class)->name('montaje.memoriaRam');
    Route::get('montaje/discoDuro', MontajeDiscoDuroController::class)->name('montaje.discoDuro');
    Route::get('montaje/tarjetaGrafica', MontajeTarjetaGraficaController::class)->name('montaje.tarjetaGrafica');
    Route::get('montaje/fuenteAlimentacion', MontajeFuenteAlimentacionController::class)->name('montaje.fuenteAlimentacion');
    Route::get('montaje/torre', MontajeTorreController::class)->name('montaje.torre');
    Route::get('montaje/resumen', function () {
        return Inertia::render('montaje/resumen');
    })->name('montaje.resumen');
    Route::post('montaje/guardar', [MontajeController::class, 'store'])->name('montaje.guardar');
    Route::get('montaje/editar/confirmar', function () {
        return Inertia::render('montaje/editarMontaje');
    })->name('montaje.editar.confirmar');
    Route::post('montaje/editar', [MontajeController::class, 'update'])->name('montaje.editar');
    Route::delete('montaje/eliminar', [MontajeController::class, 'destroy'])->name('montaje.eliminar');
    Route::get('usuario/montajes', [MontajeController::class, 'show'])->name('usuario.montajes');

    Route::get('pruebas', PruebasController::class)->name('pruebas');
});


Route::middleware(['auth', 'verified', 'es_admin'])->group(function () {
    Route::get('admin/procesadores', [AdminProcesadoresController::class, 'index'])->name('admin.procesadores');
    Route::get('admin/procesadores/crear', [AdminProcesadoresController::class, 'create'])->name('admin.procesadores.crear');
    Route::post('admin/procesadores', [AdminProcesadoresController::class, 'store'])->name('admin.procesadores.guardar');
    Route::get('admin/procesadores/editar/{id}', [AdminProcesadoresController::class, 'edit'])->name('admin.procesadores.editar');
    Route::put('admin/procesadores/editar/{id}', [AdminProcesadoresController::class, 'update'])->name('admin.procesadores.actualizar');
    Route::delete('/admin/procesadores/eliminar/{id}', [AdminProcesadoresController::class, 'destroy'])->name('admin.procesadores.eliminar');


    Route::get('admin/disipadores', [AdminDisipadoresController::class, 'index'])->name('admin.disipadores');
    Route::get('admin/disipadores/crear', [AdminDisipadoresController::class, 'create'])->name('admin.disipadores.crear');
    Route::post('admin/disipadores', [AdminDisipadoresController::class, 'store'])->name('admin.disipadores.guardar');
    Route::get('admin/disipadores/editar/{id}', [AdminDisipadoresController::class, 'edit'])->name('admin.disipadores.editar');
    Route::put('admin/disipadores/editar/{id}', [AdminDisipadoresController::class, 'update'])->name('admin.disipadores.actualizar');
    Route::delete('/admin/disipadores/eliminar/{id}', [AdminDisipadoresController::class, 'destroy'])->name('admin.disipadores.eliminar');


    Route::get('admin/placasBase', [AdminPlacasBaseController::class, 'index'])->name('admin.placasBase');
    Route::get('admin/placasBase/crear', [AdminPlacasBaseController::class, 'create'])->name('admin.placasBase.crear');
    Route::post('admin/placasBase', [AdminPlacasBaseController::class, 'store'])->name('admin.placasBase.guardar');
    Route::get('admin/placasBase/editar/{id}', [AdminPlacasBaseController::class, 'edit'])->name('admin.placasBase.editar');
    Route::put('admin/placasBase/editar/{id}', [AdminPlacasBaseController::class, 'update'])->name('admin.placasBase.actualizar');
    Route::delete('/admin/placasBase/eliminar/{id}', [AdminPlacasBaseController::class, 'destroy'])->name('admin.placasBase.eliminar');


    Route::get('admin/memoriasRam', [AdminMemoriasRamController::class, 'index'])->name('admin.memoriasRam');
    Route::get('admin/memoriasRam/crear', [AdminMemoriasRamController::class, 'create'])->name('admin.memoriasRam.crear');
    Route::post('admin/memoriasRam', [AdminMemoriasRamController::class, 'store'])->name('admin.memoriasRam.guardar');
    Route::get('admin/memoriasRam/editar/{id}', [AdminMemoriasRamController::class, 'edit'])->name('admin.memoriasRam.editar');
    Route::put('admin/memoriasRam/editar/{id}', [AdminMemoriasRamController::class, 'update'])->name('admin.memoriasRam.actualizar');
    Route::delete('/admin/memoriasRam/eliminar/{id}', [AdminMemoriasRamController::class, 'destroy'])->name('admin.memoriasRam.eliminar');


    Route::get('admin/discosDuros', [AdminDiscosDurosController::class, 'index'])->name('admin.discosDuros');
    Route::get('admin/discosDuros/crear', [AdminDiscosDurosController::class, 'create'])->name('admin.discosDuros.crear');
    Route::post('admin/discosDuros', [AdminDiscosDurosController::class, 'store'])->name('admin.discosDuros.guardar');
    Route::get('admin/discosDuros/editar/{id}', [AdminDiscosDurosController::class, 'edit'])->name('admin.discosDuros.editar');
    Route::put('admin/discosDuros/editar/{id}', [AdminDiscosDurosController::class, 'update'])->name('admin.discosDuros.actualizar');
    Route::delete('/admin/discosDuros/eliminar/{id}', [AdminDiscosDurosController::class, 'destroy'])->name('admin.discosDuros.eliminar');


    Route::get('admin/tarjetasGraficas', [AdminTarjetasGraficasController::class, 'index'])->name('admin.graficas');
    Route::get('admin/tarjetasGraficas/crear', [AdminTarjetasGraficasController::class, 'create'])->name('admin.graficas.crear');
    Route::post('admin/tarjetasGraficas', [AdminTarjetasGraficasController::class, 'store'])->name('admin.graficas.guardar');
    Route::get('admin/tarjetasGraficas/editar/{id}', [AdmintarjetasGraficasController::class, 'edit'])->name('admin.graficas.editar');
    Route::put('admin/tarjetasGraficas/editar/{id}', [AdmintarjetasGraficasController::class, 'update'])->name('admin.graficas.actualizar');
    Route::delete('/admin/tarjetasGraficas/eliminar/{id}', [AdminTarjetasGraficasController::class, 'destroy'])->name('admin.graficas.eliminar');


    Route::get('admin/fuentesAlimentacion', [AdminFuentesAlimentacionController::class, 'index'])->name('admin.fuentes');
    Route::get('admin/fuentesAlimentacion/crear', [AdminFuentesAlimentacionController::class, 'create'])->name('admin.fuentes.crear');
    Route::post('admin/fuentesAlimentacion', [AdminFuentesAlimentacionController::class, 'store'])->name('admin.fuentes.guardar');
    Route::get('admin/fuentesAlimentacion/editar/{id}', [AdminFuentesAlimentacionController::class, 'edit'])->name('admin.fuentes.editar');
    Route::put('admin/fuentesAlimentacion/editar/{id}', [AdminFuentesAlimentacionController::class, 'update'])->name('admin.fuentes.actualizar');
    Route::delete('/admin/fuentesAlimentacion/eliminar/{id}', [AdminFuentesAlimentacionController::class, 'destroy'])->name('admin.fuentes.eliminar');


    Route::get('admin/torres', [AdminTorresController::class, 'index'])->name('admin.torres');
    Route::get('admin/torres/crear', [AdminTorresController::class, 'create'])->name('admin.torres.crear');
    Route::post('admin/torres', [AdminTorresController::class, 'store'])->name('admin.torres.guardar');
    Route::get('admin/torres/editar/{id}', [AdminTorresController::class, 'edit'])->name('admin.torres.editar');
    Route::put('admin/torres/editar/{id}', [AdminTorresController::class, 'update'])->name('admin.torres.actualizar');
    Route::delete('/admin/torres/eliminar/{id}', [AdminTorresController::class, 'destroy'])->name('admin.torres.eliminar');

    Route::get('admin/usuarios', [AdminUsuariosController::class, 'index'])->name('admin.usuarios');
    Route::get('admin/usuarios/crear', [AdminUsuariosController::class, 'create'])->name('admin.usuarios.crear');
    Route::post('admin/usuarios', [AdminUsuariosController::class, 'store'])->name('admin.usuarios.guardar');
    Route::get('admin/usuarios/editar/{id}', [AdminUsuariosController::class, 'edit'])->name('admin.usuarios.editar');
    Route::put('admin/usuarios/editar/{id}', [AdminUsuariosController::class, 'update'])->name('admin.usuarios.actualizar');
    Route::delete('/admin/usuarios/eliminar/{id}', [AdminUsuariosController::class, 'destroy'])->name('admin.usuarios.eliminar');

});












require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
