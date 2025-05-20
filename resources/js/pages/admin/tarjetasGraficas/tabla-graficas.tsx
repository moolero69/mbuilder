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

export default function TablaTarjetasGraficas({ tarjetasGraficas }: { tarjetasGraficas: any }) {
    const { props }: any = usePage();
    let exito = props.flash?.success;
    const { delete: eliminar } = useForm();

    useEffect(() => {
        exito && toast.success(exito);
        exito = null;
    }, [exito]);

    const cambiarFilasPorPagina = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get(route('admin.graficas'), {
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
        <AdminLayout titulo="Tarjetas Gráficas">
            <Head title="Admin - tarjetas gráficas" />
            <section className="flex flex-col justify-center h-[100%]">
                <div className="flex justify-between items-center mb-4">
                    <Button asChild>
                        <Link href={route('admin.graficas.crear')}>Añadir tarjeta gráfica</Link>
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
                            <TableRow className="bg-[var(--rosa-neon)]/30 hover:bg-[var(--morado-neon)]/30">
                                <TableHead>Nombre</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Serie</TableHead>
                                <TableHead>Tipo Memoria</TableHead>
                                <TableHead>Memoria</TableHead>
                                <TableHead>Longitud</TableHead>
                                <TableHead>Passmark</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tarjetasGraficas.data.map((grafica: any) => (
                                <ContextMenu key={grafica.id}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow
                                            className="cursor-pointer odd:bg-gray-500/30 hover:bg-white/60 hover:text-black"
                                            onClick={() =>
                                                (window.location.href = route('admin.graficas.editar', grafica.id))
                                            }
                                        >
                                            <TableCell>{grafica.nombre}</TableCell>
                                            <TableCell>{grafica.marca}</TableCell>
                                            <TableCell>{grafica.tipo}</TableCell>
                                            <TableCell>{grafica.serie}</TableCell>
                                            <TableCell>{grafica.tipo_memoria}</TableCell>
                                            <TableCell>{grafica.memoria} GB</TableCell>
                                            <TableCell>{grafica.longitud} mm</TableCell>
                                            <TableCell>{grafica.passmark}</TableCell>
                                            <TableCell>{grafica.precio} €</TableCell>
                                        </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => {
                                                setDialogoEliminar(true);
                                                setNombreEliminar(grafica.nombre);
                                                setIdEliminar(grafica.id);
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

                <PaginacionComponentes links={tarjetasGraficas.links} />
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
                                    eliminar(route('admin.graficas.eliminar', idEliminar));
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