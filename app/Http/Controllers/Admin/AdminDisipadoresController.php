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
    public function index(Request $request)
    {
        $filas = $request->input('mostrar_filas', 15);
    
        return Inertia::render('admin/disipadores/tabla-disipadores', [
            'disipadores' => Disipador::latest()->paginate($filas)
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

        return inertia('admin/disipadores/editar-disipador', [
            'disipador' => Disipador::findOrFail($id) // busca el componente por su id o lanza 404,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validar = $request->validate([
            'nombre' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'socket' => 'string|max:255',
            'refrigeracion_liquida' => 'required|string|max:255',
            'consumo' => 'required|numeric|min:0',
            'precio' => 'required|numeric|min:0',
        ]);

        $disipador = Disipador::findOrFail($id);
        $disipador->update($validar);

        return to_route('admin.disipadores')->with('success', 'Disipador actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $disipador = Disipador::findOrFail($id);
        $disipador->delete();

        return redirect()->route('admin.disipadores')->with('success', 'Disipador eliminado correctamente');
    }
}
