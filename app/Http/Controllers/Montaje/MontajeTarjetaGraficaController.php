<?php

namespace App\Http\Controllers\Montaje;

use App\Http\Controllers\Controller;
use App\Models\DiscoDuro;
use App\Models\TarjetaGrafica;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MontajeTarjetaGraficaController extends Controller
{
    public function __invoke(Request $request)
    {
        $tarjetasGraficas = TarjetaGrafica::all();
        return Inertia::render('montaje/tarjetaGrafica', [
            'tarjetasGraficas' => $tarjetasGraficas,
        ]);
    }
}
