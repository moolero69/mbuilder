import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function CrearUsuario() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        es_admin: null as 'Si' | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.usuarios.guardar'));
    };

    return (
        <>
            <Head title="Crear usuario" />
            <AdminLayout titulo="Crear usuario">
                <form onSubmit={submit} className="mx-auto grid max-w-4xl grid-cols-2 gap-6">
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
                        <Input type="password" id="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                        <InputError message={errors.password} />
                    </div>

                    <div className="mt-6 flex items-center gap-3 flex-col">
                        <Label htmlFor="es_admin">¿Administrador?</Label>
                        <input
                            id="es_admin"
                            type="checkbox"
                            checked={data.es_admin === 'Si'}
                            onChange={(e) => setData('es_admin', e.target.checked ? 'Si' : null)}
                        />
                        <InputError message={errors.es_admin} />
                    </div>

                    <div className="col-span-2 mt-4 flex justify-center">
                        <Button disabled={processing}>Crear usuario</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
