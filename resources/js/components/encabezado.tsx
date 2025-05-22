export default function Heading({ titulo, descripcion }: { titulo: string; descripcion?: string }) {
    return (
        <div className="mb-8 space-y-0.5">
            <h2 className="text-xl font-semibold tracking-tight">{titulo}</h2>
            {descripcion && <p className="text-muted-foreground text-sm">{descripcion}</p>}
        </div>
    );
}
