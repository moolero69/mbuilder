import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
} from "@/components/ui/context-menu";

export default function TablaDisipadores({ disipadores }: { disipadores: any }) {
    const { props }: any = usePage();
    const exito = props.flash?.success;
    const { delete: eliminar } = useForm();

    useEffect(() => {
        exito && toast.success(exito);
    }, [exito]);

    const cambiarFilasPorPagina = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get(route('admin.disipadores'), {
            mostrar_filas: e.target.value
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

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
                                            onClick={() => eliminar(route('admin.disipadores.eliminar', disipador.id))}
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
        </AdminLayout>
    );
}
