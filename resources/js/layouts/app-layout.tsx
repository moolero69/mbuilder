import TarjetaCookies from '@/pages/legal/cookies/tarjetaCookies';
import React, { useEffect, useState } from 'react';

interface Props {
    children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
    const [cookiesAceptadas, setCookiesAceptadas] = useState(true);

    useEffect(() => {
        const consentimiento = localStorage.getItem('consentimiento-cookies');
        // Solo oculta la tarjeta si se aceptó alguna cookie
        setCookiesAceptadas(consentimiento === 'esenciales' || consentimiento === 'todas');
    }, []);


    return (
        <div>
            {children}
            {/* Tarjeta de cookies sticky abajo a la izquierda */}
            {!cookiesAceptadas && (
                <TarjetaCookies
                    onAceptar={(tipo: string) => {
                        localStorage.setItem('consentimiento-cookies', tipo);
                        setCookiesAceptadas(true);
                    }}
                />
            )}
        </div>
    );
};

export default AppLayout;
