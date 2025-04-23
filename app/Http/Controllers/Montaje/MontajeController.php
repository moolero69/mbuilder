<?php

namespace App\Http\Controllers\Montaje;

use App\Http\Controllers\Controller;
use App\Models\Montaje;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MontajeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'datos' => 'required|array',
        ]);

        $montaje = new Montaje();
        $montaje->user_id = Auth::id(); // Comprobar que el usuario esta autenticado
        $montaje->nombre = $request->input('nombre');
        $montaje->datos = json_encode($request->input('datos'));
        $montaje->save();
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $usuario = Auth::user();
        $montajes = $usuario->montajes()->latest()->get();

        return Inertia::render('montaje/listaMontajes', [
            'montajes' => $montajes,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        // return Inertia::render('montaje/editarMontaje');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:montajes,id',
            'nombre' => 'required|string|max:255',
            'datos' => 'required|array',
        ]);

        $montaje = Montaje::where('id', $request->input('id'))
            ->where('user_id', Auth::id()) // Comprobar que sea del usuario actual
            ->firstOrFail();

        $montaje->nombre = $request->input('nombre');
        $montaje->datos = json_encode($request->input('datos'));
        $montaje->save();

        return redirect()->route('usuario.montajes');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $montaje = Montaje::findOrFail($request->id);
        $montaje->delete();
    }
}
