<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DiscoDuro;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDiscosDurosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/discosDuros/tabla-discos', [
            'discosDuros' => DiscoDuro::latest()->paginate(15)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/discosDuros/añadir-disco');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'tecnologia' => 'required|string|max:255',
            'almacenamiento' => 'required|string|max:255',
            'conexion' => 'required|string|max:255',
            'pulgadas' => 'required|numeric|min:0',
            'velocidad' => 'required|integer|min:0',
            'consumo' => 'required|numeric|min:0',
            'precio' => 'required|numeric|min:0',
        ]);

        DiscoDuro::create($validated);

        return to_route('admin.discosDuros')->with('success', 'Disco duro creado correctamente.');
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

        return inertia('admin/discosDuros/editar-disco', [
            'discoDuro' => DiscoDuro::findOrFail($id) // busca el componente por su id o lanza 404,
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
            'tecnologia' => 'required|string|max:255',
            'almacenamiento' => 'required|string|max:255',
            'conexion' => 'required|string|max:255',
            'pulgadas' => 'required|numeric',
            'velocidad' => 'required|integer',
            'consumo' => 'required|integer',
            'precio' => 'required|numeric',
        ]);

        $disco = DiscoDuro::findOrFail($id);
        $disco->update($validar);

        return redirect()->route('admin.discosDuros')->with('success', 'Disco duro actualizado correctamente.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $disco = DiscoDuro::findOrFail($id);
        $disco->delete();

        return redirect()->route('admin.discosDuros')->with('success', 'Disco duro eliminado correctamente');
    }
}
