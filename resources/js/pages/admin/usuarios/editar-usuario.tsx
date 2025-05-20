import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function EditarUsuario({ usuario }: { usuario: any }) {
    const { data, setData, put, processing, errors } = useForm({
        name: usuario.name,
        email: usuario.email,
        password: usuario.password,
        es_admin: usuario.es_admin,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.usuarios.actualizar', usuario.id));
    };

    return (
        <>
            <Head title="Editar usuario" />
            <AdminLayout titulo="Editar usuario">
                <form onSubmit={submit} className="mx-auto grid max-w-5xl grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Dejar vacío si no quieres cambiarla"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="mt-6 flex flex-col items-center gap-4">
                        <Label htmlFor="es_admin" className="text-white">
                            Administrador
                        </Label>
                        <Checkbox
                            id="es_admin"
                            checked={data.es_admin === 'Si'}
                            onCheckedChange={(checked) => setData('es_admin', checked ? 'Si' : null)}
                            className="border-1 border-white"
                        />
                        <InputError message={errors.es_admin} />
                    </div>

                    <div className="col-span-2 flex justify-center mt-4 gap-4">
                        <Button onClick={(e) => { router.visit(route('admin.usuarios')); e.preventDefault() }} variant='link'>Volver</Button>
                        <Button disabled={processing}>Editar usuario</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
