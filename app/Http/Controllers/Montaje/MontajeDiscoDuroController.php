<?php

namespace App\Http\Controllers\Montaje;

use App\Http\Controllers\Controller;
use App\Models\DiscoDuro;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MontajeDiscoDuroController extends Controller
{
    public function __invoke(Request $request)
    {
        $discosDuros = DiscoDuro::all();
        return Inertia::render('montaje/discoDuro', [
            'discosDuros' => $discosDuros
        ]);
    }
}
