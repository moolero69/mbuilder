import Footer from '@/components/footer-principal';
import Header from '@/components/header-principal';
import { ConfiguradorLayoutProps } from '@/types';

export default function ConfiguradorLayout({ sidebar, main }: ConfiguradorLayoutProps) {
    return (
        <>
            <Header />
            <main className="flex h-screen">
                <section className="w-[20%] font-['Exo_2'] flex-col overflow-y-auto overflow-x-hidden bg-gray-700 text-center [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-[var(--rojo-neon)] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-black">
                    {sidebar}
                </section>
                <section className="w-[80%] bg-gray-900">{main}</section>
            </main>
            <Footer />
        </>
    );
}
