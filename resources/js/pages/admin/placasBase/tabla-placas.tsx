import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function TablaPlacasBase({ placasBase }: { placasBase: any }) {
    const { props }: any = usePage();
    let exito = props.flash?.success;
    const { delete: eliminar } = useForm();

    useEffect(() => {
        exito && toast.success(exito);
        exito = null;
    }, [exito]);

    const cambiarFilasPorPagina = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get(
            route('admin.placasBase'),
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
        <AdminLayout titulo="Placas Base">
            <Head title="Admin - placas base" />
            <section className="flex h-[100%] flex-col justify-center">
                <div className="mb-4 flex items-center justify-between">
                    <Button asChild>
                        <Link href={route('admin.placasBase.crear')}>Añadir placa base</Link>
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
                                <TableHead>Socket</TableHead>
                                <TableHead>Factor forma</TableHead>
                                <TableHead>Zócalos RAM</TableHead>
                                <TableHead>Puertos M.2</TableHead>
                                <TableHead>Puertos SATA</TableHead>
                                <TableHead>Puertos PCIe</TableHead>
                                <TableHead>Consumo</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {placasBase.data.map((placa: any) => (
                                <ContextMenu key={placa.id}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow
                                            className="cursor-pointer odd:bg-gray-500/30 hover:bg-white/60 hover:text-black"
                                            onClick={() => router.visit(route('admin.placasBase.editar', placa.id))}
                                        >
                                            <TableCell>{placa.nombre}</TableCell>
                                            <TableCell>{placa.marca}</TableCell>
                                            <TableCell>{placa.socket}</TableCell>
                                            <TableCell>{placa.factor_forma}</TableCell>
                                            <TableCell>{placa.zocalos_ram}</TableCell>
                                            <TableCell>{placa.puertos_m2}</TableCell>
                                            <TableCell>{placa.puertos_sata}</TableCell>
                                            <TableCell>{placa.puertos_pcie}</TableCell>
                                            <TableCell>{placa.consumo} W</TableCell>
                                            <TableCell>{placa.precio} €</TableCell>
                                        </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => {
                                                setDialogoEliminar(true);
                                                setNombreEliminar(placa.nombre);
                                                setIdEliminar(placa.id);
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

                <PaginacionComponentes links={placasBase.links} />
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
                            <p>
                                ¿Estás seguro de que quieres eliminar{' '}
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
                                    eliminar(route('admin.placasBase.eliminar', idEliminar));
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
