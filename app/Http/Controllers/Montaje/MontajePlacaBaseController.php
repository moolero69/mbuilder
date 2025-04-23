<?php

namespace App\Http\Controllers\Montaje;

use App\Http\Controllers\Controller;
use App\Models\PlacaBase;
use App\Models\Procesador;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MontajePlacaBaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $placasBase = PlacaBase::all();
        $procesadores = Procesador::all();
        return Inertia::render('montaje/placaBase', [
            'placasBase' => $placasBase,
            'procesadores' => $procesadores
        ]);
    }

    public function __invoke(Request $request)
    {
        $placasBase = PlacaBase::all();
        $procesadores = Procesador::all();
        return Inertia::render('montaje/placaBase', [
            'placasBase' => $placasBase,
            'procesadores' => $procesadores
        ]);
    }
}
