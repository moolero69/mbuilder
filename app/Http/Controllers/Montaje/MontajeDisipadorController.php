<?php

namespace App\Http\Controllers\Montaje;

use App\Http\Controllers\Controller;
use App\Models\Disipador;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MontajeDisipadorController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $disipadores = Disipador::all();
        return Inertia::render('montaje/disipador', [
            'disipadores' => $disipadores
        ]);
    }
}
