<?php

namespace App\Http\Controllers\Montaje;

use App\Http\Controllers\Controller;
use App\Models\Torre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MontajeTorreController extends Controller
{
    public function __invoke(Request $request)
    {
        $torres = Torre::all();
        return Inertia::render('montaje/torre', [
            'torres' => $torres
        ]);
    }
}