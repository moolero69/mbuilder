import Footer from '@/components/footer-principal';
import Header from '@/components/header-principal';
import { ReactNode } from 'react';

export default function ConfiguradorLayout({ children }: { children: ReactNode | any }) {
    return (
        <>
            <Header />
            <main className="flex min-h-screen">
                <section className="w-[20%] bg-gray-700 text-center flex-col">{children}</section>
                <section className="w-[80%] bg-gray-900"></section>
            </main>
            <Footer />
        </>
    );
}
