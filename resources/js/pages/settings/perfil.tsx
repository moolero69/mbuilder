import { type BreadcrumbItem, type DatosCompartidos } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import EliminarUsuario from '@/components/eliminar-usuario';
import AjustesLayout from '@/layouts/settings/ajustes-layout';

type ProfileForm = {
    name: string;
    email: string;
};

export default function Profile({ verificarEmail, estado }: { verificarEmail: boolean; estado?: string }) {
    const { auth } = usePage<DatosCompartidos>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('perfil.actualizar'), {
            preserveScroll: true,
        });
    };

    return (
        <>
                <Head title="Ajustes de perfil" />
                <AjustesLayout>
                    <div className="space-y-6">
                        <HeadingSmall title="Información del perfil" description="Actualiza tu nombre y tu dirección de correo" />

                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="nombre">Nombre</Label>

                                <Input
                                    id="nombre"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="Nombre"
                                    placeholder="Nombre"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Dirección de correo</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="usuario"
                                    placeholder="Dirección de correo"
                                />

                                <InputError className="mt-2" message={errors.email} />
                            </div>

                            {verificarEmail && auth.user.email_verified_at === null && (
                                <div>
                                    <p className="text-muted-foreground -mt-4 text-sm">
                                        Tu dirección de correo no está verificada.{' '}
                                        <Link
                                            href={route('verification.send')}
                                            method="post"
                                            as="button"
                                            className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                        >
                                            Haz clic aquí para reenviar el correo de verificación.
                                        </Link>
                                    </p>

                                    {estado === 'link-enviado' && (
                                        <div className="mt-2 text-sm font-medium text-green-600">
                                            Un nuevo enlace de verificación ha sido enviado a tu dirección de correo electrónico.
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Guardar</Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">Guardado!</p>
                                </Transition>
                            </div>
                        </form>
                    </div>

                    <EliminarUsuario />
                </AjustesLayout>
        </>
    );
}
