import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import HeadingSmall from '@/components/encabezado-pequeño';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function EliminarUsuario() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm<Required<{ password: string }>>({ password: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('perfil.eliminar'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <div className="space-y-6">
            <HeadingSmall title="Borrar cuenta" description="Borra tu cuenta y todos sus recursos." />
            <div className="space-y-4 rounded-lg border border-[var(--rojo-neon)] bg-red-950/30 p-4 shadow-[0_0_12px_var(--rojo-neon)]">
                <div className="relative space-y-0.5 text-[var(--amarillo-neon)]">
                    <p className="font-bold text-lg">⚠️ Aviso importante</p>
                    <p className="text-sm text-[var(--gris-neon)]">Por favor procede con cautela, esto no se puede deshacer.</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-[var(--rojo-neon)] text-black hover:bg-red-600 font-bold shadow-[0_0_8px_var(--rojo-neon)]">
                            Borrar cuenta
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="border border-[var(--amarillo-neon)] bg-black/90 text-[var(--amarillo-neon)] shadow-[0_0_30px_var(--amarillo-neon)]">
                        <DialogTitle className="text-[var(--rojo-neon)] text-xl font-extrabold">
                            ¿Estás seguro de que quieres eliminar tu cuenta?
                        </DialogTitle>
                        <DialogDescription className="text-[var(--gris-neon)]">
                            Una vez que se elimine tu cuenta, todos tus recursos y datos también se eliminarán permanentemente.
                            Introduce tu contraseña para confirmar esta acción irreversible.
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={deleteUser}>
                            <div className="grid gap-2">
                                <Label htmlFor="contraseña" className="sr-only">Contraseña</Label>
                                <Input
                                    id="contraseña"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Contraseña"
                                    autoComplete="current-password"
                                    className="bg-black text-white border border-[var(--amarillo-neon)] placeholder-gray-500 focus:border-[var(--rojo-neon)] focus:ring-[var(--rojo-neon)]"
                                />
                                <InputError message={errors.password} className="text-[var(--rojo-neon)]" />
                            </div>

                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button
                                        variant="secondary"
                                        onClick={closeModal}
                                        className="border border-[var(--amarillo-neon)] text-[var(--amarillo-neon)] hover:bg-[var(--amarillo-neon)] hover:text-black"
                                    >
                                        Cancelar
                                    </Button>
                                </DialogClose>

                                <Button
                                    variant="destructive"
                                    disabled={processing}
                                    className="bg-[var(--rojo-neon)] text-black font-bold hover:bg-red-600 shadow-[0_0_8px_var(--rojo-neon)]"
                                    asChild
                                >
                                    <button type="submit">Eliminar cuenta</button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
