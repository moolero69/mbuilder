import Header from '@/components/header-principal';
import { Button } from '@/components/ui/button';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

type MontajeForm = {
    id?: number;
    nombre: string;
    datos: any;
};

export default function editarMontajes() {
    const nombreMontajeAnterior: any = sessionStorage.getItem('nombreMontajeEditar');
    const nombreMontajeNuevo: any = sessionStorage.getItem('nuevoNombreEditar');
    const idMontaje = sessionStorage.getItem('idMontajeEditar');

    const {
        montajeAnterior,
        procesadorGuardado,
        disipadorGuardado,
        placaBaseGuardada,
        memoriaRamGuardada,
        memoriaRamSecundariaGuardada,
        discoDuroGuardado,
        discoDuroSecundarioGuardado,
        tarjetaGraficaGuardada,
        fuenteAlimentacionGuardada,
        torreGuardada,
        tipoMontaje
    } = useProgresoMontaje((state) => state);

    const nuevoPrecio =
        (Number(procesadorGuardado?.precio) || 0) +
        (Number(disipadorGuardado?.precio) || 0) +
        (Number(placaBaseGuardada?.precio) || 0) +
        (Number(memoriaRamGuardada?.precio) || 0) +
        (Number(memoriaRamSecundariaGuardada?.precio) || 0) +
        (Number(discoDuroGuardado?.precio) || 0) +
        (Number(discoDuroSecundarioGuardado?.precio) || 0) +
        (Number(tarjetaGraficaGuardada?.precio) || 0) +
        (Number(fuenteAlimentacionGuardada?.precio) || 0) +
        (Number(torreGuardada?.precio) || 0);

    const nuevoConsumo =
        (procesadorGuardado?.consumo ?? 0) +
        (disipadorGuardado?.consumo ?? 0) +
        (placaBaseGuardada?.consumo ?? 0) +
        (memoriaRamGuardada?.consumo ?? 0) +
        (memoriaRamSecundariaGuardada?.consumo ?? 0) +
        (discoDuroGuardado?.consumo ?? 0) +
        (discoDuroSecundarioGuardado?.consumo ?? 0) +
        (tarjetaGraficaGuardada?.consumo ?? 0);

    const { data, setData, post } = useForm<MontajeForm>({
        id: undefined,
        nombre: '',
        datos: {},
    });

    const editarMontaje = () => {
        post(route('montaje.editar'), {
            onError: (error: any) => {
                console.error(error);
            },
        });
    };

    useEffect(() => {
        setData({
            id: Number(idMontaje),
            nombre: nombreMontajeNuevo,
            datos: {
                procesador: procesadorGuardado || null,
                disipador: discoDuroGuardado || null,
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

    const otros = {
        precio: nuevoPrecio,
        consumo: nuevoConsumo,
        nombre: nombreMontajeNuevo,
        tipo_montaje: tipoMontaje
    };

    return (
        <>
            <Head title="Editar Montaje" />
            <Header />
            <section className="relative z-20 px-6 py-12 font-['Exo_2']">
                <h1 className="mb-10 animate-[glitch_1s_infinite] text-center font-['Orbitron'] text-6xl font-bold text-[var(--rosa-neon)] drop-shadow-[0_0_10px_var(--rosa-neon)]">
                    EDITAR MONTAJE
                </h1>

                <div className="flex items-center justify-center gap-8">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <h1 className="mb-2 text-center font-['Orbitron'] text-5xl font-bold text-[var(--azul-neon)] drop-shadow-[0_0_10px_var(--azul-neon)]">
                            Anterior
                        </h1>
                        <div className="colores-borde-glow w-[512px] rounded-xl bg-gradient-to-b from-black to-[#0d0d0d] p-5 transition-all duration-300 hover:scale-[1.02]">
                            <h2 className="mb-3 font-['Orbitron'] text-2xl font-bold text-[var(--naranja-neon)] drop-shadow-[0_0_5px_var(--naranja-neon)]">
                                {nombreMontajeAnterior}
                            </h2>

                            <ul className="space-y-1 text-sm">
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Procesador:</strong>{' '}
                                    {montajeAnterior?.procesador ? (
                                        montajeAnterior.procesador.nombre
                                    ) : (
                                        <span className="text-red-500">Sin procesador</span>
                                    )}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Disipador:</strong>{' '}
                                    {montajeAnterior?.disipador ? (
                                        montajeAnterior.disipador.nombre
                                    ) : (
                                        <span className="text-red-500">Sin disipador</span>
                                    )}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Placa Base:</strong>{' '}
                                    {montajeAnterior?.placa_base ? (
                                        montajeAnterior.placa_base.nombre
                                    ) : (
                                        <span className="text-red-500">Sin placa base</span>
                                    )}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Memoria/s RAM:</strong>{' '}
                                    {montajeAnterior?.memoria_ram ? (
                                        <span>
                                            {montajeAnterior.memoria_ram.cantidad ? `x${montajeAnterior.memoria_ram.cantidad} ` : ''}
                                            {montajeAnterior.memoria_ram.nombre}
                                        </span>
                                    ) : (
                                        <span className="text-red-500">Sin memoria RAM Principal</span>
                                    )}
                                </li>
                                {montajeAnterior?.memoria_ram_secundaria && (
                                    <li>
                                        <strong className="text-[var(--azul-neon)]">Memoria RAM Secundaria:</strong>{' '}
                                        {montajeAnterior?.memoria_ram_secundaria ? (
                                            montajeAnterior.memoria_ram_secundaria.nombre
                                        ) : (
                                            <span className="text-red-500">Sin memoria RAM secundaria</span>
                                        )}
                                    </li>
                                )}
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Disco Duro Principal:</strong>{' '}
                                    {montajeAnterior?.disco_duro ? (
                                        montajeAnterior.disco_duro.nombre
                                    ) : (
                                        <span className="text-red-500">Sin disco duro principal</span>
                                    )}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Disco Duro Secundario:</strong>{' '}
                                    {montajeAnterior?.disco_duro_secundario ? (
                                        montajeAnterior.disco_duro_secundario.nombre
                                    ) : (
                                        <span className="text-red-500">Sin disco duro</span>
                                    )}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Gráfica:</strong>{' '}
                                    {montajeAnterior?.tarjeta_grafica ? (
                                        montajeAnterior.tarjeta_grafica.nombre
                                    ) : (
                                        <span className="text-red-500">Sin gráfica</span>
                                    )}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Fuente:</strong>{' '}
                                    {montajeAnterior?.fuente_alimentacion ? (
                                        montajeAnterior.fuente_alimentacion.nombre
                                    ) : (
                                        <span className="text-red-500">Sin fuente</span>
                                    )}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Torre:</strong>{' '}
                                    {montajeAnterior?.torre ? montajeAnterior.torre.nombre : <span className="text-red-500">Sin torre</span>}
                                </li>
                                <li>
                                    <strong className="text-xl text-[var(--verde-neon)]">
                                        Precio:{' '}
                                        {montajeAnterior?.otros?.precio !== undefined ? (
                                            `${montajeAnterior.otros.precio}€`
                                        ) : (
                                            <span className="text-red-500">0€</span>
                                        )}
                                    </strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <ArrowRight size={42} />
                    <div className="flex flex-col items-center justify-center gap-3">
                        <h1 className="mb-2 text-center font-['Orbitron'] text-5xl font-bold text-[var(--azul-neon)] drop-shadow-[0_0_10px_var(--azul-neon)]">
                            Nuevo
                        </h1>
                        <div className="colores-borde-glow w-[512px] rounded-xl bg-gradient-to-b from-black to-[#0d0d0d] p-5 transition-all duration-300 hover:scale-[1.02]">
                            <h2 className="mb-3 font-['Orbitron'] text-2xl font-bold text-[var(--naranja-neon)] drop-shadow-[0_0_5px_var(--naranja-neon)]">
                                {nombreMontajeNuevo}
                            </h2>

                            <ul className="space-y-1 text-sm">
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Procesador:</strong>{' '}
                                    {procesadorGuardado ? procesadorGuardado.nombre : <span className="text-red-500">Sin procesador</span>}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Disipador:</strong>{' '}
                                    {disipadorGuardado ? disipadorGuardado.nombre : <span className="text-red-500">Sin disipador</span>}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Placa Base:</strong>{' '}
                                    {placaBaseGuardada ? placaBaseGuardada.nombre : <span className="text-red-500">Sin placa base</span>}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Memoria/s RAM:</strong>{' '}
                                    {memoriaRamGuardada?.cantidad && `x${memoriaRamGuardada?.cantidad} `}{memoriaRamGuardada ? memoriaRamGuardada.nombre : <span className="text-red-500">Sin memoria RAM</span>}
                                </li>
                                {memoriaRamSecundariaGuardada && (
                                    <li>
                                        <strong className="text-[var(--azul-neon)]">Memoria RAM secundaria:</strong>{' '}
                                        {memoriaRamSecundariaGuardada ? (
                                            memoriaRamSecundariaGuardada.nombre
                                        ) : (
                                            <span className="text-red-500">Sin memoria RAM</span>
                                        )}
                                    </li>
                                )}
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Disco Duro:</strong>{' '}
                                    {discoDuroGuardado ? discoDuroGuardado.nombre : <span className="text-red-500">Sin disco duro</span>}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Disco Duro:</strong>{' '}
                                    {discoDuroSecundarioGuardado ? (
                                        discoDuroSecundarioGuardado.nombre
                                    ) : (
                                        <span className="text-red-500">Sin disco duro</span>
                                    )}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Gráfica:</strong>{' '}
                                    {tarjetaGraficaGuardada ? tarjetaGraficaGuardada.nombre : <span className="text-red-500">Sin gráfica</span>}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Fuente:</strong>{' '}
                                    {fuenteAlimentacionGuardada ? (
                                        fuenteAlimentacionGuardada.nombre
                                    ) : (
                                        <span className="text-red-500">Sin fuente</span>
                                    )}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Torre:</strong>{' '}
                                    {torreGuardada ? torreGuardada.nombre : <span className="text-red-500">Sin torre</span>}
                                </li>
                                <li>
                                    <strong className="text-xl text-[var(--verde-neon)]">
                                        Precio: {nuevoPrecio !== undefined ? `${nuevoPrecio}€` : <span className="text-red-500">0€</span>}
                                    </strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex w-full items-center justify-center">
                    <Button
                        variant={'outline'}
                        className={`fade-in relative rounded-lg border-[var(--azul-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--azul-neon)] shadow-[0_0_10px_var(--azul-neon)] transition-all duration-500 hover:bg-[var(--azul-neon)] hover:text-black hover:shadow-[0_0_20px_var(--azul-neon)]`}
                        asChild
                    >
                        <Link href={route('montaje.torre')}>Volver al montaje</Link>
                    </Button>
                    <Button
                        className="fade-in m-10 rounded-lg border-[var(--naranja-neon)] px-8 py-4 text-center font-['Orbitron'] text-lg font-bold text-[var(--naranja-neon)] shadow-[0_0_10px_var(--naranja-neon)] transition-all duration-500 hover:cursor-pointer hover:bg-[var(--naranja-neon)] hover:text-black hover:shadow-[0_0_20px_var(--naranja-neon)]"
                        variant={'outline'}
                        onClick={() => {
                            editarMontaje();
                            sessionStorage.clear();
                        }}
                    >
                        Confirmar
                    </Button>
                </div>
            </section>
        </>
    );
}
