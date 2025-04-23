import Header from '@/components/header-principal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import { ComponentesMontaje, Montaje } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type MontajeForm = {
    id: number;
};

export default function listaMontajes({ montajes }: { montajes: Montaje[] }) {
    const [componenteSeleccionado, setComponenteSeleccionado] = useState<ComponentesMontaje>();
    const [dialogoEliminar, setDialogoEliminar] = useState(false);
    const [nombreMontaje, setNombreMontaje] = useState('');

    const {
        guardarProcesador,
        guardarPlacaBase,
        guardarMemoriaRam,
        guardarDiscoDuro,
        guardarTarjetaGrafica,
        guardarFuenteAlimentacion,
        guardarTorre,
        guardarEditarMontaje,
        guardarMontajeAnterior,
    } = useProgresoMontaje((state) => state);

    function editarMontaje() {
        const procesador = componenteSeleccionado!.procesador;
        const placaBase = componenteSeleccionado!.placa_base;
        const memoriaRam = componenteSeleccionado!.memoria_ram;
        const discoDuro = componenteSeleccionado!.disco_duro;
        const tarjetaGrafica = componenteSeleccionado!.tarjeta_grafica;
        const fuenteAlimentacion = componenteSeleccionado!.fuente_alimentacion;
        const torre = componenteSeleccionado!.torre;

        guardarProcesador!(procesador);
        guardarPlacaBase!(placaBase);
        guardarMemoriaRam!(memoriaRam);
        guardarDiscoDuro!(discoDuro);
        guardarTarjetaGrafica!(tarjetaGrafica);
        guardarFuenteAlimentacion!(fuenteAlimentacion);
        guardarTorre!(torre);
        guardarEditarMontaje!(true);
    }

    useEffect(() => {
        componenteSeleccionado && editarMontaje();
    }, [componenteSeleccionado]);

    const { data, setData, delete: d } = useForm<MontajeForm>();

    const eliminarMontaje = () => {
        d(route('montaje.eliminar'), {
            onSuccess: () => {
                console.log('Eliminado.');
            },
            onError: (error: any) => {
                console.error(error);
            },
        });
    };

    return (
        <>
            <Head title="Mis Montajes" />
            <Header />
            {dialogoEliminar && <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"></div>}
            <div className="relative min-h-[calc(100dvh-120px)] w-full text-white">
                {/* Vídeo de fondo */}
                <video autoPlay muted loop playsInline className="absolute inset-0 z-0 h-full w-full object-cover opacity-15">
                    <source src="/vid/video-principal.mp4" type="video/mp4" />
                </video>

                {/* Contenido principal */}
                <section className="relative z-20 px-6 py-12 font-['Exo_2']">
                    <h1 className="mb-10 text-center font-['Orbitron'] text-5xl font-bold text-[var(--azul-neon)] drop-shadow-[0_0_10px_var(--azul-neon)]">
                        Mis Montajes
                    </h1>

                    {montajes.length == 0 ? (
                        <>
                            <div className="flex h-[512px] w-full items-center justify-center">
                                <h1 className="text-center font-['Orbitron'] text-5xl font-bold text-[var(--naranja-neon)] drop-shadow-[0_0_10px_var(--naranja-neon)]">
                                    No tienes montajes guardados
                                </h1>
                            </div>
                        </>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {montajes.map((montaje) => {
                                const datos = JSON.parse(montaje.datos);

                                return (
                                    <div
                                        key={montaje.id}
                                        className="colores-borde-glow rounded-xl bg-gradient-to-b from-black to-[#0d0d0d] p-5 transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        <h2 className="mb-3 font-['Orbitron'] text-2xl font-bold text-[var(--naranja-neon)] drop-shadow-[0_0_5px_var(--naranja-neon)]">
                                            {montaje.nombre}
                                        </h2>
                                        <p className="mb-4 text-sm text-gray-400">Creado el: {new Date(montaje.created_at).toLocaleDateString()}</p>

                                        <ul className="space-y-1 text-sm">
                                            <li>
                                                <strong className="text-[var(--azul-neon)]">Procesador:</strong> {datos.procesador?.nombre}
                                            </li>
                                            <li>
                                                <strong className="text-[var(--azul-neon)]">Placa Base:</strong> {datos.placa_base?.nombre}
                                            </li>
                                            <li>
                                                <strong className="text-[var(--azul-neon)]">Memoria RAM:</strong> {datos.memoria_ram?.nombre}
                                            </li>
                                            <li>
                                                <strong className="text-[var(--azul-neon)]">Disco Duro:</strong> {datos.disco_duro?.nombre}
                                            </li>
                                            <li>
                                                <strong className="text-[var(--azul-neon)]">Gráfica:</strong> {datos.tarjeta_grafica?.nombre}
                                            </li>
                                            <li>
                                                <strong className="text-[var(--azul-neon)]">Fuente:</strong> {datos.fuente_alimentacion?.nombre}
                                            </li>
                                            <li>
                                                <strong className="text-[var(--azul-neon)]">Torre:</strong> {datos.torre?.nombre}
                                            </li>
                                            <li>
                                                <strong className="text-xl text-[var(--verde-neon)]">Precio: {datos.otros?.precio || '???'}€</strong>
                                            </li>
                                        </ul>
                                        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between">
                                            <Button
                                                variant="outline"
                                                className="w-full border-[var(--azul-neon)] font-['Orbitron'] text-[var(--azul-neon)] shadow-[0_0_8px_var(--azul-neon)] transition-all duration-500 hover:bg-[var(--azul-neon)] hover:text-black hover:shadow-[0_0_16px_var(--azul-neon)] sm:w-auto"
                                                onClick={() => {
                                                    setComponenteSeleccionado(datos);
                                                    guardarMontajeAnterior!(datos);
                                                    sessionStorage.setItem('nombreMontajeEditar', montaje.nombre);
                                                    sessionStorage.setItem('idMontajeEditar', String(montaje.id));
                                                }}
                                                asChild
                                            >
                                                <Link href={route('montaje.procesador')}>Editar</Link>
                                            </Button>

                                            <Button
                                                variant="outline"
                                                className="w-auto border-[var(--rojo-neon)] font-['Orbitron'] text-[var(--rojo-neon)] shadow-[0_0_8px_var(--rojo-neon)] transition-all duration-500 hover:bg-[var(--rojo-neon)] hover:text-black hover:shadow-[0_0_16px_var(--rojo-neon)] hover:cursor-pointer"
                                                onClick={() => {
                                                    setDialogoEliminar(true);
                                                    setNombreMontaje(montaje.nombre);
                                                    setData({
                                                        id: Number(montaje.id),
                                                    });
                                                }}
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
            <Dialog open={dialogoEliminar} onOpenChange={setDialogoEliminar}>
                <DialogContent className="border-[var(--rojo-neon)] bg-[#0d0d0d] text-white shadow-[0_0_15px_var(--rojo-neon)]">
                    <DialogHeader>
                        <DialogTitle className="text-[var(--rojo-neon)] drop-shadow-[0_0_8px_var(--rojo-neon)]">¿Eliminar montaje?</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            ¿Estás seguro de que quieres eliminar <span className="font-bold text-white">{nombreMontaje}</span>? Esta acción no se
                            puede deshacer.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={() => setDialogoEliminar(false)}
                            className="border border-gray-600 text-white hover:bg-gray-800 hover:cursor-pointer"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => {
                                eliminarMontaje();
                                setDialogoEliminar(false);
                            }}
                            className="bg-[var(--rojo-neon)] text-black hover:bg-red-600 hover:cursor-pointer"
                        >
                            Eliminar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
