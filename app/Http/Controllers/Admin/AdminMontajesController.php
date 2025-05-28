<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Montaje;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminMontajesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filas = $request->input('mostrar_filas', 15);

        return Inertia::render('admin/montajes/tabla-montajes', [
            'montajes' => Montaje::with('usuario')->latest()->paginate($filas),
        ]);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return inertia('admin/montajes/ver-montaje', [
            'montaje' => Montaje::findOrFail($id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $disco = Montaje::findOrFail($id);
        $disco->delete();

        return redirect()->route('admin.montajes')->with('success', 'Montaje eliminado correctamente');
    }
}
