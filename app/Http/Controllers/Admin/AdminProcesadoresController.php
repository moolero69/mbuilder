<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Procesador;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProcesadoresController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/procesadores/tabla-procesadores', [
            'procesadores' => Procesador::latest()->paginate(15)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/procesadores/añadir-procesador');
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
            'graficos_integrados' => 'required|string|max:255',
            'disipador_incluido' => 'required|string|max:255',
            'frecuencia_base' => 'required|numeric',
            'frecuencia_turbo' => 'required|numeric',
            'nucleos' => 'required|integer',
            'hilos' => 'required|integer',
            'cache' => 'required|integer',
            'passmark' => 'required|integer',
            'consumo' => 'required|integer',
            'precio' => 'required|numeric',
        ]);

        Procesador::create($validar);

        return redirect()->route('admin.procesadores')->with('success', 'Procesador añadido correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $procesador = Procesador::findOrFail($id); // busca el procesador por su id o lanza 404

        return inertia('admin/procesadores/editar-procesador', [
            'procesador' => $procesador,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validar = $request->validate([
            'nombre' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'socket' => 'required|string',
            'graficos_integrados' => 'required|string',
            'disipador_incluido' => 'required|string',
            'frecuencia_base' => 'required|numeric',
            'frecuencia_turbo' => 'required|numeric',
            'nucleos' => 'required|integer',
            'hilos' => 'required|integer',
            'cache' => 'required|numeric',
            'passmark' => 'required|integer',
            'consumo' => 'required|integer',
            'precio' => 'required|numeric',
        ]);

        $procesador = Procesador::findOrFail($id);
        $procesador->update($validar);

        return redirect()->route('admin.procesadores')->with('success', 'Procesador actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
