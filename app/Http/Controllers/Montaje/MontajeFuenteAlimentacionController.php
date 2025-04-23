<?php

namespace App\Http\Controllers\Montaje;

use App\Http\Controllers\Controller;
use App\Models\FuenteAlimentacion;
use App\Models\TarjetaGrafica;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MontajeFuenteAlimentacionController extends Controller
{
    public function __invoke(Request $request)
    {
        $tarjetasGraficas = TarjetaGrafica::all();
        $fuentesAlimentacion = FuenteAlimentacion::all();
        return Inertia::render('montaje/fuenteAlimentacion', [
            'tarjetasGraficas' => $tarjetasGraficas,
            'fuentesAlimentacion' => $fuentesAlimentacion
        ]);
    }
}
