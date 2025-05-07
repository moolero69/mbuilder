<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Disipador;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDisipadoresController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/disipadores/tabla-disipadores', [
            'disipadores' => Disipador::latest()->paginate(15)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/disipadores/añadir-disipador');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validar = $request->validate([
            'nombre' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'socket' => 'required|string|max:255',
            'refrigeracion_liquida' => 'required|string|max:255',
            'consumo' => 'required|integer',
            'precio' => 'required|numeric',
        ]);
    
        // Guardar el disipador
        Disipador::create($validar);
    
        return redirect()->route('admin.disipadores')->with('success', 'Disipador añadido correctamente.');
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
