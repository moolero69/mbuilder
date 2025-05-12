import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Accede a tu cuenta de mbuilder" description="Introduce tu email y contraseña para acceder">
            <Head title="Log in" />

            <form
                className="flex flex-col gap-6 rounded-xl border border-[var(--verde-neon)] bg-black/70 p-6 shadow-[0_0_20px_var(--verde-neon)]"
                onSubmit={submit}
            >
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-[var(--verde-neon)]">
                            Dirección de email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@ejemplo.com"
                            className="border border-[var(--gris-neon)] bg-black/90 text-white placeholder-gray-400 focus:border-[var(--verde-neon)] focus:ring-[var(--verde-neon)]"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password" className="text-[var(--verde-neon)]">
                                Contraseña
                            </Label>
                            {canResetPassword && (
                                <TextLink
                                    href={route('password.request')}
                                    className="ml-auto text-sm text-[var(--cian-neon)] hover:underline"
                                    tabIndex={5}
                                >
                                    ¿Contraseña olvidada?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Contraseña"
                            className="border border-[var(--gris-neon)] bg-black/90 text-white placeholder-gray-400 focus:border-[var(--verde-neon)] focus:ring-[var(--verde-neon)]"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember" className="text-gray-300">
                            Recuérdame
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="mt-4 w-full bg-[var(--verde-neon)] text-black transition-all hover:bg-[var(--morado-neon)]"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Acceder
                    </Button>
                </div>

                <a href={route('auth.google')}>
                    <div className="flex cursor-pointer items-center justify-center gap-2 rounded border border-gray-300 bg-white px-4 py-2 text-black transition hover:shadow-md">
                        <img src="/img/logo-google.png" alt="Google" className="h-5 w-5" />
                        <span>Acceder con Google</span>
                    </div>
                </a>

                <a href={route('auth.github')}>
                    <div className="flex cursor-pointer items-center justify-center gap-2 rounded border border-gray-300 bg-white px-4 py-2 text-black transition hover:shadow-md">
                        <img src="/img/logo-github.png" alt="Google" className="h-5 w-5" />
                        <span>Acceder con Github</span>
                    </div>
                </a>

                <div className="text-center text-sm text-gray-400">
                    ¿No tienes cuenta?{' '}
                    <TextLink href={route('register')} className="text-[var(--rosa-neon)] hover:underline" tabIndex={5}>
                        Regístrate aquí
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
