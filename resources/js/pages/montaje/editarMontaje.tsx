import Header from '@/components/header-principal';
import { Button } from '@/components/ui/button';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

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
        placaBaseGuardada,
        memoriaRamGuardada,
        discoDuroGuardado,
        tarjetaGraficaGuardada,
        fuenteAlimentacionGuardada,
        torreGuardada,
    } = useProgresoMontaje((state) => state);

    const nuevoPrecio =
        Number(procesadorGuardado!.precio) +
        Number(placaBaseGuardada!.precio) +
        Number(memoriaRamGuardada!.precio) +
        Number(discoDuroGuardado!.precio) +
        Number(tarjetaGraficaGuardada!.precio) +
        Number(fuenteAlimentacionGuardada!.precio) +
        Number(torreGuardada!.precio);

    const nuevoConsumo =
        procesadorGuardado!.consumo +
        placaBaseGuardada!.consumo +
        memoriaRamGuardada!.consumo +
        discoDuroGuardado!.consumo +
        tarjetaGraficaGuardada!.consumo;


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
                placa_base: placaBaseGuardada || null,
                memoria_ram: memoriaRamGuardada || null,
                disco_duro: discoDuroGuardado || null,
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
                                    <strong className="text-[var(--azul-neon)]">Procesador:</strong> {montajeAnterior?.procesador.nombre}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Placa Base:</strong> {montajeAnterior?.placa_base.nombre}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Memoria RAM:</strong> {montajeAnterior?.memoria_ram.nombre}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Disco Duro:</strong> {montajeAnterior?.disco_duro.nombre}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Gráfica:</strong> {montajeAnterior?.tarjeta_grafica.nombre}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Fuente:</strong> {montajeAnterior?.fuente_alimentacion.nombre}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Torre:</strong> {montajeAnterior?.torre.nombre}
                                </li>
                                <li>
                                    <strong className="text-xl text-[var(--verde-neon)]">Precio: {montajeAnterior?.otros!.precio}€</strong>
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
                                    <strong className="text-[var(--azul-neon)]">Procesador:</strong> {procesadorGuardado?.nombre}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Placa Base:</strong> {placaBaseGuardada?.nombre}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Memoria RAM:</strong> {memoriaRamGuardada?.nombre}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Disco Duro:</strong> {discoDuroGuardado?.nombre}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Gráfica:</strong> {tarjetaGraficaGuardada?.nombre}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Fuente:</strong> {fuenteAlimentacionGuardada?.nombre}
                                </li>
                                <li>
                                    <strong className="text-[var(--azul-neon)]">Torre:</strong> {torreGuardada?.nombre}
                                </li>
                                <li>
                                    <strong className="text-xl text-[var(--verde-neon)]">Precio: {nuevoPrecio}€</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex w-full items-center justify-center">
                    <Button
                        className="m-10 text-center hover:cursor-pointer fade-in rounded-lg border-[var(--naranja-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--naranja-neon)] shadow-[0_0_10px_var(--naranja-neon)] transition-all duration-500 hover:bg-[var(--naranja-neon)] hover:text-black hover:shadow-[0_0_20px_var(--naranja-neon)]"
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
