<?php

namespace App\Http\Controllers\Montaje;

use App\Http\Controllers\Controller;
use App\Models\DiscoDuro;
use App\Models\Disipador;
use App\Models\FuenteAlimentacion;
use App\Models\MemoriaRam;
use App\Models\Montaje;
use App\Models\PlacaBase;
use App\Models\Procesador;
use App\Models\TarjetaGrafica;
use App\Models\Torre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\LinkCompartido;
use Illuminate\Auth\Notifications\EmailAsistencia;

class MontajeController extends Controller
{
    public function generarPdf(Request $request)
    {
        $procesador = Procesador::find($request->input('procesador_id'));
        $disipador = Disipador::find($request->input('disipador_id'));
        $placaBase = PlacaBase::find($request->input('placabase_id'));
        $memoriaRam = MemoriaRam::find($request->input('memoria_ram_id'));
        $discoDuro = DiscoDuro::find($request->input('discoduro_id'));
        $discoDuroSecundario = DiscoDuro::find($request->input('discodurosecundario_id'));
        $tarjetaGrafica = TarjetaGrafica::find($request->input('tarjeta_grafica_id'));
        $fuenteAlimentacion = FuenteAlimentacion::find($request->input('fuente_alimentacion_id'));
        $torre = Torre::find($request->input('torre_id'));
        $resumen = $request->input('resumen');
        $nombre = $request->input('nombre');
        $precioTotal = $request->input('precio_total');
        $consumoTotal = $request->input('consumo_total');
        $numeroMemorias = $request->input('numero_memorias');

        return Inertia::render('montaje/pdf/descargarPdf', [
            'procesador' => $procesador,
            'disipador' => $disipador,
            'placaBase' => $placaBase,
            'memoriaRam' => $memoriaRam,
            'discoDuro' => $discoDuro,
            'discoDuroSecundario' => $discoDuroSecundario,
            'tarjetaGrafica' => $tarjetaGrafica,
            'fuenteAlimentacion' => $fuenteAlimentacion,
            'torre' => $torre,
            'resumen' => $resumen,
            'nombre' => $nombre,
            'precioTotal' => $precioTotal,
            'consumoTotal' => $consumoTotal,
            'numeroMemorias' => $numeroMemorias,
        ]);
    }

    public function compartir(Request $request)
    {
        $datosMontaje = $request->input('datos');

        $hash = Str::random(30);

        $link = LinkCompartido::create([
            'hash' => $hash,
            'datos_montaje' => $datosMontaje,
        ]);

        $url = route('montaje.compartido', ['hash' => $hash]);

        return redirect()->route('montaje.resumen')->with('link', $url);
    }

    public function verMontajeCompartido($hash)
    {
        $link = LinkCompartido::where('hash', $hash)->firstOrFail();

        return Inertia::render('links/guardarDatosLink', [
            'datosMontaje' => $link->datos_montaje,
        ]);
    }

    public function solicitarAsistencia()
    {
        $usuario = Auth::user();

        $usuario->notify(new EmailAsistencia());

        return back()->with('success', '¡Solicitud de asistencia enviada con éxito!');
    }

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
        $request->validate([
            'nombre' => 'required|string|max:255',
            'datos' => 'required|array',
        ]);

        $montaje = new Montaje();
        $montaje->user_id = Auth::id(); // Comprobar que el usuario esta autenticado
        $montaje->nombre = $request->input('nombre');
        $montaje->datos = json_encode($request->input('datos'));
        $montaje->save();
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $usuario = Auth::user();
        $montajes = $usuario->montajes()->latest()->get();

        return Inertia::render('montaje/listaMontajes', [
            'montajes' => $montajes,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        // return Inertia::render('montaje/editarMontaje');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:montajes,id',
            'nombre' => 'required|string|max:255',
            'datos' => 'required|array',
        ]);

        $montaje = Montaje::where('id', $request->input('id'))
            ->where('user_id', Auth::id()) // Comprobar que sea del usuario actual
            ->firstOrFail();

        $montaje->nombre = $request->input('nombre');
        $montaje->datos = json_encode($request->input('datos'));
        $montaje->save();

        return redirect()->route('usuario.montajes')->with('success', 'Montaje actualizado.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $montaje = Montaje::findOrFail($request->id);
        $montaje->delete();

        return redirect()->route('usuario.montajes')->with('success', 'Montaje eliminado correctamente.');
    }
}
