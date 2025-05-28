import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function CrearFuenteAlimentacion() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        marca: '',
        certificacion: '',
        potencia: 0,
        modular: '',
        precio: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.fuentes.guardar'));
    };

    return (
        <>
            <Head title="Añadir fuente de alimentación" />
            <AdminLayout titulo="Añadir fuente de alimentación">
                <form onSubmit={submit} className="mx-auto grid max-w-5xl grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input id="nombre" value={data.nombre} onChange={(e) => setData('nombre', e.target.value)} />
                        <InputError message={errors.nombre} />
                    </div>

                    <div>
                        <Label htmlFor="marca">Marca</Label>
                        <Input id="marca" value={data.marca} onChange={(e) => setData('marca', e.target.value)} />
                        <InputError message={errors.marca} />
                    </div>

                    <div>
                        <Label htmlFor="certificacion">Certificación</Label>
                        <Input id="certificacion" value={data.certificacion} onChange={(e) => setData('certificacion', e.target.value)} />
                        <InputError message={errors.certificacion} />
                    </div>

                    <div>
                        <Label htmlFor="potencia">Potencia (W)</Label>
                        <Input type="number" id="potencia" value={data.potencia} onChange={(e) => setData('potencia', parseInt(e.target.value))} />
                        <InputError message={errors.potencia} />
                    </div>

                    <div>
                        <Label htmlFor="modular">Modular</Label>
                        <Input id="modular" value={data.modular} onChange={(e) => setData('modular', e.target.value)} />
                        <InputError message={errors.modular} />
                    </div>

                    <div>
                        <Label htmlFor="precio">Precio (€)</Label>
                        <Input
                            type="number"
                            step="0.01"
                            id="precio"
                            value={data.precio}
                            onChange={(e) => setData('precio', parseFloat(e.target.value))}
                        />
                        <InputError message={errors.precio} />
                    </div>

                    <div className="col-span-2 mt-4 flex justify-center gap-4">
                        <Button
                            onClick={(e) => {
                                router.visit(route('admin.fuentes'));
                                e.preventDefault();
                            }}
                            variant="link"
                        >
                            Volver
                        </Button>
                        <Button disabled={processing}>Guardar fuente</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
