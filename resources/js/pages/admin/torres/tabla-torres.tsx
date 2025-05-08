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

export default function TablaTorres({ torres }: { torres: any }) {
    const { props }: any = usePage();
    const exito = props.flash?.success;
    const { delete: eliminar } = useForm();

    useEffect(() => {
        exito && toast.success(exito);
    }, [exito]);

    return (
        <AdminLayout titulo='Torres'>
            <Head title='Admin - torres' />
            <section className='flex flex-col justify-center h-[100%]'>
                <Button asChild>
                    <Link href={route('admin.torres.crear')}>Añadir torre</Link>
                </Button>
                <div className="overflow-x-auto rounded-lg border border-gray-600">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Factor de Forma</TableHead>
                                <TableHead>Soporte RGB</TableHead>
                                <TableHead>Longitud Máxima GPU</TableHead>
                                <TableHead>Refrigeración Líquida</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {torres.data.map((torre: any) => (
                                <ContextMenu key={torre.id}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow
                                            className="cursor-pointer"
                                            onClick={() => window.location.href = route('admin.torres.editar', torre.id)}
                                        >
                                            <TableCell>{torre.nombre}</TableCell>
                                            <TableCell>{torre.marca}</TableCell>
                                            <TableCell>{torre.factor_forma}</TableCell>
                                            <TableCell>{torre.soporte_RGB}</TableCell>
                                            <TableCell>{torre.longitud_maxima_gpu} mm</TableCell>
                                            <TableCell>{torre.refrigeracion_liquida}</TableCell>
                                            <TableCell>{torre.precio} €</TableCell>
                                        </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => eliminar(route('admin.torres.eliminar', torre.id))}
                                        >
                                            Eliminar
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <PaginacionComponentes links={torres.links} />
            </section>
        </AdminLayout>
    );
}
