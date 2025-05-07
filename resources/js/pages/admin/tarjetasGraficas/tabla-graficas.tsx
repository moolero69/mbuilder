import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';

export default function TablaTarjetaGrafica({ tarjetasGraficas }: any) {
    return (
        <AdminLayout>
            <h1 className="mb-6 text-center text-2xl font-bold">Tarjetas Gráficas</h1>

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
        </AdminLayout>
    );
}
