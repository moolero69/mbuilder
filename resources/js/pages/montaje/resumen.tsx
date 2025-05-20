import { hayComponentes } from '@/components/funciones/funciones';
import Header from '@/components/header-principal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';
import { Separator } from '@radix-ui/react-separator';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { QRCodeCanvas } from 'qrcode.react';

type MontajeForm = {
    nombre: string;
    datos: any;
};

export default function ResumenMontaje() {
    const sinComponentes = hayComponentes();
    if (sinComponentes) {
        window.location.href = '/';
    }

    const { props }: any = usePage();
    const link = props.flash?.link;
    const qr = props.flash?.qr;

    console.log(qr)


    const [dialogoNombreAbierto, setDialogoNombreAbierto] = useState(false);
    const [dialogoLinkAbierto, setDialogoLinkAbierto] = useState(false);
    const [linkCopiado, setLinkCopiado] = useState(false);

    const [montajeGuardado, setMontajeGuardado] = useState(false);
    const [montajeCompartido, setMontajeCompartido] = useState(false);

    const {
        procesadorGuardado,
        placaBaseGuardada,
        memoriaRamGuardada,
        memoriaRamSecundariaGuardada,
        discoDuroGuardado,
        discoDuroSecundarioGuardado,
        tarjetaGraficaGuardada,
        fuenteAlimentacionGuardada,
        torreGuardada,
        disipadorGuardado,
        tipoMontaje,
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
                disipador: disipadorGuardado || null,
                placa_base: placaBaseGuardada || null,
                memoria_ram: memoriaRamGuardada || null,
                memoria_ram_secundaria: memoriaRamSecundariaGuardada || null,
                disco_duro: discoDuroGuardado || null,
                disco_duro_secundario: discoDuroSecundarioGuardado || null,
                tarjeta_grafica: tarjetaGraficaGuardada || null,
                fuente_alimentacion: fuenteAlimentacionGuardada || null,
                torre: torreGuardada || null,
                otros: otros,
            },
        });
    }, []);

    const precioTotal =
        Number(procesadorGuardado?.precio ?? 0) +
        Number(disipadorGuardado?.precio ?? 0) +
        Number(placaBaseGuardada?.precio ?? 0) +
        Number(memoriaRamGuardada?.precio ?? 0) +
        Number(memoriaRamSecundariaGuardada?.precio ?? 0) +
        Number(discoDuroGuardado?.precio ?? 0) +
        Number(discoDuroSecundarioGuardado?.precio ?? 0) +
        Number(tarjetaGraficaGuardada?.precio ?? 0) +
        Number(fuenteAlimentacionGuardada?.precio ?? 0) +
        Number(torreGuardada?.precio ?? 0);

    const consumoTotal =
        (procesadorGuardado?.consumo ?? 0) +
        (disipadorGuardado?.consumo ?? 0) +
        (placaBaseGuardada?.consumo ?? 0) +
        (memoriaRamGuardada?.consumo ?? 0) +
        (memoriaRamSecundariaGuardada?.consumo ?? 0) +
        (discoDuroGuardado?.consumo ?? 0) +
        (discoDuroSecundarioGuardado?.consumo ?? 0) +
        (tarjetaGraficaGuardada?.consumo ?? 0);

    const otros = {
        precio: precioTotal,
        consumo: consumoTotal,
        nombre: data.nombre,
        tipo_montaje: tipoMontaje,
        numero_memorias: memoriaRamGuardada!.cantidad,
    };

    const idComponentes = {
        procesador_id: procesadorGuardado?.id ?? null,
        disipador_id: disipadorGuardado?.id ?? null,
        placabase_id: placaBaseGuardada?.id ?? null,
        memoria_ram_id: memoriaRamGuardada?.id ?? null,
        discoduro_id: discoDuroGuardado?.id ?? null,
        discodurosecundario_id: discoDuroSecundarioGuardado?.id ?? null,
        tarjeta_grafica_id: tarjetaGraficaGuardada?.id ?? null,
        fuente_alimentacion_id: fuenteAlimentacionGuardada?.id ?? null,
        torre_id: torreGuardada?.id ?? null,
        resumen: 'Si',
        precio_total: precioTotal,
        consumo_total: consumoTotal,
    };

    const componentesSeleccionados = {
        procesador: procesadorGuardado! ?? null,
        disipador: disipadorGuardado! ?? null,
        placabase: placaBaseGuardada! ?? null,
        memoria_ram: memoriaRamGuardada! ?? null,
        discoduro: discoDuroGuardado! ?? null,
        discodurosecundario: discoDuroSecundarioGuardado! ?? null,
        tarjeta_grafica: tarjetaGraficaGuardada! ?? null,
        fuente_alimentacion: fuenteAlimentacionGuardada! ?? null,
        torre: torreGuardada! ?? null,
        otros: otros,
    };

    const construirJsonMontaje = () => {
        post(route('montaje.guardar'), {
            preserveScroll: true,
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
                        <div className="rounded border border-[var(--azul-neon)] bg-gradient-to-br from-black via-[var(--azul-neon)]/10 to-black p-4 text-center">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--azul-neon)]">Procesador</h3>
                            <p className="text-lg font-semibold">{procesadorGuardado.nombre}</p>
                            <div className="flex w-full flex-wrap justify-center gap-4">
                                <div>
                                    <p className="underline">Frecuencia Base</p>
                                    <p>{procesadorGuardado.frecuencia_base} GHz</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--azul-neon)]" />
                                <div>
                                    <p className="underline">Turbo</p>
                                    <p>{procesadorGuardado.frecuencia_turbo} GHz</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--azul-neon)]" />
                                <div>
                                    <p className="underline">Núcleos</p>
                                    <p>{procesadorGuardado.nucleos}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--azul-neon)]" />
                                <div>
                                    <p className="underline">Consumo</p>
                                    <p>{procesadorGuardado.consumo}W</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {disipadorGuardado && (
                        <div className="rounded border border-[var(--menta-neon)] bg-gradient-to-br from-black via-[var(--menta-neon)]/10 to-black p-4 text-center">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--menta-neon)]">Disipador</h3>
                            <p className="text-lg font-semibold">{disipadorGuardado.nombre}</p>
                            <div className="flex w-full flex-wrap justify-center gap-4">
                                <div>
                                    <p className="underline">Marca</p>
                                    <p>{disipadorGuardado.marca}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--menta-neon)]" />
                                <div>
                                    <p className="underline">Liquida</p>
                                    <p>{disipadorGuardado.refrigeracion_liquida}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--menta-neon)]" />
                                <div>
                                    <p className="underline">Consumo</p>
                                    <p>{disipadorGuardado.consumo}W</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {placaBaseGuardada && (
                        <div className="rounded border border-[var(--verde-neon)] bg-gradient-to-br from-black via-[var(--verde-neon)]/10 to-black p-4 text-center">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--verde-neon)]">Placa Base</h3>
                            <p className="text-lg font-semibold">{placaBaseGuardada.nombre}</p>
                            <div className="flex w-full flex-wrap justify-center gap-4">
                                <div>
                                    <p className="underline">Socket</p>
                                    <p>{placaBaseGuardada.socket}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--verde-neon)]" />
                                <div>
                                    <p className="underline">Formato</p>
                                    <p>{placaBaseGuardada.factor_forma}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--verde-neon)]" />
                                <div>
                                    <p className="underline">Puertos SATA</p>
                                    <p>{placaBaseGuardada.puertos_sata}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--verde-neon)]" />
                                <div>
                                    <p className="underline">Consumo</p>
                                    <p>{placaBaseGuardada.consumo}W</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {memoriaRamGuardada && (
                        <div className="rounded border border-[var(--violeta-neon)] bg-gradient-to-br from-black via-[var(--violeta-neon)]/10 to-black p-4 text-center">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--violeta-neon)]">Memoria RAM</h3>
                            <p className="text-lg font-semibold">
                                {memoriaRamGuardada.cantidad && `x${memoriaRamGuardada?.cantidad} `}
                                {memoriaRamGuardada.nombre}
                            </p>
                            <div className="flex w-full flex-wrap justify-center gap-4">
                                <div>
                                    <p className="underline">Capacidad</p>
                                    <p>{memoriaRamGuardada.almacenamiento} GB</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--violeta-neon)]" />
                                <div>
                                    <p className="underline">Frecuencia</p>
                                    <p>{memoriaRamGuardada.frecuencia} MHz</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--violeta-neon)]" />
                                <div>
                                    <p className="underline">Tipo</p>
                                    <p>{memoriaRamGuardada.tipo}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--violeta-neon)]" />
                                <div>
                                    <p className="underline">Consumo</p>
                                    <p>{memoriaRamGuardada.consumo}W</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {memoriaRamSecundariaGuardada && (
                        <div className="rounded border border-[var(--violeta-neon)] bg-gradient-to-br from-black via-[var(--violeta-neon)]/10 to-black p-4 text-center">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--violeta-neon)]">Memoria RAM</h3>
                            <p className="text-lg font-semibold">{memoriaRamSecundariaGuardada.nombre}</p>
                            <div className="flex w-full flex-wrap justify-center gap-4">
                                <div>
                                    <p className="underline">Capacidad</p>
                                    <p>{memoriaRamSecundariaGuardada.almacenamiento} GB</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--violeta-neon)]" />
                                <div>
                                    <p className="underline">Frecuencia</p>
                                    <p>{memoriaRamSecundariaGuardada.frecuencia} MHz</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--violeta-neon)]" />
                                <div>
                                    <p className="underline">Tipo</p>
                                    <p>{memoriaRamSecundariaGuardada.tipo}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--violeta-neon)]" />
                                <div>
                                    <p className="underline">Consumo</p>
                                    <p>{memoriaRamSecundariaGuardada.consumo}W</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {discoDuroGuardado && (
                        <div className="rounded border border-[var(--amarillo-neon)] bg-gradient-to-br from-black via-[var(--amarillo-neon)]/10 to-black p-4 text-center">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--amarillo-neon)]">Disco Duro</h3>
                            <p className="text-lg font-semibold">{discoDuroGuardado.nombre}</p>
                            <div className="flex w-full flex-wrap justify-center gap-4">
                                <div>
                                    <p className="underline">Tecnología</p>
                                    <p>{discoDuroGuardado.tecnologia}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--amarillo-neon)]" />
                                <div>
                                    <p className="underline">Almacenamiento</p>
                                    <p>{discoDuroGuardado.almacenamiento}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--amarillo-neon)]" />
                                <div>
                                    <p className="underline">Velocidad</p>
                                    <p>{discoDuroGuardado.velocidad} RPM</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--amarillo-neon)]" />
                                <div>
                                    <p className="underline">Consumo</p>
                                    <p>{discoDuroGuardado.consumo}W</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {discoDuroSecundarioGuardado && (
                        <div className="rounded border border-[var(--amarillo-neon)] bg-gradient-to-br from-black via-[var(--amarillo-neon)]/10 to-black p-4 text-center">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--amarillo-neon)]">Disco Duro</h3>
                            <p className="text-lg font-semibold">{discoDuroSecundarioGuardado.nombre}</p>
                            <div className="flex w-full flex-wrap justify-center gap-4">
                                <div>
                                    <p className="underline">Tecnología</p>
                                    <p>{discoDuroSecundarioGuardado.tecnologia}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--amarillo-neon)]" />
                                <div>
                                    <p className="underline">Almacenamiento</p>
                                    <p>{discoDuroSecundarioGuardado.almacenamiento}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--amarillo-neon)]" />
                                <div>
                                    <p className="underline">Velocidad</p>
                                    <p>{discoDuroSecundarioGuardado.velocidad} RPM</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--amarillo-neon)]" />
                                <div>
                                    <p className="underline">Consumo</p>
                                    <p>{discoDuroSecundarioGuardado.consumo}W</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {tarjetaGraficaGuardada && (
                        <div className="rounded border border-[var(--rojo-neon)] bg-gradient-to-br from-black via-[var(--rojo-neon)]/10 to-black p-4 text-center">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--rojo-neon)]">Tarjeta Gráfica</h3>
                            <p className="text-lg font-semibold">{tarjetaGraficaGuardada.nombre}</p>
                            <div className="flex w-full flex-wrap justify-center gap-4">
                                <div>
                                    <p className="underline">Tipo Memoria</p>
                                    <p>{tarjetaGraficaGuardada.tipo_memoria}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--rojo-neon)]" />
                                <div>
                                    <p className="underline">Memoria</p>
                                    <p>{tarjetaGraficaGuardada.memoria} GB</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--rojo-neon)]" />
                                <div>
                                    <p className="underline">Longitud</p>
                                    <p>{tarjetaGraficaGuardada.longitud} mm</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--rojo-neon)]" />
                                <div>
                                    <p className="underline">Consumo</p>
                                    <p>{tarjetaGraficaGuardada.consumo}W</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {fuenteAlimentacionGuardada && (
                        <div className="rounded border border-[var(--rosa-neon)] bg-gradient-to-br from-black via-[var(--rosa-neon)]/10 to-black p-4 text-center">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--rosa-neon)]">Fuente de Alimentación</h3>
                            <p className="text-lg font-semibold">{fuenteAlimentacionGuardada.nombre}</p>
                            <div className="flex w-full flex-wrap justify-center gap-4">
                                <div>
                                    <p className="underline">Potencia</p>
                                    <p>{fuenteAlimentacionGuardada.potencia}W</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--rosa-neon)]" />
                                <div>
                                    <p className="underline">Modular</p>
                                    <p>{fuenteAlimentacionGuardada.modular}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--rosa-neon)]" />
                                <div>
                                    <p className="underline">Certificación</p>
                                    <p>{fuenteAlimentacionGuardada.certificacion}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {torreGuardada && (
                        <div className="rounded border border-[var(--naranja-neon)] bg-gradient-to-br from-black via-[var(--naranja-neon)]/10 to-black p-4 text-center">
                            <h3 className="animate-[flicker_3s_infinite] text-xl font-bold text-[var(--naranja-neon)]">Torre</h3>
                            <p className="text-lg font-semibold">{torreGuardada.nombre}</p>
                            <div className="flex w-full flex-wrap justify-center gap-4">
                                <div>
                                    <p className="underline">Formato</p>
                                    <p>{torreGuardada.factor_forma}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--naranja-neon)]" />
                                <div>
                                    <p className="underline">Soporte RGB</p>
                                    <p>{torreGuardada.soporte_RGB}</p>
                                </div>
                                <Separator orientation="vertical" className="my-2 w-1 rounded-4xl bg-[var(--naranja-neon)]" />
                                <div>
                                    <p className="underline">Longitud GPU</p>
                                    <p>{torreGuardada.longitud_maxima_gpu} mm</p>
                                </div>
                            </div>
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
                        className="rounded-lg border border-[var(--verde-neon)] bg-black px-6 py-3 font-['Orbitron'] font-bold text-[var(--verde-neon)] transition-colors duration-1000 hover:cursor-pointer hover:bg-[var(--verde-neon)] hover:text-black"
                        onClick={() => setDialogoNombreAbierto(true)}
                        disabled={montajeGuardado}
                    >
                        Guardar montaje en mi perfil
                    </Button>

                    {!montajeCompartido ?
                        <Button
                            className="rounded-lg border border-[var(--naranja-neon)] bg-black px-6 py-3 font-['Orbitron'] font-bold text-[var(--naranja-neon)] transition-colors duration-1000 hover:cursor-pointer hover:bg-[var(--naranja-neon)] hover:text-black"
                            asChild
                            onClick={() => {
                                setMontajeCompartido(true);
                                setDialogoLinkAbierto(true);
                            }}
                        >
                            <Link
                                href={route('montaje.compartir')}
                                data={{ datos: JSON.stringify(componentesSeleccionados) }}
                                method="post"
                                preserveScroll
                            >
                                Compartir Montaje
                            </Link>
                        </Button>
                        :
                        <Button
                            className="rounded-lg border border-[var(--naranja-neon)] bg-black px-6 py-3 font-['Orbitron'] font-bold text-[var(--naranja-neon)] transition-colors duration-1000 hover:cursor-pointer hover:bg-[var(--naranja-neon)] hover:text-black"
                            onClick={() => {
                                setDialogoLinkAbierto(true);
                            }}
                        >
                            Compartir Montaje
                        </Button>

                    }

                    <Button
                        className="rounded-lg border border-[var(--azul-neon)] bg-black px-6 py-3 font-['Orbitron'] font-bold text-[var(--azul-neon)] transition-colors duration-1000 hover:cursor-pointer hover:bg-[var(--azul-neon)] hover:text-black"
                        asChild
                    >
                        <Link href={route('montaje.generarPdf')} data={idComponentes} method="post" preserveScroll>
                            Exportar PDF
                        </Link>
                    </Button>

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
            <Dialog open={dialogoLinkAbierto} onOpenChange={setDialogoLinkAbierto}>
                <DialogContent className="border-[var(--verde-neon)] bg-[#0d0d0d] text-white shadow-[0_0_15px_var(--verde-neon)] sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Montaje compartido</DialogTitle>
                        <DialogDescription>Este es el enlace para compartir tu montaje.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 items-center gap-4">
                            <Input
                                id="enlace-compartido"
                                readOnly
                                value={link}
                                className="w-full"
                                onClick={(e) => (e.target as HTMLInputElement).select()}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <div className='flex w-full justify-between'>
                            {link && <QRCodeCanvas value={link} size={150} />}

                            <Button
                            variant='secondary'
                                onClick={() => {
                                    const input = document.getElementById('enlace-compartido') as HTMLInputElement;

                                    if (navigator.clipboard && navigator.clipboard.writeText) {
                                        navigator.clipboard
                                            .writeText(link)
                                            .then(() => {
                                                setLinkCopiado(true);
                                                setTimeout(() => setLinkCopiado(false), 2000);
                                            })
                                            .catch(() => {
                                                // fallback en caso de error
                                                input.select();
                                                document.execCommand('copy');
                                                setLinkCopiado(true);
                                                setTimeout(() => setLinkCopiado(false), 2000);
                                            });
                                    } else {
                                        input.select();
                                        document.execCommand('copy');
                                        setLinkCopiado(true);
                                        setTimeout(() => setLinkCopiado(false), 2000);
                                    }
                                }}
                            >
                                {linkCopiado ? '¡Copiado!' : 'Copiar link'}
                            </Button>

                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
