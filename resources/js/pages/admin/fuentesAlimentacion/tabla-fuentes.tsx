import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function TablaFuentesAlimentacion({ fuentesAlimentacion }: any) {
    const { props }: any = usePage();
    const exito = props.flash?.success;

    useEffect(() => {
        exito && toast.success(exito);
    }, [exito]);

    return (
        <AdminLayout titulo="Fuentes de Alimentacion">
            <section className="flex h-[100%] flex-col justify-center">
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
                                <TableRow key={fuente.id}>
                                    <TableCell>{fuente.nombre}</TableCell>
                                    <TableCell>{fuente.marca}</TableCell>
                                    <TableCell>{fuente.certificacion}</TableCell>
                                    <TableCell>{fuente.potencia} W</TableCell>
                                    <TableCell>{fuente.modular}</TableCell>
                                    <TableCell>{fuente.precio} €</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <PaginacionComponentes links={fuentesAlimentacion.links} />
            </section>
        </AdminLayout>
    );
}
