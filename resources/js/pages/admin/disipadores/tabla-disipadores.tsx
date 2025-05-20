import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
} from "@/components/ui/context-menu";

export default function TablaDisipadores({ disipadores }: { disipadores: any }) {
    const { props }: any = usePage();
    let exito = props.flash?.success;
    const { delete: eliminar } = useForm();

    useEffect(() => {
        exito && toast.success(exito);
        exito = null;
    }, [exito]);

    const cambiarFilasPorPagina = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get(route('admin.disipadores'), {
            mostrar_filas: e.target.value
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const [dialogoEliminar, setDialogoEliminar] = useState<boolean>(false);
    const [nombreEliminar, setNombreEliminar] = useState<string>('');
    const [idEliminar, setIdEliminar] = useState<number>();

    return (
        <AdminLayout titulo='Disipadores'>
            <Head title='Admin - disipadores' />
            <section className='flex flex-col justify-center h-[100%]'>
                <div className="flex justify-between items-center mb-4">
                    <Button asChild>
                        <Link href={route('admin.disipadores.crear')}>Añadir disipador</Link>
                    </Button>

                    <div className="flex items-center gap-2 mr-2">
                        <label htmlFor="mostrar_filas" className="text-sm">Filas por página:</label>
                        <select
                            id="mostrar_filas"
                            defaultValue={new URLSearchParams(window.location.search).get('mostrar_filas') || '15'}
                            onChange={cambiarFilasPorPagina}
                            className="rounded border px-2 py-1 bg-background text-foreground"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-600">
                    <Table>
                        <TableHeader>
                            <TableRow className='bg-[var(--rosa-neon)]/30 hover:bg-[var(--morado-neon)]/30'>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Socket</TableHead>
                                <TableHead>Refrigeración líquida</TableHead>
                                <TableHead>Consumo</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {disipadores.data.map((disipador: any) => (
                                <ContextMenu key={disipador.id}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow
                                            className="cursor-pointer odd:bg-gray-500/30 hover:bg-white/60 hover:text-black"
                                            onClick={() => window.location.href = route('admin.disipadores.editar', disipador.id)}
                                        >
                                            <TableCell>{disipador.nombre}</TableCell>
                                            <TableCell>{disipador.marca}</TableCell>
                                            <TableCell>{disipador.socket}</TableCell>
                                            <TableCell>{disipador.refrigeracion_liquida}</TableCell>
                                            <TableCell>{disipador.consumo} W</TableCell>
                                            <TableCell>{disipador.precio} €</TableCell>
                                        </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => {
                                                setDialogoEliminar(true);
                                                setNombreEliminar(disipador.nombre);
                                                setIdEliminar(disipador.id);
                                            }}
                                        >
                                            Eliminar
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <PaginacionComponentes links={disipadores.links} />
            </section>

            {/* Modal personalizado */}
            {dialogoEliminar && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    aria-modal="true"
                    role="dialog"
                    aria-labelledby="modal-titulo"
                    aria-describedby="modal-descripcion"
                >
                    <div className="bg-[#0d0d0d] rounded-md border border-[var(--rojo-neon)] p-6 max-w-md w-full text-white shadow-[0_0_15px_var(--rojo-neon)]">
                        <header className="mb-4">
                            <h2
                                id="modal-titulo"
                                className="text-[var(--rojo-neon)] drop-shadow-[0_0_8px_var(--rojo-neon)] text-xl font-semibold"
                            >
                                ¿Eliminar componente?
                            </h2>
                        </header>
                        <section id="modal-descripcion" className="text-gray-400 mb-6">
                            <p>¿Estás seguro de que quieres eliminar <span className="text-white font-bold">{nombreEliminar}</span>?</p>
                            <p>Esta acción no se puede deshacer.</p>
                        </section>
                        <footer className="flex justify-end gap-2">
                            <Button
                                variant="ghost"
                                onClick={() => setDialogoEliminar(false)}
                                className="border border-gray-600 text-white hover:cursor-pointer hover:bg-gray-800"
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={() => {
                                    setDialogoEliminar(false);
                                    eliminar(route('admin.disipadores.eliminar', idEliminar));
                                }}
                                className="bg-[var(--rojo-neon)] text-black hover:cursor-pointer hover:bg-red-600"
                            >
                                Eliminar
                            </Button>
                        </footer>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
