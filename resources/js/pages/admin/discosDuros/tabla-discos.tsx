import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function TablaDiscoDuro({ discosDuros }: any) {
    const { props }: any = usePage();
    const exito = props.flash?.success;

    useEffect(() => {
        exito && toast.success(exito);
    }, [exito]);

    return (
        <AdminLayout titulo="Discos duros">
            <section className="flex h-[100%] flex-col justify-center">
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
                                <TableRow key={disco.id}>
                                    <TableCell>{disco.nombre}</TableCell>
                                    <TableCell>{disco.marca}</TableCell>
                                    <TableCell>{disco.tecnologia}</TableCell>
                                    <TableCell>{disco.almacenamiento} GB</TableCell>
                                    <TableCell>{disco.conexion}</TableCell>
                                    <TableCell>{disco.pulgadas} " </TableCell>
                                    <TableCell>{disco.velocidad} RPM</TableCell>
                                    <TableCell>{disco.consumo} W</TableCell>
                                    <TableCell>{disco.precio} €</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <PaginacionComponentes links={discosDuros.links} />
            </section>
        </AdminLayout>
    );
}
