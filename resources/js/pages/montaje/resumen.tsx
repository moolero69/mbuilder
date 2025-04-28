import Header from '@/components/header-principal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type MontajeForm = {
    nombre: string;
    datos: any;
};

export default function ResumenMontaje() {
    const [dialogoNombreAbierto, setDialogoNombreAbierto] = useState(false);
    const [montajeGuardado, setMontajeGuardado] = useState(false);

    const {
        procesadorGuardado,
        placaBaseGuardada,
        memoriaRamGuardada,
        memoriaRamSecundariaGuardada,
        discoDuroGuardado,
        tarjetaGraficaGuardada,
        fuenteAlimentacionGuardada,
        torreGuardada,
    } = useProgresoMontaje((state) => state);

    const { data, setData, post } = useForm<MontajeForm>({
        nombre: '',
        datos: {},
    });

    useEffect(() => {
        setData({
            nombre: data.nombre,
            datos: {
                procesador: procesadorGuardado || null,
                placa_base: placaBaseGuardada || null,
                memoria_ram: memoriaRamGuardada || null,
                memoria_ram_secundaria: memoriaRamSecundariaGuardada || null,
                disco_duro: discoDuroGuardado || null,
                tarjeta_grafica: tarjetaGraficaGuardada || null,
                fuente_alimentacion: fuenteAlimentacionGuardada || null,
                torre: torreGuardada || null,
                otros: otros,
            },
        });
    }, []);

    const precioTotal =
        Number(procesadorGuardado?.precio ?? 0) +
        Number(placaBaseGuardada?.precio ?? 0) +
        Number(memoriaRamGuardada?.precio ?? 0) +
        Number(memoriaRamSecundariaGuardada?.precio ?? 0) +
        Number(discoDuroGuardado?.precio ?? 0) +
        Number(tarjetaGraficaGuardada?.precio ?? 0) +
        Number(fuenteAlimentacionGuardada?.precio ?? 0) +
        Number(torreGuardada?.precio ?? 0);

    const consumoTotal =
        (procesadorGuardado?.consumo ?? 0) +
        (placaBaseGuardada?.consumo ?? 0) +
        (memoriaRamGuardada?.consumo ?? 0) +
        (memoriaRamSecundariaGuardada?.consumo ?? 0) +
        (discoDuroGuardado?.consumo ?? 0) +
        (tarjetaGraficaGuardada?.consumo ?? 0);

    const otros = {
        precio: precioTotal,
        consumo: consumoTotal,
        nombre: data.nombre,
    };

    const construirJsonMontaje = () => {
        post(route('montaje.guardar'), {
            onSuccess: () => {
                toast.custom(
                    (t) => (
                        <div className="ml-20 flex w-[350px] items-center gap-3 rounded-xl bg-white/90 p-4 text-black shadow-lg">
                            <span>
                                <Check size={30} className="text-[var(--rojo-neon)]" />
                            </span>
                            <div className="flex w-full justify-center text-center text-xl">
                                <p className="font-['exo_2']">Montaje guardado</p>
                            </div>
                        </div>
                    ),
                    { duration: 3500 },
                );
                setMontajeGuardado(true);
            },
            onError: (error: any) => {
                toast.error('Error al guardar el montaje');
                console.error(error);
            },
        });
    };

    return (
        <>
            <Head title="Resumen del Montaje" />
            <Header />
            {dialogoNombreAbierto && <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-xs"></div>}
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
                    {memoriaRamSecundariaGuardada && (
                        <div className="rounded border border-[var(--violeta-neon)] bg-gradient-to-br from-black via-[var(--violeta-neon)]/10 to-black p-4">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--violeta-neon)]">Memoria RAM secundaria</h3>
                            <p>{memoriaRamSecundariaGuardada.nombre}</p>
                            <p>Consumo: {memoriaRamSecundariaGuardada.consumo}W</p>
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
                <div className="m-5 flex flex-col items-center justify-center gap-6 md:flex-row">
                    <div className="w-full max-w-sm rounded-xl border border-[var(--verde-neon)] bg-black p-6 shadow-[0_0_20px_var(--verde-neon)] transition hover:scale-[1.03] hover:shadow-[0_0_35px_var(--verde-neon)]">
                        <h3 className="text-center font-['Orbitron'] text-2xl font-extrabold text-[var(--verde-neon)] drop-shadow-[0_0_6px_var(--verde-neon)]">
                            PRECIO TOTAL
                        </h3>
                        <p className="mt-2 text-center text-xl tracking-wide text-white">{precioTotal.toFixed(2)}€</p>
                    </div>

                    <div className="w-full max-w-sm rounded-xl border border-[var(--morado-neon)] bg-black p-6 shadow-[0_0_20px_var(--morado-neon)] transition hover:scale-[1.03] hover:shadow-[0_0_35px_var(--morado-neon)]">
                        <h3 className="text-center font-['Orbitron'] text-2xl font-extrabold text-[var(--morado-neon)] drop-shadow-[0_0_6px_var(--morado-neon)]">
                            CONSUMO DEL PC
                        </h3>
                        <p className="mt-2 text-center text-xl tracking-wide text-white">{consumoTotal}W</p>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
                    <Button
                        variant={'outline'}
                        className="hover: h-13 cursor-pointer rounded-lg border border-[var(--verde-neon)] bg-black px-6 py-3 font-['Orbitron'] font-bold text-[var(--verde-neon)] transition-colors duration-1000 hover:bg-[var(--verde-neon)] hover:text-black"
                        onClick={() => setDialogoNombreAbierto(true)}
                        disabled={montajeGuardado}
                    >
                        Guardar montaje en mi perfil
                    </Button>

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
                        variant={'outline'}
                        className="rounded-lg border border-[var(--rojo-neon)] bg-black px-6 py-3 font-['Orbitron'] font-bold text-[var(--rojo-neon)] transition-colors duration-1000 hover:bg-[var(--rojo-neon)] hover:text-black"
                        asChild
                    >
                        <Link href={route('home')}>Salir</Link>
                    </Button>
                </div>
            </div>

            <Dialog open={dialogoNombreAbierto} onOpenChange={setDialogoNombreAbierto}>
                <DialogContent className="border-[var(--verde-neon)] bg-[#0d0d0d] text-white shadow-[0_0_15px_var(--verde-neon)] sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Guardar montaje</DialogTitle>
                        <DialogDescription>Dale un nombre a tu montaje antes de guardarlo.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nombre" className="text-right">
                                Nombre
                            </Label>
                            <Input
                                id="nombre"
                                onChange={(e) => setData('nombre', e.target.value)}
                                className="col-span-3"
                                value={data.nombre ?? ''}
                                placeholder='"La bestia"'
                                maxLength={12}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={() => {
                                construirJsonMontaje();
                                setDialogoNombreAbierto(false);
                            }}
                            disabled={data.nombre.length === 0}
                        >
                            Guardar montaje
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
