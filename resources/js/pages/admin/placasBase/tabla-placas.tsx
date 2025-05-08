import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
} from "@/components/ui/context-menu";

export default function TablaPlacasBase({ placasBase }: { placasBase: any }) {
    const { props }: any = usePage();
    const exito = props.flash?.success;
    const { delete: eliminar } = useForm();

    useEffect(() => {
        exito && toast.success(exito);
    }, [exito]);

    return (
        <AdminLayout titulo='Placas Base'>
            <Head title='Admin - placas base' />
            <section className='flex flex-col justify-center h-[100%]'>
                <Button asChild>
                    <Link href={route('admin.placasBase.crear')}>Añadir placa base</Link>
                </Button>
                <div className="overflow-x-auto rounded-lg border border-gray-600">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Socket</TableHead>
                                <TableHead>Factor forma</TableHead>
                                <TableHead>Zócalos RAM</TableHead>
                                <TableHead>Puertos M.2</TableHead>
                                <TableHead>Puertos SATA</TableHead>
                                <TableHead>Puertos PCIe</TableHead>
                                <TableHead>Consumo</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {placasBase.data.map((placa: any) => (
                                <ContextMenu key={placa.id}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow
                                            className="cursor-pointer"
                                            onClick={() => window.location.href = route('admin.placasBase.editar', placa.id)}
                                        >
                                            <TableCell>{placa.nombre}</TableCell>
                                            <TableCell>{placa.marca}</TableCell>
                                            <TableCell>{placa.socket}</TableCell>
                                            <TableCell>{placa.factor_forma}</TableCell>
                                            <TableCell>{placa.zocalos_ram}</TableCell>
                                            <TableCell>{placa.puertos_m2}</TableCell>
                                            <TableCell>{placa.puertos_sata}</TableCell>
                                            <TableCell>{placa.puertos_pcie}</TableCell>
                                            <TableCell>{placa.consumo} W</TableCell>
                                            <TableCell>{placa.precio} €</TableCell>
                                        </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => eliminar(route('admin.placasBase.eliminar', placa.id))}
                                        >
                                            Eliminar
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <PaginacionComponentes links={placasBase.links} />
            </section>
        </AdminLayout>
    );
}
