import Header from '@/components/header-principal';
import { Button } from '@/components/ui/button';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import { Head, Link } from '@inertiajs/react';

export default function ResumenMontaje() {
    const {
        procesadorGuardado,
        placaBaseGuardada,
        memoriaRamGuardada,
        discoDuroGuardado,
        tarjetaGraficaGuardada,
        fuenteAlimentacionGuardada,
        torreGuardada,
    } = useProgresoMontaje((state) => state);

    const precioTotal =
    Number(procesadorGuardado!.precio) +
    Number(placaBaseGuardada!.precio) +
    Number(memoriaRamGuardada!.precio) +
    Number(discoDuroGuardado!.precio) +
    Number(tarjetaGraficaGuardada!.precio) +
    Number(fuenteAlimentacionGuardada!.precio) +
    Number(torreGuardada!.precio);


    const consumoTotal =
        procesadorGuardado!.consumo +
        placaBaseGuardada!.consumo +
        memoriaRamGuardada!.consumo +
        discoDuroGuardado!.consumo +
        tarjetaGraficaGuardada!.consumo;

    const Componente = ({ nombre, componente, color }: { nombre: string; componente: any; color: string }) => {
        if (!componente) return null;

        return (
            <div className={`rounded-md border-l-4 bg-[#1f1f1f] p-4 border-[var(--${color})] shadow-[0_0_5px_var(--${color})]`}>
                <h3 className={`text-[var(--${color})] mb-1 text-xl font-semibold`}>{nombre}</h3>
                <p className="text-sm text-white">{componente.nombre}</p>
                <p className="text-xs text-gray-400">{componente.marca}</p>
            </div>
        );
    };

    return (
        <>
            <Head title="Resumen del Montaje" />
            <Header />
            {/* <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border-4 border-[var(--azul-neon)] rounded-xl p-8 shadow-[0_0_20px_var(--azul-neon)] font-['Orbitron'] text-white space-y-6 max-w-4xl mx-auto">
            <Header />
             <h2 className="text-4xl text-[var(--rosa-neon)] drop-shadow-[0_0_10px_var(--rosa-neon)] animate-[glitch_1s_infinite]">
                 Resumen del Montaje
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base">

                 <Componente nombre="Procesador" componente={procesadorGuardado} color="verde-neon" />
                 <Componente nombre="Placa Base" componente={placaBaseGuardada} color="azul-neon" />
                 <Componente nombre="Memoria RAM" componente={memoriaRamGuardada} color="violeta-neon" />
                 <Componente nombre="Disco Duro" componente={discoDuroGuardado} color="rojo-neon" />
                 <Componente nombre="Tarjeta Gráfica" componente={tarjetaGraficaGuardada} color="amarillo-neon" />
                 <Componente nombre="Fuente" componente={fuenteAlimentacionGuardada} color="naranja-neon" />
             </div>

             <hr className="border-[var(--azul-neon)] opacity-40" />

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-6">
                 <div className="p-4 rounded-lg border border-[var(--verde-neon)] shadow-[0_0_10px_var(--verde-neon)]">
                     <h3 className="text-[var(--verde-neon)] text-lg font-bold">Consumo Total</h3>
                     <p className="text-white text-xl">1000W</p>
                 </div>

                 <div className="p-4 rounded-lg border border-[var(--rosa-neon)] shadow-[0_0_10px_var(--rosa-neon)]">
                     <h3 className="text-[var(--rosa-neon)] text-lg font-bold">Precio Total</h3>
                     <p className="text-white text-xl">1300€</p>
                 </div>
             </div>
         </div> */}

            <div className="mt-5 animate-[pulseNeon_2s_infinite] rounded-xl border-2 border-[var(--azul-neon)] bg-black p-6 shadow-lg">
                <h2 className="mb-6 animate-[glitch_1s_infinite] text-center font-['Orbitron'] text-6xl font-bold text-[var(--rosa-neon)] drop-shadow-[0_0_10px_var(--rosa-neon)]">
                    RESUMEN DEL MONTAJE
                </h2>

                <div className="grid grid-cols-1 gap-6 font-['Exo_2'] text-white md:grid-cols-2">
                    {procesadorGuardado && (
                        <div className="rounded border border-[var(--azul-neon)] bg-gradient-to-br from-black via-[var(--azul-neon)]/10 to-black p-4">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--azul-neon)]">Procesador</h3>
                            <p>{procesadorGuardado.nombre}</p>
                            <p>Consumo: {procesadorGuardado.consumo}W</p>
                        </div>
                    )}
                    {placaBaseGuardada && (
                        <div className="rounded border border-[var(--verde-neon)] bg-gradient-to-br from-black via-[var(--verde-neon)]/10 to-black p-4">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--verde-neon)]">Placa Base</h3>
                            <p>{placaBaseGuardada.nombre}</p>
                            <p>Consumo: {placaBaseGuardada.consumo}W</p>
                        </div>
                    )}
                    {memoriaRamGuardada && (
                        <div className="rounded border border-[var(--violeta-neon)] bg-gradient-to-br from-black via-[var(--violeta-neon)]/10 to-black p-4">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--violeta-neon)]">Memoria RAM</h3>
                            <p>{memoriaRamGuardada.nombre}</p>
                            <p>Consumo: {memoriaRamGuardada.consumo}W</p>
                        </div>
                    )}
                    {discoDuroGuardado && (
                        <div className="rounded border border-[var(--amarillo-neon)] bg-gradient-to-br from-black via-[var(--amarillo-neon)]/10 to-black p-4">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--amarillo-neon)]">Disco Duro</h3>
                            <p>{discoDuroGuardado.nombre}</p>
                            <p>Consumo: {discoDuroGuardado.consumo}W</p>
                        </div>
                    )}
                    {tarjetaGraficaGuardada && (
                        <div className="rounded border border-[var(--rojo-neon)] bg-gradient-to-br from-black via-[var(--rojo-neon)]/10 to-black p-4">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--rojo-neon)]">Tarjeta Gráfica</h3>
                            <p>{tarjetaGraficaGuardada.nombre}</p>
                            <p>Consumo: {tarjetaGraficaGuardada.consumo}W</p>
                        </div>
                    )}
                    {fuenteAlimentacionGuardada && (
                        <div className="rounded border border-[var(--cian-neon)] bg-gradient-to-br from-black via-[var(--cian-neon)]/10 to-black p-4">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--cian-neon)]">Fuente de Alimentación</h3>
                            <p>{fuenteAlimentacionGuardada.nombre}</p>
                            <p>Potencia: {fuenteAlimentacionGuardada.potencia}W</p>
                        </div>
                    )}
                    {torreGuardada && (
                        <div className="rounded border border-[var(--naranja-neon)] bg-gradient-to-br from-black via-[var(--naranja-neon)]/10 to-black p-4">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--naranja-neon)]">Torre</h3>
                            <p>{torreGuardada.nombre}</p>
                        </div>
                    )}
                </div>
                <div className="m-5 flex items-center justify-center gap-6">
                    <div className="w-[25%] rounded border border-[var(--verde-neon)] bg-gradient-to-br from-black via-[var(--verde-neon)]/10 to-black p-4">
                        <h3 className="animate-[flicker_3s_infinite] justify-end align-middle text-xl font-bold text-white">
                            {`PRECIO TOTAL: ${precioTotal}€`}
                        </h3>
                    </div>
                    <div className="w-[25%] rounded border border-[var(--morado-neon)] bg-gradient-to-br from-black via-[var(--morado-neon)]/10 to-black p-4">
                        <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-white">
                            {`CONSUMO DEL PC: ${consumoTotal}W`}
                        </h3>
                    </div>
                </div>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
                    <button
                        className="rounded-lg border border-[var(--verde-neon)] bg-black px-6 py-3 font-['Orbitron'] font-bold text-[var(--verde-neon)] transition-colors duration-1000 hover:bg-[var(--verde-neon)] hover:text-black"
                        // onClick={handleGuardarMontaje}
                    >
                        Guardar montaje en mi perfil
                    </button>

                    <button
                        className="rounded-lg border border-[var(--azul-neon)] bg-black px-6 py-3 font-['Orbitron'] font-bold text-[var(--azul-neon)] transition-colors duration-1000 hover:bg-[var(--azul-neon)] hover:text-black"
                        // onClick={handleCompartirMontaje}
                    >
                        Compartir montaje
                    </button>

                    <button
                        className="rounded-lg border border-[var(--rosa-neon)] bg-black px-6 py-3 font-['Orbitron'] font-bold text-[var(--rosa-neon)] duration-1000 hover:bg-[var(--rosa-neon)] hover:text-black"
                        // onClick={handleExportarPDF}
                    >
                        Exportar a PDF
                    </button>

                    <Button
                        className="rounded-lg border border-[var(--rojo-neon)] bg-black px-6 py-3 font-['Orbitron'] font-bold text-[var(--rojo-neon)] transition-colors duration-1000 hover:bg-[var(--rojo-neon)] hover:text-black"
                        // onClick={handleExportarPDF}
                        asChild
                    >
                        <Link href={route('home')}>Salir</Link>
                    </Button>
                </div>
            </div>
        </>
    );
}
