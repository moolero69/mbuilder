<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Torre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTorresController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/torres/tabla-torres', [
            'torres' => Torre::latest()->paginate(15)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/torres/añadir-torre');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validar = $request->validate([
            'nombre' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'factor_forma' => 'required|string|max:10',
            'soporte_RGB' => 'required|string|max:255',
            'longitud_maxima_gpu' => 'required|integer',
            'refrigeracion_liquida' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0',
        ]);

        Torre::create($validar);

        return redirect()->route('admin.torres')->with('success', 'Torre creada exitosamente.');
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
        return inertia('admin/torres/editar-torre', [
            'torre' => Torre::findOrFail($id) // busca el componente por su id o lanza 404,
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
            'factor_forma' => 'required|string|max:255',
            'soporte_RGB' => 'required|string|max:255',
            'longitud_maxima_gpu' => 'required|integer',
            'refrigeracion_liquida' => 'required|string|max:255',
            'precio' => 'required|numeric',
        ]);
    
        $torre = Torre::findOrFail($id);
        $torre->update($validar);
    
        return redirect()->route('admin.torres')->with('success', 'Torre actualizada correctamente.');
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $torre = Torre::findOrFail($id);
        $torre->delete();
    
        return redirect()->route('admin.torres')->with('success', 'Torre eliminada correctamente');
    }
    
}
