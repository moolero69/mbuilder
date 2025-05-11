import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useForm } from '@inertiajs/react';
import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
} from "@/components/ui/context-menu";

export default function TablaTarjetasGraficas({ tarjetasGraficas }: { tarjetasGraficas: any }) {
    const { props }: any = usePage();
    const exito = props.flash?.success;
    const { delete: eliminar } = useForm();

    useEffect(() => {
        exito && toast.success(exito);
    }, [exito]);

    const cambiarFilasPorPagina = (e: any) => {
        router.get(route('admin.graficas'), {
            mostrar_filas: e.target.value
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

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
                                <TableHead>Consumo</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tarjetasGraficas.data.map((tarjeta: any) => (
                                <ContextMenu key={tarjeta.id}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow
                                            className="cursor-pointer odd:bg-gray-500/30 hover:bg-white/60 hover:text-black"
                                            onClick={() => window.location.href = route('admin.graficas.editar', tarjeta.id)}
                                        >
                                            <TableCell>{tarjeta.nombre}</TableCell>
                                            <TableCell>{tarjeta.marca}</TableCell>
                                            <TableCell>{tarjeta.tipo}</TableCell>
                                            <TableCell>{tarjeta.serie}</TableCell>
                                            <TableCell>{tarjeta.tipo_memoria}</TableCell>
                                            <TableCell>{tarjeta.memoria} GB</TableCell>
                                            <TableCell>{tarjeta.longitud} mm</TableCell>
                                            <TableCell>{tarjeta.passmark}</TableCell>
                                            <TableCell>{tarjeta.consumo} W</TableCell>
                                            <TableCell>{tarjeta.precio} €</TableCell>
                                        </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => eliminar(route('admin.graficas.eliminar', tarjeta.id))}
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
        </AdminLayout>
    );
}
