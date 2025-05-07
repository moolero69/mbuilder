import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';

export default function TablaTorres({ torres }: any) {
    return (
        <AdminLayout>
            <h1 className="mb-6 text-center text-2xl font-bold">Torres</h1>

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
        </AdminLayout>
    );
}
