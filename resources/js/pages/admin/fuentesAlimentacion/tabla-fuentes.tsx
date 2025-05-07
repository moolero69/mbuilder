import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';

export default function TablaFuentesAlimentacion({ fuentesAlimentacion }: any) {
    return (
        <AdminLayout>
            <h1 className="mb-6 text-center text-2xl font-bold">Fuentes de Alimentación</h1>

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
        </AdminLayout>
    );
}
