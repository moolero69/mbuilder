import Footer from '@/components/footer-principal';
import Header from '@/components/header-principal';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function PoliticaCookies() {
    return (
        <>
            <Head title="Política de Cookies" />
            <AppLayout>
                <Header />
                <main className='w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700'>
                    <div className="max-w-4xl mx-auto px-6 py-12 text-white">
                        <h1 className="text-4xl font-bold mb-6">Política de Cookies</h1>

                        <p className="mb-4">
                            Esta página web utiliza cookies propias y de terceros para garantizar una mejor experiencia de usuario, analizar el tráfico del sitio y personalizar el contenido. Al continuar navegando, aceptas el uso de cookies conforme a esta política.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-2">¿Qué son las cookies?</h2>
                        <p className="mb-4">
                            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, smartphone, tablet, etc.) cuando accedes a ciertos sitios web. Sirven para recordar información sobre tu visita, como idioma preferido, productos añadidos al carrito, sesión iniciada, etc.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-2">¿Qué tipos de cookies utilizamos?</h2>
                        <ul className="list-disc list-inside mb-4 space-y-2">
                            <li><strong>Cookies técnicas:</strong> necesarias para el funcionamiento básico del sitio.</li>
                            <li><strong>Cookies de personalización:</strong> permiten recordar tus preferencias como idioma o región.</li>
                            <li><strong>Cookies analíticas:</strong> recogen datos estadísticos anónimos sobre el uso del sitio.</li>
                            <li><strong>Cookies de terceros:</strong> usadas por servicios externos como Google Analytics, redes sociales o herramientas de marketing.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-2">Consentimiento del usuario</h2>
                        <p className="mb-4">
                            Al acceder a esta web por primera vez, verás un banner informativo sobre el uso de cookies. Puedes aceptar todas las cookies, configurarlas o rechazarlas. En cualquier momento puedes cambiar tu configuración o retirar tu consentimiento desde tu navegador.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-2">¿Cómo desactivar las cookies?</h2>
                        <p className="mb-4">
                            Puedes configurar tu navegador para permitir, bloquear o eliminar las cookies instaladas. A continuación te dejamos enlaces con información para los navegadores más comunes:
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-2">
                            <li><a href="https://support.google.com/chrome/answer/95647?hl=es" className="text-blue-400 underline" target="_blank">Google Chrome</a></li>
                            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" className="text-blue-400 underline" target="_blank">Mozilla Firefox</a></li>
                            <li><a href="https://support.apple.com/es-es/HT201265" className="text-blue-400 underline" target="_blank">Safari</a></li>
                            <li><a href="https://support.microsoft.com/es-es/help/4027947/windows-delete-cookies" className="text-blue-400 underline" target="_blank">Microsoft Edge</a></li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-2">Responsable del tratamiento de los datos</h2>
                        <p className="mb-4">
                            El responsable del tratamiento de los datos recopilados a través de las cookies es mbuilder. Puedes contactar para ejercer tus derechos de acceso, rectificación, cancelación u oposición (ARCO) mediante el correo: <strong>contacto@mbuilder.com</strong>
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-2">Cambios en la política de cookies</h2>
                        <p className="mb-4">
                            Esta política puede actualizarse en función de nuevas exigencias legislativas o técnicas. Te recomendamos revisarla periódicamente.
                        </p>

                        <p className="mt-8 italic text-sm">
                            Última actualización: 19 de mayo de 2025
                        </p>
                    </div>
                </main>
                <Footer />
            </AppLayout>
        </>
    );
}