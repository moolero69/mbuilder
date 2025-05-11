import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function TablaPlacasBase({ placasBase }: { placasBase: any }) {
    const { props }: any = usePage();
    const exito = props.flash?.success;
    const { delete: eliminar } = useForm();

    useEffect(() => {
        exito && toast.success(exito);
    }, [exito]);

    const cambiarFilasPorPagina = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get(
            route('admin.placasBase'),
            {
                mostrar_filas: e.target.value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <AdminLayout titulo="Placas Base">
            <Head title="Admin - placas base" />
            <section className="flex h-[100%] flex-col justify-center">
                <div className="mb-4 flex items-center justify-between">
                    <Button asChild>
                        <Link href={route('admin.placasBase.crear')}>Añadir placa base</Link>
                    </Button>

                    <div className="mr-2 flex items-center gap-2">
                        <label htmlFor="mostrar_filas" className="text-sm">
                            Filas por página:
                        </label>
                        <select
                            id="mostrar_filas"
                            defaultValue={new URLSearchParams(window.location.search).get('mostrar_filas') || '15'}
                            onChange={cambiarFilasPorPagina}
                            className="bg-background text-foreground rounded border px-2 py-1"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-600">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[var(--rosa-neon)]/30 hover:bg-[var(--morado-neon)]/30">
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
                                            className="cursor-pointer odd:bg-gray-500/30 hover:bg-white/60 hover:text-black"
                                            onClick={() => (window.location.href = route('admin.placasBase.editar', placa.id))}
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
