export default function HeadingSmall({ titulo, descripcion }: { titulo: string; descripcion?: string }) {
    return (
        <header>
            <h3 className="mb-0.5 text-base font-medium">{titulo}</h3>
            {descripcion && <p className="text-muted-foreground text-sm">{descripcion}</p>}
        </header>
    );
}
