import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';


export default function TablaDisipadores({ disipadores }: { disipadores: any}) {
    return (
        <AdminLayout>
            <h1 className="mb-6 text-center text-2xl font-bold">Disipadores</h1>

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
        </AdminLayout>
    );
}
