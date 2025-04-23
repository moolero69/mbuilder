<?php

namespace App\Http\Controllers\Montaje;

use App\Http\Controllers\Controller;
use App\Models\MemoriaRam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MontajeRamController extends Controller
{
    public function __invoke(Request $request)
    {
        $memoriasRam = MemoriaRam::all();
        return Inertia::render('montaje/memoriaRam', [
            'memoriasRam' => $memoriasRam
        ]);
    }
}
