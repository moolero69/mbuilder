<?php

namespace App\Http\Controllers\Montaje;

use App\Http\Controllers\Controller;
use App\Models\Procesador;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MontajeProcesadorController extends Controller
{
    public function __invoke(Request $request)
    {
        $procesadores = Procesador::all();
        return Inertia::render('montaje/procesador', [
            'procesadores' => $procesadores,
        ]);
    }
}
