import Header from '@/components/header-principal';
import TooltipIncopatibilidadMonatje from '@/components/TooltipIncopatibilidad';
import TooltipTipoMontaje from '@/components/TooltipTipoMontaje';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import AppLayout from '@/layouts/app-layout';
import { ComponentesMontaje, Montaje } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type MontajeForm = {
    id: number;
};

export default function listaMontajes({ montajes }: { montajes: Montaje[] }) {
    const { props }: any = usePage();
    const exito = props.flash?.success;
    const link = props.flash?.link;

    useEffect(() => {
        link && setDialogoLinkAbierto(true);
    }, [link]);

    const [componenteSeleccionado, setComponenteSeleccionado] = useState<ComponentesMontaje>();
    const [dialogoEliminar, setDialogoEliminar] = useState(false);
    const [nombreMontaje, setNombreMontaje] = useState('');

    const {
        guardarProcesador,
        guardarPlacaBase,
        guardarMemoriaRam,
        guardarMemoriaRamSecundaria,
        guardarDiscoDuro,
        guardarDiscoDuroSecundario,
        guardarTarjetaGrafica,
        guardarFuenteAlimentacion,
        guardarTorre,
        guardarEditarMontaje,
        guardarMontajeAnterior,
        guardarDisipador,
        guardarTipoMontaje,
    } = useProgresoMontaje((state) => state);

    function editarMontaje() {
        const procesador = componenteSeleccionado!.procesador;
        const disipador = componenteSeleccionado!.disipador;
        const placaBase = componenteSeleccionado!.placa_base;
        const memoriaRam = componenteSeleccionado!.memoria_ram;
        const memoriaRamSecundaria = componenteSeleccionado!.memoria_ram_secundaria;
        const discoDuro = componenteSeleccionado!.disco_duro;
        const discoDuroSecundario = componenteSeleccionado!.disco_duro_secundario;
        const tarjetaGrafica = componenteSeleccionado!.tarjeta_grafica;
        const fuenteAlimentacion = componenteSeleccionado!.fuente_alimentacion;
        const torre = componenteSeleccionado!.torre;
        const tipo_montaje = componenteSeleccionado!.otros!.tipo_montaje;

        guardarProcesador!(procesador);
        guardarDisipador!(disipador);
        guardarPlacaBase!(placaBase);
        guardarMemoriaRam!(memoriaRam);
        guardarMemoriaRamSecundaria!(memoriaRamSecundaria);
        guardarDiscoDuro!(discoDuro);
        guardarDiscoDuroSecundario!(discoDuroSecundario);
        guardarTarjetaGrafica!(tarjetaGrafica);
        guardarFuenteAlimentacion!(fuenteAlimentacion);
        guardarTorre!(torre);
        guardarEditarMontaje!(true);
        guardarTipoMontaje!(tipo_montaje);
    }

    useEffect(() => {
        componenteSeleccionado && editarMontaje();
    }, [componenteSeleccionado]);

    useEffect(() => {
        exito &&
            toast.custom(
                (t) => (
                    <div className="ml-20 flex w-[350px] items-center gap-3 rounded-xl bg-white/90 p-4 text-black shadow-lg">
                        <span>
                            <Check size={30} className="text-[var(--rojo-neon)]" />
                        </span>
                        <div className="flex w-full justify-center text-center text-xl">
                            <p className="font-['exo_2']">{exito}</p>
                        </div>
                    </div>
                ),
                { duration: 3500 },
            );
    }, [exito]);

    const { data, setData, delete: eliminar } = useForm<MontajeForm>();

    const eliminarMontaje = () => {
        eliminar(route('montaje.eliminar'));
    };

    const [dialogoNombreAbierto, setDialogoNombreAbierto] = useState(false);
    const [dialogoLinkAbierto, setDialogoLinkAbierto] = useState(false);
    const [linkCopiado, setLinkCopiado] = useState(false);

    return (
        <>
            <AppLayout>
                <Head title="Mis Montajes" />
                <Header />
                {dialogoEliminar && <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"></div>}
                <div className="relative min-h-[calc(100dvh-120px)] w-full text-white">
                    {/* Vídeo de fondo */}
                    <video autoPlay muted loop playsInline className="absolute inset-0 z-0 h-full w-full object-cover opacity-30">
                        <source src="/vid/video-principal.mp4" type="video/mp4" />
                    </video>

                    {/* Contenido principal */}
                    <section className="relative z-20 px-6 py-12 font-['Exo_2']">
                        <h1 className="mb-10 text-center font-['Orbitron'] text-5xl font-bold text-[var(--azul-neon)] drop-shadow-[0_0_10px_var(--azul-neon)]">
                            Mis Montajes
                        </h1>

                        {montajes.length == 0 ? (
                            <>
                                <div className="flex h-[512px] w-full flex-col items-center justify-center gap-15">
                                    <h1 className="text-center font-['Orbitron'] text-5xl font-bold text-[var(--naranja-neon)] drop-shadow-[0_0_10px_var(--naranja-neon)]">
                                        No tienes montajes guardados
                                    </h1>
                                    <Button className="text-3xl underline duration-300 hover:text-[var(--fucsia-neon)]" variant="link" asChild>
                                        <Link href={route('montaje.tipo')}>Comienza tu primer montaje</Link>
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {montajes.map((montaje) => {
                                    const datos = JSON.parse(montaje.datos);

                                    const componenteFaltante =
                                        !datos.procesador ||
                                        !datos.disipador ||
                                        !datos.placa_base ||
                                        !datos.memoria_ram ||
                                        !datos.disco_duro ||
                                        !datos.tarjeta_grafica ||
                                        !datos.fuente_alimentacion ||
                                        !datos.torre;

                                    const idComponentes = {
                                        procesador_id: datos.procesador?.id ?? null,
                                        disipador_id: datos.disipador?.id ?? null,
                                        placabase_id: datos.placa_base?.id ?? null,
                                        memoria_ram_id: datos.memoria_ram?.id ?? null,
                                        discoduro_id: datos.disco_duro?.id ?? null,
                                        discodurosecundario_id: datos.disco_duro_secundario?.id ?? null,
                                        tarjeta_grafica_id: datos.tarjeta_grafica?.id ?? null,
                                        fuente_alimentacion_id: datos.fuente_alimentacion?.id ?? null,
                                        torre_id: datos.torre?.id ?? null,
                                        nombre: montaje.nombre,
                                        precio_total: datos.otros?.precio,
                                        consumo_total: datos.otros?.consumo,
                                        numero_memorias: datos.memoria_ram?.cantidad,
                                    };

                                    return (
                                        <div
                                            key={montaje.id}
                                            className="colores-borde-glow flex h-full flex-col rounded-xl bg-gradient-to-l from-[#1a1a1a] via-[#121212] to-[#0a0a0a] p-5 transition-all duration-300"
                                        >
                                            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between">
                                                <div className="flex items-center justify-center gap-3">
                                                    <h2 className="mb-3 font-['Orbitron'] text-2xl font-bold text-[var(--naranja-neon)] drop-shadow-[0_0_5px_var(--naranja-neon)]">
                                                        {montaje.nombre}
                                                    </h2>
                                                    {datos.otros?.tipo_montaje === 'eco' && <TooltipTipoMontaje tipo="eco" />}
                                                    {datos.otros?.tipo_montaje === 'equilibrado' && <TooltipTipoMontaje tipo="equilibrado" />}
                                                    {datos.otros?.tipo_montaje === 'pro' && <TooltipTipoMontaje tipo="pro" />}
                                                </div>
                                                {componenteFaltante && (
                                                    <TooltipIncopatibilidadMonatje mensaje="Posible incopatibilidad entre componentes" />
                                                )}
                                            </div>

                                            <p className="mb-4 text-sm text-gray-400">
                                                Creado el {new Date(montaje.created_at).toLocaleDateString()}
                                            </p>

                                            <div className="flex flex-row items-center justify-between">
                                                <ul className="mb-4 min-w-[300px] space-y-1 text-sm">
                                                    <li>
                                                        <strong className="text-[var(--azul-neon)]">Procesador:</strong>{' '}
                                                        {datos.procesador?.nombre || <span className="text-red-500">Sin procesador</span>}
                                                    </li>
                                                    <li>
                                                        <strong className="text-[var(--azul-neon)]">Disipador:</strong>{' '}
                                                        {datos.disipador?.nombre ? (
                                                            datos.disipador.nombre
                                                        ) : datos.procesador?.disipador_incluido === 'Si' ? (
                                                            <span className="text-yellow-400">Incluido con el procesador</span>
                                                        ) : (
                                                            <span className="text-red-500">Sin disipador</span>
                                                        )}
                                                    </li>

                                                    <li>
                                                        <strong className="text-[var(--azul-neon)]">Placa Base:</strong>{' '}
                                                        {datos.placa_base?.nombre || <span className="text-red-500">Sin placa base</span>}
                                                    </li>
                                                    <li>
                                                        <strong className="text-[var(--azul-neon)]">Memoria/s RAM:</strong>{' '}
                                                        {datos.memoria_ram?.cantidad && `x${datos.memoria_ram?.cantidad} `}
                                                        {datos.memoria_ram?.nombre || <span className="text-red-500">Sin memoria RAM principal</span>}
                                                    </li>
                                                    {datos.memoria_ram_secundaria && (
                                                        <li>
                                                            <strong className="text-[var(--azul-neon)]">Memoria RAM secundaria:</strong>{' '}
                                                            {datos.memoria_ram_secundaria?.nombre || (
                                                                <span className="text-red-500">Sin memoria RAM secundaria</span>
                                                            )}
                                                        </li>
                                                    )}
                                                    <li>
                                                        <strong className="text-[var(--azul-neon)]">Disco Duro Principal:</strong>{' '}
                                                        {datos.disco_duro?.nombre || <span className="text-red-500">Sin disco duro principal</span>}
                                                    </li>
                                                    {datos.disco_duro_secundario && (
                                                        <li>
                                                            <strong className="text-[var(--azul-neon)]">Disco Duro Secundario:</strong>{' '}
                                                            {datos.disco_duro_secundario?.nombre || (
                                                                <span className="text-red-500">Sin disco duro secundario</span>
                                                            )}
                                                        </li>
                                                    )}
                                                    <li>
                                                        <strong className="text-[var(--azul-neon)]">Gráfica:</strong>{' '}
                                                        {datos.tarjeta_grafica?.nombre || <span className="text-red-500">Sin gráfica</span>}
                                                    </li>
                                                    <li>
                                                        <strong className="text-[var(--azul-neon)]">Fuente:</strong>{' '}
                                                        {datos.fuente_alimentacion?.nombre || <span className="text-red-500">Sin fuente</span>}
                                                    </li>
                                                    <li>
                                                        <strong className="text-[var(--azul-neon)]">Torre:</strong>{' '}
                                                        {datos.torre?.nombre || <span className="text-red-500">Sin torre</span>}
                                                    </li>
                                                    <li>
                                                        <strong className="text-xl text-[var(--verde-neon)]">
                                                            Precio: {datos.otros?.precio.toFixed(2) || '???'}€
                                                        </strong>{' '}
                                                    </li>
                                                    <li>
                                                        <strong className="text-xl text-[var(--rosa-neon)]">
                                                            Consumo: {datos.otros?.consumo || '???'}W
                                                        </strong>{' '}
                                                    </li>
                                                </ul>
                                                <img
                                                    src={datos.torre?.link_imagen}
                                                    alt=""
                                                    className="mb-8 ml-4 h-[250px] w-[500px] overflow-hidden"
                                                    draggable="false"
                                                />
                                            </div>

                                            <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:justify-between">
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
                                                    className="w-full border-[var(--verde-neon)] font-['Orbitron'] text-[var(--verde-neon)] shadow-[0_0_8px_var(--verde-neon)] transition-all duration-500 hover:cursor-pointer hover:bg-[var(--verde-neon)] hover:text-black hover:shadow-[0_0_16px_var(--verde-neon)] sm:w-auto"
                                                    asChild
                                                >
                                                    <Link href={route('montaje.generarPdf')} data={idComponentes} method="post">
                                                        Exportar PDF
                                                    </Link>
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    className="w-full border-[var(--amarillo-neon)] font-['Orbitron'] text-[var(--amarillo-neon)] shadow-[0_0_8px_var(--amarillo-neon)] transition-all duration-500 hover:cursor-pointer hover:bg-[var(--amarillo-neon)] hover:text-black hover:shadow-[0_0_16px_var(--amarillo-neon)] sm:w-auto"
                                                    onClick={() => link && setDialogoLinkAbierto(true)}
                                                    asChild
                                                >
                                                    <Link href={route('montaje.ver.link', montaje.id)} method="post">
                                                        Compartir
                                                    </Link>
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    className="w-auto border-[var(--rojo-neon)] font-['Orbitron'] text-[var(--rojo-neon)] shadow-[0_0_8px_var(--rojo-neon)] transition-all duration-500 hover:cursor-pointer hover:bg-[var(--rojo-neon)] hover:text-black hover:shadow-[0_0_16px_var(--rojo-neon)]"
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
                    <DialogContent className="max-w-xl border-[var(--rojo-neon)] bg-[#0d0d0d] text-white shadow-[0_0_15px_var(--rojo-neon)]">
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
                                className="border border-gray-600 text-white hover:cursor-pointer hover:bg-gray-800"
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={() => {
                                    eliminarMontaje();
                                    setDialogoEliminar(false);
                                }}
                                className="bg-[var(--rojo-neon)] text-black hover:cursor-pointer hover:bg-red-600"
                            >
                                Eliminar
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
                            <div className="flex w-full justify-between">
                                {link && <QRCodeCanvas value={link} size={150} />}
                                <Button
                                    variant="secondary"
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
            </AppLayout>
        </>
    );
}
