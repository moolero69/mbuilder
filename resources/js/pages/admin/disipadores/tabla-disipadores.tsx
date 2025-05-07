import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';


export default function TablaDisipadores({ disipadores }: { disipadores: any }) {

    const { props }: any = usePage();
    const exito = props.flash?.success;

    useEffect(() => {
        exito && toast.success(exito);
    }, [exito]);

    return (
        <AdminLayout titulo='Disipadores'>
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
                                <TableHead>Sockets</TableHead>
                                <TableHead>Refrigeración</TableHead>
                                <TableHead>Consumo</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {disipadores.data.map((d: any) => (
                                <TableRow key={d.id}>
                                    <TableCell>{d.nombre}</TableCell>
                                    <TableCell>{d.marca}</TableCell>
                                    <TableCell>{d.socket}</TableCell>
                                    <TableCell>{d.refrigeracion_liquida}</TableCell>
                                    <TableCell>{d.consumo} W</TableCell>
                                    <TableCell>{d.precio} €</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <PaginacionComponentes links={disipadores.links} />
            </section>
        </AdminLayout>
    );
}
