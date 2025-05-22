import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import AppLayout from './app-layout';

export default function AuthLayout({ children, titulo, descripcion, ...props }: { children: React.ReactNode; titulo: string; descripcion: string }) {
    return (
        <AppLayout>
            <AuthLayoutTemplate titulo={titulo} descripcion={descripcion} {...props}>
                {children}
            </AuthLayoutTemplate>
        </AppLayout>
    );
}
