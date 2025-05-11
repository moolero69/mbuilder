import PaginacionComponentes from '@/components/Paginacion-componentes';
import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function TablaUsuarios({ usuarios }: { usuarios: any }) {
    const { props }: any = usePage();
    const exito = props.flash?.success;
    const { delete: eliminar } = useForm();

    useEffect(() => {
        exito && toast.success(exito);
    }, [exito]);

    const cambiarFilasPorPagina = (e: any) => {
        router.get(
            route('admin.usuarios'),
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
        <AdminLayout titulo="Usuarios">
            <Head title="Admin - usuarios" />
            <section className="flex h-[100%] flex-col justify-center">
                <div className="mb-4 flex items-center justify-between">
                    <Button asChild>
                        <Link href={route('admin.usuarios.crear')}>Añadir usuario</Link>
                    </Button>

                    <div className="mr-2 flex items-center gap-2">
                        <label htmlFor="mostrar_filas" className="text-sm">
                            Filas por página:
                        </label>
                        <select
                            id="mostrar_filas"
                            defaultValue={new URLSearchParams(window.location.search).get('mostrar_filas') || '5'}
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
                                <TableHead>Email</TableHead>
                                <TableHead>¿Admin?</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {usuarios.data.map((usuario: any) => (
                                <ContextMenu key={usuario.id}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow
                                            className="cursor-pointer odd:bg-gray-500/30 hover:bg-white/60 hover:text-black"
                                            onClick={() => (window.location.href = route('admin.usuarios.editar', usuario.id))}
                                        >
                                            <TableCell>{usuario.name}</TableCell>
                                            <TableCell>{usuario.email}</TableCell>
                                            <TableCell>{usuario.es_admin ? 'Si' : 'No'}</TableCell>
                                        </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => eliminar(route('admin.usuarios.eliminar', usuario.id))}
                                        >
                                            Eliminar
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <PaginacionComponentes links={usuarios.links} />
            </section>
        </AdminLayout>
    );
}
