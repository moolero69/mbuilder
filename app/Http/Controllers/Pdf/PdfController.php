<?php

namespace App\Http\Controllers\Pdf;

use App\Http\Controllers\Controller;
use App\Models\DiscoDuro;
use App\Models\Disipador;
use App\Models\FuenteAlimentacion;
use App\Models\MemoriaRam;
use App\Models\PlacaBase;
use App\Models\Procesador;
use App\Models\TarjetaGrafica;
use App\Models\Torre;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Dompdf\Dompdf;
use Dompdf\Options;


class PdfController extends Controller
{

    public function generar()
    {
        $datos = [
            'procesador' => Procesador::first(),
            'disipador' => Disipador::first(),
            'placaBase' => PlacaBase::first(),
            'memoriaRam' => MemoriaRam::first(),
            'discoDuro' => DiscoDuro::first(),
            'tarjetaGrafica' => TarjetaGrafica::first(),
            'fuenteAlimentacion' => FuenteAlimentacion::first(),
            'torre' => Torre::first(),
        ];
    
        $pdf = Pdf::loadView('pdf.resumen-montaje', $datos);
        return $pdf->download('resumen-montaje.pdf');
    }

    public function ver()
    {
        $datos = [
            'procesador' => Procesador::first(),
            'disipador' => Disipador::first(),
            'placaBase' => PlacaBase::first(),
            'memoriaRam' => MemoriaRam::first(),
            'discoDuro' => DiscoDuro::first(),
            'discoDuroSecundario' => DiscoDuro::first(),
            'tarjetaGrafica' => TarjetaGrafica::first(),
            'fuenteAlimentacion' => FuenteAlimentacion::first(),
            'torre' => Torre::first(),
        ];
    
        $options = new Options();
        $options->set('defaultFont', 'DejaVu Sans');
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', true); // si cargas imágenes externas
        
        $dompdf = new Dompdf($options);
        $dompdf->loadHtml(view('pdf.resumen-montaje', $datos)->render(), 'UTF-8');
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        return $dompdf->stream('resumen.pdf');

        // $pdf = Pdf::loadView('pdf.resumen-montaje', $datos);
        // return $pdf->stream('resumen-montaje.pdf');
        // // return view('pdf.resumen-montaje', $datos);
    }

    // public function generarPdf(Request $request)
    // {
    //     // Recoger los datos enviados desde el frontend
    //     $procesadorId = $request->input('procesador_id');
    //     $disipadorId = $request->input('disipador_id');

    //     // Mostrar los datos con dump and die
    //     dd([
    //         'Procesador ID' => $procesadorId,
    //         'Disipador ID' => $disipadorId,
    //     ]);
    // }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
