<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MemoriaRam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminMemoriasRamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/memoriasRam/tabla-memorias', [
            'memoriasRam' => MemoriaRam::latest()->paginate(15)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/memoriasRam/añadir-memoria');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validar = $request->validate([
            'nombre' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'almacenamiento' => 'required|integer|min:1',
            'tipo' => 'required|string|max:255',
            'pack' => 'required|integer|min:1',
            'frecuencia' => 'required|integer|min:1',
            'consumo' => 'required|integer|min:0',
            'precio' => 'required|numeric|min:0',
        ]);

        MemoriaRam::create($validar);

        return to_route('admin.memoriasRam')->with('success', 'Memoria RAM guardada correctamente.');
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

        return inertia('admin/memoriasRam/editar-memoria', [
            'memoriaRam' => MemoriaRam::findOrFail($id) // busca el componente por su id o lanza 404,
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
            'almacenamiento' => 'required|integer|min:0',
            'tipo' => 'required|string|max:100',
            'pack' => 'required|integer|min:1',
            'frecuencia' => 'required|integer|min:0',
            'consumo' => 'required|integer|min:0',
            'precio' => 'required|numeric|min:0',
        ]);

        $ram = MemoriaRam::findOrFail($id);
        $ram->update($validar);

        return redirect()->route('admin.memoriasRam')->with('success', 'Memoria RAM actualizada correctamente.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $memoria = MemoriaRam::findOrFail($id);
        $memoria->delete();

        return redirect()->route('admin.memoriasRam')->with('success', 'Memoria RAM eliminada correctamente');
    }
}
