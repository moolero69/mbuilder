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

export default function TablaDiscosDuros({ discosDuros }: { discosDuros: any }) {
    const { props }: any = usePage();
    const exito = props.flash?.success;
    const { delete: eliminar } = useForm();

    useEffect(() => {
        exito && toast.success(exito);
    }, [exito]);

    return (
        <AdminLayout titulo='Discos Duros'>
            <Head title='Admin - discos duros' />
            <section className='flex flex-col justify-center h-[100%]'>
                <Button asChild>
                    <Link href={route('admin.discosDuros.crear')}>Añadir disco duro</Link>
                </Button>
                <div className="overflow-x-auto rounded-lg border border-gray-600">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Tecnología</TableHead>
                                <TableHead>Almacenamiento</TableHead>
                                <TableHead>Conexión</TableHead>
                                <TableHead>Pulgadas</TableHead>
                                <TableHead>Velocidad</TableHead>
                                <TableHead>Consumo</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {discosDuros.data.map((disco: any) => (
                                <ContextMenu key={disco.id}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow
                                            className="cursor-pointer"
                                            onClick={() => window.location.href = route('admin.discosDuros.editar', disco.id)}
                                        >
                                            <TableCell>{disco.nombre}</TableCell>
                                            <TableCell>{disco.marca}</TableCell>
                                            <TableCell>{disco.tecnologia}</TableCell>
                                            <TableCell>{disco.almacenamiento} GB</TableCell>
                                            <TableCell>{disco.conexion}</TableCell>
                                            <TableCell>{disco.pulgadas}"</TableCell>
                                            <TableCell>{disco.velocidad} RPM</TableCell>
                                            <TableCell>{disco.consumo} W</TableCell>
                                            <TableCell>{disco.precio} €</TableCell>
                                        </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => eliminar(route('admin.discosDuros.eliminar', disco.id))}
                                        >
                                            Eliminar
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <PaginacionComponentes links={discosDuros.links} />
            </section>
        </AdminLayout>
    );
}
