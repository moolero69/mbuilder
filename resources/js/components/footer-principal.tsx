import { Link } from '@inertiajs/react';
import { Cookie, Facebook, Info, Instagram, Linkedin, Lock, Mail, Phone, Twitter } from 'lucide-react';
import React from 'react';

const Footer: React.FC = () => {
    const ahora = new Date();
    const año = ahora.getFullYear();

    return (
        <footer className="mt-auto w-full bg-black px-6 py-8 font-['Exo_2'] text-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 text-center sm:grid-cols-2 md:grid-cols-4 md:text-left">
                {/* Sección cómo funciona */}
                <div>
                    <h3 className="mb-2 text-lg font-semibold">¿Cómo funciona?</h3>
                    <div className="flex flex-col items-center gap-1 md:items-start">
                        <Link href={route('filtros.montaje')} className="inline-flex items-center gap-2 text-gray-300 hover:underline">
                            <Info size={16} /> Filtros utilizados en el montaje
                        </Link>
                        <Link href={route('filtros.medidor')} className="inline-flex items-center gap-2 text-gray-300 hover:underline">
                            <Info size={16} /> Filtros utilizados en el medidor
                        </Link>
                    </div>
                </div>

                {/* Sección de contacto */}
                <div>
                    <h3 className="mb-2 text-lg font-semibold">Contacto</h3>
                    <p className="flex items-center justify-center gap-2 text-gray-300 md:justify-start">
                        <Mail size={16} /> contacto@mbuilder.es
                    </p>
                    <p className="flex items-center justify-center gap-2 text-gray-300 md:justify-start">
                        <Phone size={16} /> +34 600 123 456
                    </p>
                </div>

                {/* Sección redes sociales */}
                <div>
                    <h3 className="mb-2 text-lg font-semibold">Síguenos</h3>
                    <div className="flex justify-center gap-4 md:justify-start">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <Facebook className="transition hover:text-[var(--azul-neon)]" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <Twitter className="transition hover:text-[var(--azul-neon)]" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <Instagram className="transition hover:text-[var(--azul-neon)]" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="transition hover:text-[var(--azul-neon)]" />
                        </a>
                    </div>
                </div>

                {/* Política de cookies */}
                <div>
                    <h3 className="mb-2 text-lg font-semibold">Legal</h3>
                    <div className="flex flex-col">
                        <Link
                            href={route('cookies')}
                            className="inline-flex items-center justify-center gap-2 text-gray-300 hover:underline md:justify-start"
                        >
                            <Cookie size={16} /> Política de cookies
                        </Link>
                        <Link
                            href={route('privacidad')}
                            className="inline-flex items-center justify-center gap-2 text-gray-300 hover:underline md:justify-start"
                        >
                            <Lock size={16} /> Política de privacidad
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">&copy; {año} mbuilder. Todos los derechos reservados.</div>
        </footer>
    );
};

export default Footer;
