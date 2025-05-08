import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="flex flex-col items-center justify-center ml-4">
                <h1 className="font-['Orbitron'] text-2xl font-extrabold tracking-widest text-white drop-shadow-[5px_5px_6px_var(--azul-neon)]">
                    MBUILDER
                </h1>
                <h1 className="font-['Orbitron'] text-2xl font-extrabold tracking-widest text-white drop-shadow-[5px_5px_6px_var(--naranja-neon)]">
                    ADMIN
                </h1>
            </div>
        </>
    );
}
