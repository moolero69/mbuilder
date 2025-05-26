import PaginacionComponentes from '@/components/Paginacion-componentes';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function TablaMontajes({ montajes }: { montajes: any }) {
    const { props }: any = usePage();
    let exito = props.flash?.success;
    const { delete: eliminar } = useForm();

    useEffect(() => {
        exito && toast.success(exito);
        exito = null;
    }, [exito]);

    const cambiarFilasPorPagina = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get(
            route('admin.montajes'),
            {
                mostrar_filas: e.target.value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const [dialogoEliminar, setDialogoEliminar] = useState<boolean>(false);
    const [nombreEliminar, setNombreEliminar] = useState<string>('');
    const [idEliminar, setIdEliminar] = useState<number>();

    return (
        <AdminLayout titulo="Montajes">
            <Head title="Admin - montajes" />
            <section className="flex h-[100%] flex-col justify-center">
                <div className="mb-4 flex items-center justify-between">
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
                                <TableHead>Nombre del montaje</TableHead>
                                <TableHead>Usuario</TableHead>
                                <TableHead>Fecha de creación</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {montajes.data.map((montaje: any) => (
                                <ContextMenu key={montaje.id}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow
                                            className="cursor-pointer odd:bg-gray-500/30 hover:bg-white/60 hover:text-black"
                                            onClick={() =>
                                                router.visit(window.location.href = route('admin.montajes.ver', montaje.id))
                                            }
                                        >
                                            <TableCell>{montaje.nombre}</TableCell>
                                            <TableCell>{montaje.usuario?.name || 'Desconocido'}</TableCell>
                                            <TableCell>{new Date(montaje.created_at).toLocaleDateString('es-ES')}</TableCell>
                                        </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => {
                                                setDialogoEliminar(true);
                                                setNombreEliminar(montaje.nombre);
                                                setIdEliminar(montaje.id);
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

                <PaginacionComponentes links={montajes.links} />
            </section>

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
                                ¿Eliminar montaje?
                            </h2>
                        </header>
                        <section id="modal-descripcion" className="text-gray-400 mb-6">
                            <p>
                                ¿Estás seguro de que quieres eliminar el montaje{' '}
                                <span className="text-white font-bold">{nombreEliminar}</span>?
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
                                    eliminar(route('admin.montajes.eliminar', idEliminar));
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