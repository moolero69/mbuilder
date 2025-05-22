import InputError from '@/components/input-error';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import HeadingSmall from '@/components/encabezado-pequeño';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AjustesLayout from '@/layouts/settings/ajustes-layout';

export default function Password({ tiene_contraseña, contra }: { tiene_contraseña: boolean, contra: string }) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('contraseña.actualizar'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <>
            <Head title="Ajustes de contraseña" />

            <AjustesLayout>
                <div className="space-y-6">
                    {!tiene_contraseña &&
                        <h1 className='text-[var(--amarillo-neon)]'>Has iniciado sesión con un servicio de terceros, con lo cual no puedes cambiar la contraseña.</h1>
                    }
                    
                    <HeadingSmall title="Actualizar contraseña" description="Recuerda poner una contraseña larga y aleatoria para una mayor seguridad." />

                    <form onSubmit={updatePassword} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="contraseña_actual">Contraseña actual</Label>

                            <Input
                                id="contraseña_actual"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                placeholder="Contraseña actual"
                                disabled={!tiene_contraseña}
                            />

                            <InputError message={errors.current_password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="contraseña">Nueva contraseña</Label>

                            <Input
                                id="contraseña"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Nueva contraseña"
                                disabled={!tiene_contraseña}
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="confirmar_contraseña">Confirmar contraseña</Label>

                            <Input
                                id="confirmar_contraseña"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Confirmar contraseña"
                                disabled={!tiene_contraseña}
                            />

                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing || !tiene_contraseña}>Guardar contraseña</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"

                            >
                                <p className="text-sm text-neutral-600">Guardada!</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </AjustesLayout>
        </>
    );
}
