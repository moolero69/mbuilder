import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function TablaMemoriasRam({ memoriasRam }: { memoriasRam: any }) {
    const { props }: any = usePage();
    let exito = props.flash?.success;
    const { delete: eliminar } = useForm();

    useEffect(() => {
        exito && toast.success(exito);
        exito = null;
    }, [exito]);

    const cambiarFilasPorPagina = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get(
            route('admin.memoriasRam'),
            {
                mostrar_filas: e.target.value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    // Estados para el diálogo de confirmación eliminar
    const [dialogoEliminar, setDialogoEliminar] = useState<boolean>(false);
    const [nombreEliminar, setNombreEliminar] = useState<string>('');
    const [idEliminar, setIdEliminar] = useState<number>();

    return (
        <AdminLayout titulo="Memorias RAM">
            <Head title="Admin - memorias RAM" />
            <section className="flex h-[100%] flex-col justify-center">
                <div className="mb-4 flex items-center justify-between">
                    <Button asChild>
                        <Link href={route('admin.memoriasRam.crear')}>Añadir memoria RAM</Link>
                    </Button>

                    <div className="mr-2 flex items-center gap-2">
                        <label htmlFor="mostrar_filas" className="text-sm">
                            Filas por página:
                        </label>
                        <select
                            id="mostrar_filas"
                            defaultValue={new URLSearchParams(window.location.search).get('mostrar_filas') || '15'}
                            onChange={cambiarFilasPorPagina}
                            className="bg-background text-foreground rounded border px-2 py-1"
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
                            <TableRow className="bg-[var(--rosa-neon)]/30 hover:bg-[var(--morado-neon)]/30">
                                <TableHead>Nombre</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Almacenamiento</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Pack</TableHead>
                                <TableHead>Velocidad</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {memoriasRam.data.map((ram: any) => (
                                <ContextMenu key={ram.id}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow
                                            className="cursor-pointer odd:bg-gray-500/30 hover:bg-white/60 hover:text-black"
                                            onClick={() => router.visit(route('admin.memoriasRam.editar', ram.id))}
                                        >
                                            <TableCell>{ram.nombre}</TableCell>
                                            <TableCell>{ram.marca}</TableCell>
                                            <TableCell>{ram.almacenamiento} GB</TableCell>
                                            <TableCell>{ram.tipo}</TableCell>
                                            <TableCell>{ram.pack}</TableCell>
                                            <TableCell>{ram.velocidad} MHz</TableCell>
                                            <TableCell>{ram.precio} €</TableCell>
                                        </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => {
                                                setDialogoEliminar(true);
                                                setNombreEliminar(ram.nombre);
                                                setIdEliminar(ram.id);
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
                <p className="mt-2 mb-4 text-center font-['Exo_2'] text-sm text-gray-300 italic">Click derecho para eliminar</p>
                <PaginacionComponentes links={memoriasRam.links} />
            </section>

            {/* Modal personalizado para confirmar eliminación */}
            {dialogoEliminar && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    aria-modal="true"
                    role="dialog"
                    aria-labelledby="modal-titulo"
                    aria-describedby="modal-descripcion"
                >
                    <div className="w-full max-w-md rounded-md border border-[var(--rojo-neon)] bg-[#0d0d0d] p-6 text-white shadow-[0_0_15px_var(--rojo-neon)]">
                        <header className="mb-4">
                            <h2 id="modal-titulo" className="text-xl font-semibold text-[var(--rojo-neon)] drop-shadow-[0_0_8px_var(--rojo-neon)]">
                                ¿Eliminar componente?
                            </h2>
                        </header>
                        <section id="modal-descripcion" className="mb-6 text-gray-400">
                            <p>
                                ¿Estás seguro de que quieres eliminar <span className="font-bold text-white">{nombreEliminar}</span>?
                            </p>
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
                                    eliminar(route('admin.memoriasRam.eliminar', idEliminar));
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
