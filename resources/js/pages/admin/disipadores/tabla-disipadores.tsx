import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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

    return (
        <AdminLayout titulo='Disipadores'>
            <Head title='Admin - disipadores' />
            <section className='flex flex-col justify-center h-[100%]'>
                <Button asChild>
                    <Link href={route('admin.disipadores.crear')}>Añadir disipador</Link>
                </Button>
                <div className="overflow-x-auto rounded-lg border border-gray-600">
                    <Table>
                        <TableHeader>
                            <TableRow>
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
                                            className="cursor-pointer"
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
