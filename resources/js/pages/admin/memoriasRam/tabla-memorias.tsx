import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';

export default function TablaMemoriaRam({ memoriasRam }: any) {
    return (
        <AdminLayout>
            <h1 className="mb-6 text-center text-2xl font-bold">Memorias RAM</h1>

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
        </AdminLayout>
    );
}
