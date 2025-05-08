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

export default function TablaFuentesAlimentacion({ fuentesAlimentacion }: { fuentesAlimentacion: any }) {
    const { props }: any = usePage();
    const exito = props.flash?.success;
    const { delete: eliminar } = useForm();

    useEffect(() => {
        exito && toast.success(exito);
    }, [exito]);

    return (
        <AdminLayout titulo='Fuentes de Alimentación'>
            <Head title='Admin - fuentes de aliimentación' />
            <section className='flex flex-col justify-center h-[100%]'>
                <Button asChild>
                    <Link href={route('admin.fuentes.crear')}>Añadir fuente de alimentación</Link>
                </Button>
                <div className="overflow-x-auto rounded-lg border border-gray-600">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Certificación</TableHead>
                                <TableHead>Potencia</TableHead>
                                <TableHead>Modular</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fuentesAlimentacion.data.map((fuente: any) => (
                                <ContextMenu key={fuente.id}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow
                                            className="cursor-pointer"
                                            onClick={() => window.location.href = route('admin.fuentes.editar', fuente.id)}
                                        >
                                            <TableCell>{fuente.nombre}</TableCell>
                                            <TableCell>{fuente.marca}</TableCell>
                                            <TableCell>{fuente.certificacion}</TableCell>
                                            <TableCell>{fuente.potencia} W</TableCell>
                                            <TableCell>{fuente.modular}</TableCell>
                                            <TableCell>{fuente.precio} €</TableCell>
                                        </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => eliminar(route('admin.fuentes.eliminar', fuente.id))}
                                        >
                                            Eliminar
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <PaginacionComponentes links={fuentesAlimentacion.links} />
            </section>
        </AdminLayout>
    );
}
