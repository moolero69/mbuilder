<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TarjetaGrafica;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTarjetasGraficasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/tarjetasGraficas/tabla-graficas', [
            'tarjetasGraficas' => TarjetaGrafica::latest()->paginate(15)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/tarjetasGraficas/añadir-grafica');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validar = $request->validate([
            'nombre' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'tipo' => 'required|string|max:255',
            'serie' => 'required|string|max:255',
            'tipo_memoria' => 'required|string|max:255',
            'memoria' => 'required|integer|min:0',
            'longitud' => 'required|integer|min:0',
            'passmark' => 'required|integer|min:0',
            'consumo' => 'required|integer|min:0',
            'precio' => 'required|numeric|min:0',
        ]);

        TarjetaGrafica::create($validar);

        return to_route('admin.graficas')->with('success', 'Tarjeta gráfica añadida correctamente.');
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
