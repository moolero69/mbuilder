import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function TablaTarjetaGrafica({ tarjetasGraficas }: any) {
    const { props }: any = usePage();
    const exito = props.flash?.success;

    useEffect(() => {
        exito && toast.success(exito);
    }, [exito]);

    return (
        <AdminLayout titulo="Tarjetas gráficas">
            <section className="flex h-[100%] flex-col justify-center">
                <Button asChild>
                    <Link href={route('admin.graficas.crear')}>Añadir tarjeta gráfica</Link>
                </Button>
                <div className="overflow-x-auto rounded-lg border border-gray-600">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Serie</TableHead>
                                <TableHead>Tipo Memoria</TableHead>
                                <TableHead>Memoria</TableHead>
                                <TableHead>Longitud</TableHead>
                                <TableHead>Passmark</TableHead>
                                <TableHead>Consumo</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tarjetasGraficas.data.map((grafica: any) => (
                                <TableRow key={grafica.id}>
                                    <TableCell>{grafica.nombre}</TableCell>
                                    <TableCell>{grafica.marca}</TableCell>
                                    <TableCell>{grafica.tipo}</TableCell>
                                    <TableCell>{grafica.serie}</TableCell>
                                    <TableCell>{grafica.tipo_memoria}</TableCell>
                                    <TableCell>{grafica.memoria} GB</TableCell>
                                    <TableCell>{grafica.longitud} mm</TableCell>
                                    <TableCell>{grafica.passmark}</TableCell>
                                    <TableCell>{grafica.consumo} W</TableCell>
                                    <TableCell>{grafica.precio} €</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <PaginacionComponentes links={tarjetasGraficas.links} />
            </section>
        </AdminLayout>
    );
}
