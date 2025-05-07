import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';

export default function TablaProcesadores({ procesadores }: {procesadores: any}) {
    return (
        <AdminLayout>
            <h1 className="mb-6 text-center text-2xl font-bold">Procesadores</h1>

            <div className="overflow-x-auto rounded-lg border border-gray-600">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Marca</TableHead>
                            <TableHead>Socket</TableHead>
                            <TableHead>Gráficos</TableHead>
                            <TableHead>Disipador</TableHead>
                            <TableHead>Base</TableHead>
                            <TableHead>Turbo</TableHead>
                            <TableHead>Núcleos</TableHead>
                            <TableHead>Hilos</TableHead>
                            <TableHead>Caché</TableHead>
                            <TableHead>Passmark</TableHead>
                            <TableHead>Consumo</TableHead>
                            <TableHead>Precio</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {procesadores.data.map((proc: any) => (
                            <TableRow key={proc.id}>
                                <TableCell>{proc.nombre}</TableCell>
                                <TableCell>{proc.marca}</TableCell>
                                <TableCell>{proc.socket}</TableCell>
                                <TableCell>{proc.graficos_integrados}</TableCell>
                                <TableCell>{proc.disipador_incluido}</TableCell>
                                <TableCell>{proc.frecuencia_base} GHz</TableCell>
                                <TableCell>{proc.frecuencia_turbo} GHz</TableCell>
                                <TableCell>{proc.nucleos}</TableCell>
                                <TableCell>{proc.hilos}</TableCell>
                                <TableCell>{proc.cache} MB</TableCell>
                                <TableCell>{proc.passmark}</TableCell>
                                <TableCell>{proc.consumo} W</TableCell>
                                <TableCell>{proc.precio} €</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <PaginacionComponentes links={procesadores.links}/>
        </AdminLayout>
    );
}
