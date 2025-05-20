import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({ children, titulo, descripcion, ...props }: { children: React.ReactNode; titulo: string; descripcion: string }) {
    return (
        <AuthLayoutTemplate titulo={titulo} descripcion={descripcion} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
