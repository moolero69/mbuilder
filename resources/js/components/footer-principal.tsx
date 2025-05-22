import React from "react";
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Cookie, Info, Lock } from "lucide-react";
import { Link } from "@inertiajs/react";

const Footer: React.FC = () => {
  const ahora = new Date();
  const año = ahora.getFullYear();

  return (
    <footer className="bg-black text-white px-6 py-8 w-full mt-auto font-['Exo_2']">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Sección cómo funciona */}
        <div>
          <h3 className="text-lg font-semibold mb-2">¿Cómo funciona?</h3>
          <div className="flex flex-col gap-1 items-center md:items-start">
            <Link
              href={route("filtros.montaje")}
              className="inline-flex items-center gap-2 text-gray-300 hover:underline"
            >
              <Info size={16} /> Filtros utilizados en el montaje
            </Link>
            <Link
              href={route("filtros.medidor")}
              className="inline-flex items-center gap-2 text-gray-300 hover:underline"
            >
              <Info size={16} /> Filtros utilizados en el medidor
            </Link>
          </div>
        </div>

        {/* Sección de contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contacto</h3>
          <p className="flex items-center justify-center md:justify-start gap-2 text-gray-300">
            <Mail size={16} /> contacto@mbuilder.es
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-gray-300">
            <Phone size={16} /> +34 600 123 456
          </p>
        </div>

        {/* Sección redes sociales */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Síguenos</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="hover:text-[var(--azul-neon)] transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="hover:text-[var(--azul-neon)] transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="hover:text-[var(--azul-neon)] transition" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="hover:text-[var(--azul-neon)] transition" />
            </a>
          </div>
        </div>

        {/* Política de cookies */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Legal</h3>
          <div className="flex flex-col">
            <Link
              href={route("cookies")}
              className="inline-flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:underline"
            >
              <Cookie size={16} /> Política de cookies
            </Link>
            <Link
              href={route("privacidad")}
              className="inline-flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:underline"
            >
              <Lock size={16} /> Política de privacidad
            </Link>

          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; {año} mbuilder. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
