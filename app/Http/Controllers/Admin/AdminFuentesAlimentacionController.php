<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FuenteAlimentacion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminFuentesAlimentacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/fuentesAlimentacion/tabla-fuentes', [
            'fuentesAlimentacion' => FuenteAlimentacion::latest()->paginate(15)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/fuentesAlimentacion/añadir-fuente');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validar = $request->validate([
            'nombre' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'certificacion' => 'required|string|max:255',
            'potencia' => 'required|integer|min:1',
            'modular' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0',
        ]);

        FuenteAlimentacion::create($validar);

        // Redireccionar con mensaje de éxito
        return redirect()->route('admin.fuentes')->with('success', 'Fuente de alimentación creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function destroy(string $id)
    {
        //
    }
}
