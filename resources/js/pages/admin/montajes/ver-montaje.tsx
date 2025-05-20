import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Head, router } from '@inertiajs/react';
import { Box, CircuitBoard, Cpu, MemoryStick, PcCase, Power, Wind } from 'lucide-react';

export default function VerMontaje({ montaje }: { montaje: any }) {
    const datos = JSON.parse(montaje.datos); // Asumiendo que el JSON está en `montaje.datos`
    const nombre = montaje.nombre ?? `Montaje ${datos.otros?.tipo_montaje?.toUpperCase()}`;

    return (
        <AdminLayout titulo={`Montaje: ${nombre}`}>
            <Head title={`Montaje - ${nombre}`} />

            <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {/* Procesador */}
                <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/5 p-6 text-center shadow transition hover:bg-white/10">
                    <Cpu className="mb-3 h-10 w-10 text-[var(--rosa-neon)]" />
                    <h3 className="text-lg font-semibold">Procesador</h3>
                    <p className="mt-2 text-sm text-white/80">{datos.procesador?.nombre || 'No seleccionado'}</p>
                </div>

                {/* Disipador */}
                <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/5 p-6 text-center shadow transition hover:bg-white/10">
                    <Wind className="mb-3 h-10 w-10 text-[var(--rosa-neon)]" />
                    <h3 className="text-lg font-semibold">Disipador</h3>
                    <p className="mt-2 text-sm text-white/80">{datos.disipador?.nombre || 'No seleccionado'}</p>
                </div>

                {/* Placa Base */}
                <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/5 p-6 text-center shadow transition hover:bg-white/10">
                    <CircuitBoard className="mb-3 h-10 w-10 text-[var(--rosa-neon)]" />
                    <h3 className="text-lg font-semibold">Placa Base</h3>
                    <p className="mt-2 text-sm text-white/80">{datos.placa_base?.nombre || 'No seleccionado'}</p>
                </div>

                {/* Memoria RAM */}
                <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/5 p-6 text-center shadow transition hover:bg-white/10">
                    <MemoryStick className="mb-3 h-10 w-10 text-[var(--rosa-neon)]" />
                    <h3 className="text-lg font-semibold">Memoria RAM</h3>
                    <p className="mt-2 text-sm text-white/80">{datos.memoria_ram?.nombre || 'No seleccionado'}</p>
                </div>

                {/* Disco Duro */}
                <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/5 p-6 text-center shadow transition hover:bg-white/10">
                    <Box className="mb-3 h-10 w-10 text-[var(--rosa-neon)]" />
                    <h3 className="text-lg font-semibold">Disco Duro</h3>
                    <p className="mt-2 text-sm text-white/80">{datos.disco_duro?.nombre || 'No seleccionado'}</p>
                </div>

                {/* Disco Duro Secundario*/}
                <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/5 p-6 text-center shadow transition hover:bg-white/10">
                    <Box className="mb-3 h-10 w-10 text-[var(--rosa-neon)]" />
                    <h3 className="text-lg font-semibold">Disco Duro Secundario</h3>
                    <p className="mt-2 text-sm text-white/80">{datos.disco_duro_secundario?.nombre || 'No seleccionado'}</p>
                </div>

                {/* Tarjeta Gráfica */}
                <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/5 p-6 text-center shadow transition hover:bg-white/10">
                    <MemoryStick className="mb-3 h-10 w-10 text-[var(--rosa-neon)]" />
                    <h3 className="text-lg font-semibold">Tarjeta Gráfica</h3>
                    <p className="mt-2 text-sm text-white/80">{datos.tarjeta_grafica?.nombre || 'No seleccionado'}</p>
                </div>

                {/* Fuente de Alimentación */}
                <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/5 p-6 text-center shadow transition hover:bg-white/10">
                    <Power className="mb-3 h-10 w-10 text-[var(--rosa-neon)]" />
                    <h3 className="text-lg font-semibold">Fuente de Alimentación</h3>
                    <p className="mt-2 text-sm text-white/80">{datos.fuente_alimentacion?.nombre || 'No seleccionado'}</p>
                </div>

                {/* Torre */}
                <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/5 p-6 text-center shadow transition hover:bg-white/10">
                    {datos.torre?.link_imagen ? (
                        <img src={datos.torre.link_imagen} alt={datos.torre.nombre} className="mb-3 h-16 w-16 rounded object-contain" />
                    ) : (
                        <PcCase className="mb-3 h-10 w-10 text-[var(--rosa-neon)]" />
                    )}
                    <h3 className="text-lg font-semibold">Torre</h3>
                    <p className="mt-2 text-sm text-white/80">{datos.torre?.nombre || 'No seleccionado'}</p>
                </div>
            </section>
            <div className='mt-4 flex justify-center intems-center w-full'>
                <Button onClick={(e) => router.visit(route('admin.montajes'))}>Volver</Button>
            </div>
        </AdminLayout>
    );
}
