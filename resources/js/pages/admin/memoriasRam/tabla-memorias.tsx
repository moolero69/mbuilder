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

export default function TablaMemoriasRam({ memoriasRam }: { memoriasRam: any }) {
    const { props }: any = usePage();
    const exito = props.flash?.success;
    const { delete: eliminar } = useForm();

    useEffect(() => {
        exito && toast.success(exito);
    }, [exito]);

    return (
        <AdminLayout titulo='Memorias RAM'>
            <Head title='Admin - memorias RAM' />
            <section className='flex flex-col justify-center h-[100%]'>
                <Button asChild>
                    <Link href={route('admin.memoriasRam.crear')}>Añadir memoria RAM</Link>
                </Button>
                <div className="overflow-x-auto rounded-lg border border-gray-600">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Almacenamiento</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Pack</TableHead>
                                <TableHead>Frecuencia</TableHead>
                                <TableHead>Consumo</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {memoriasRam.data.map((memoria: any) => (
                                <ContextMenu key={memoria.id}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow
                                            className="cursor-pointer"
                                            onClick={() => window.location.href = route('admin.memoriasRam.editar', memoria.id)}
                                        >
                                            <TableCell>{memoria.nombre}</TableCell>
                                            <TableCell>{memoria.marca}</TableCell>
                                            <TableCell>{memoria.almacenamiento} GB</TableCell>
                                            <TableCell>{memoria.tipo}</TableCell>
                                            <TableCell>{memoria.pack} piezas</TableCell>
                                            <TableCell>{memoria.frecuencia} MHz</TableCell>
                                            <TableCell>{memoria.consumo} W</TableCell>
                                            <TableCell>{memoria.precio} €</TableCell>
                                        </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => eliminar(route('admin.memoriasRam.eliminar', memoria.id))}
                                        >
                                            Eliminar
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <PaginacionComponentes links={memoriasRam.links} />
            </section>
        </AdminLayout>
    );
}
