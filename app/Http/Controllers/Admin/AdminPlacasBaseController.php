<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PlacaBase;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPlacasBaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filas = $request->input('mostrar_filas', 15);
    
        return Inertia::render('admin/placasBase/tabla-placas', [
            'placasBase' => PlacaBase::latest()->paginate($filas)
        ]);
    }
    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/placasBase/añadir-placa');
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
            'factor_forma' => 'required|string|max:10',
            'zocalos_ram' => 'required|integer',
            'puertos_m2' => 'required|integer',
            'puertos_sata' => 'required|integer',
            'puertos_pcie' => 'required|integer',
            'consumo' => 'required|integer',
            'precio' => 'required|numeric',
        ]);

        PlacaBase::create($validar);

        return redirect()->route('admin.placasBase')->with('success', 'Placa base añadida correctamente.');
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

        return inertia('admin/placasBase/editar-placa', [
            'placaBase' => PlacaBase::findOrFail($id) // busca el componente por su id o lanza 404,
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
            'socket' => 'required|string|max:100',
            'factor_forma' => 'required|string|max:100',
            'zocalos_ram' => 'required|integer|min:0',
            'puertos_m2' => 'required|integer|min:0',
            'puertos_sata' => 'required|integer|min:0',
            'puertos_pcie' => 'required|integer|min:0',
            'consumo' => 'required|integer|min:0',
            'precio' => 'required|numeric|min:0',
        ]);
    
        $placa = PlacaBase::findOrFail($id);
        $placa->update($validar);
    
        return redirect()->route('admin.placasBase')->with('success', 'Placa base actualizada correctamente.');
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $placa = PlacaBase::findOrFail($id);
        $placa->delete();
    
        return redirect()->route('admin.placasBase')->with('success', 'Placa base eliminada correctamente');
    }
    
}
