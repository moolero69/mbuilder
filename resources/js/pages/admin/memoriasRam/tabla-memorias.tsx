import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function TablaMemoriaRam({ memoriasRam }: any) {
    const { props }: any = usePage();
    const exito = props.flash?.success;

    useEffect(() => {
        exito && toast.success(exito);
    }, [exito]);

    return (
        <AdminLayout titulo="Memorias Ram">
            <section className="flex h-[100%] flex-col justify-center">
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
                                <TableRow key={memoria.id}>
                                    <TableCell>{memoria.nombre}</TableCell>
                                    <TableCell>{memoria.marca}</TableCell>
                                    <TableCell>{memoria.almacenamiento} GB</TableCell>
                                    <TableCell>{memoria.tipo}</TableCell>
                                    <TableCell>{memoria.pack} módulos</TableCell>
                                    <TableCell>{memoria.frecuencia} MHz</TableCell>
                                    <TableCell>{memoria.consumo} W</TableCell>
                                    <TableCell>{memoria.precio} €</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <PaginacionComponentes links={memoriasRam.links} />
            </section>
        </AdminLayout>
    );
}
