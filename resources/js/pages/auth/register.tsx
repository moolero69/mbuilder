import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Crea tu cuenta de mbuilder" description="Introduce los detalles debajo">
            <Head title="Registro" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6 bg-black/80 border border-[var(--azul-neon)] rounded-xl p-6 shadow-[0_0_30px_var(--azul-neon)]">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-[var(--azul-neon)]">Nombre</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Nombre completo"
                            className="bg-black text-white border border-[var(--azul-neon)] placeholder-gray-500 focus:border-[var(--morado-neon)] focus:ring-[var(--morado-neon)]"
                        />
                        <InputError message={errors.name} className="text-[var(--rojo-neon)] mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-[var(--azul-neon)]">Dirección email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@ejemplo.com"
                            className="bg-black text-white border border-[var(--azul-neon)] placeholder-gray-500 focus:border-[var(--morado-neon)] focus:ring-[var(--morado-neon)]"
                        />
                        <InputError message={errors.email} className="text-[var(--rojo-neon)]" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-[var(--azul-neon)]">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Contraseña"
                            className="bg-black text-white border border-[var(--azul-neon)] placeholder-gray-500 focus:border-[var(--morado-neon)] focus:ring-[var(--morado-neon)]"
                        />
                        <InputError message={errors.password} className="text-[var(--rojo-neon)]" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation" className="text-[var(--azul-neon)]">Confirmar contraseña</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirmar contraseña"
                            className="bg-black text-white border border-[var(--azul-neon)] placeholder-gray-500 focus:border-[var(--morado-neon)] focus:ring-[var(--morado-neon)]"
                        />
                        <InputError message={errors.password_confirmation} className="text-[var(--rojo-neon)]" />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 w-full bg-[var(--azul-neon)]/80 hover:bg-[var(--morado-neon)] hover:text-white transition-all duration-300"
                        tabIndex={5}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Crear cuenta
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-400">
                    ¿Ya tienes cuenta?{' '}
                    <TextLink href={route('login')} tabIndex={6} className="text-[var(--azul-neon)] hover:underline">
                        Inicia sesión
                    </TextLink>
                </div>
            </form>
        </AuthLayout>

    );
}
