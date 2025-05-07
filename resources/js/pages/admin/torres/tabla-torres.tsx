import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function TablaTorres({ torres }: any) {
    const { props }: any = usePage();
    const exito = props.flash?.success;

    useEffect(() => {
        exito && toast.success(exito);
    }, [exito]);

    return (
        <AdminLayout titulo="Torres">
            <section className="flex h-[100%] flex-col justify-center">
                <Button asChild>
                    <Link href={route('admin.torres.crear')}>Añadir torre</Link>
                </Button>
                <div className="overflow-x-auto rounded-lg border border-gray-600">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Factor Forma</TableHead>
                                <TableHead>RGB</TableHead>
                                <TableHead>Longitud GPU</TableHead>
                                <TableHead>Refrigeración</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {torres.data.map((torre: any) => (
                                <TableRow key={torre.id}>
                                    <TableCell>{torre.nombre}</TableCell>
                                    <TableCell>{torre.marca}</TableCell>
                                    <TableCell>{torre.factor_forma}</TableCell>
                                    <TableCell>{torre.soporte_RGB}</TableCell>
                                    <TableCell>{torre.longitud_maxima_gpu} mm</TableCell>
                                    <TableCell>{torre.refrigeracion_liquida}</TableCell>
                                    <TableCell>{torre.precio} €</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <PaginacionComponentes links={torres.links} />
            </section>
        </AdminLayout>
    );
}
