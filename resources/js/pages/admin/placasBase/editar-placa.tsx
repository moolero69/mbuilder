import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/admin-layout';
import { PlacaBase } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function EditarPlacaBase({ placaBase }: { placaBase: PlacaBase }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: placaBase.nombre,
        marca: placaBase.marca,
        socket: placaBase.socket,
        factor_forma: placaBase.factor_forma,
        zocalos_ram: placaBase.zocalos_ram,
        puertos_m2: placaBase.puertos_m2,
        puertos_sata: placaBase.puertos_sata,
        puertos_pcie: placaBase.puertos_pcie,
        consumo: placaBase.consumo,
        precio: placaBase.precio,
    });

    const editar: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.placasBase.actualizar', placaBase.id));
    };

    return (
        <>
            <Head title="Editar placa base" />
            <AdminLayout titulo="Editar placa base">
                <form onSubmit={editar} className="mx-auto grid max-w-5xl grid-cols-2 gap-6">
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
                        <Label htmlFor="socket">Socket</Label>
                        <Input id="socket" value={data.socket} onChange={(e) => setData('socket', e.target.value)} />
                        <InputError message={errors.socket} />
                    </div>

                    <div>
                        <Label htmlFor="factor_forma">Factor de forma</Label>
                        <Input id="factor_forma" value={data.factor_forma} onChange={(e) => setData('factor_forma', e.target.value)} />
                        <InputError message={errors.factor_forma} />
                    </div>

                    <div>
                        <Label htmlFor="zocalos_ram">Zócalos RAM</Label>
                        <Input
                            type="number"
                            id="zocalos_ram"
                            value={data.zocalos_ram}
                            onChange={(e) => setData('zocalos_ram', parseInt(e.target.value))}
                        />
                        <InputError message={errors.zocalos_ram} />
                    </div>

                    <div>
                        <Label htmlFor="puertos_m2">Puertos M.2</Label>
                        <Input
                            type="number"
                            id="puertos_m2"
                            value={data.puertos_m2}
                            onChange={(e) => setData('puertos_m2', parseInt(e.target.value))}
                        />
                        <InputError message={errors.puertos_m2} />
                    </div>

                    <div>
                        <Label htmlFor="puertos_sata">Puertos SATA</Label>
                        <Input
                            type="number"
                            id="puertos_sata"
                            value={data.puertos_sata}
                            onChange={(e) => setData('puertos_sata', parseInt(e.target.value))}
                        />
                        <InputError message={errors.puertos_sata} />
                    </div>

                    <div>
                        <Label htmlFor="puertos_pcie">Puertos PCIe</Label>
                        <Input
                            type="number"
                            id="puertos_pcie"
                            value={data.puertos_pcie}
                            onChange={(e) => setData('puertos_pcie', parseInt(e.target.value))}
                        />
                        <InputError message={errors.puertos_pcie} />
                    </div>

                    <div>
                        <Label htmlFor="consumo">Consumo (W)</Label>
                        <Input type="number" id="consumo" value={data.consumo} onChange={(e) => setData('consumo', parseInt(e.target.value))} />
                        <InputError message={errors.consumo} />
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
                                router.visit(route('admin.placasBase'));
                                e.preventDefault();
                            }}
                            variant="link"
                        >
                            Volver
                        </Button>
                        <Button disabled={processing}>Editar placa base</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
