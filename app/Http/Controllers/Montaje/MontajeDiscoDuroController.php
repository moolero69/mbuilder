<?php

namespace App\Http\Controllers\Montaje;

use App\Http\Controllers\Controller;
use App\Models\DiscoDuro;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MontajeDiscoDuroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $discosDuros = DiscoDuro::all();
        return Inertia::render('montaje/discoDuro', [
            'discosDuros' => $discosDuros
        ]);
    }

    public function __invoke(Request $request)
    {
        $discosDuros = DiscoDuro::all();
        return Inertia::render('montaje/discoDuro', [
            'discosDuros' => $discosDuros
        ]);
    }
}
