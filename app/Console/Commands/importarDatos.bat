@echo off
set /p respuesta=¿Refrescar TODOS los datos? (s/n):
if /i "%respuesta%"=="s" (
    php artisan migrate:fresh
) else (
    php artisan migrate
)

php artisan importar:Procesadores ./componentes/procesadores.csv
php artisan importar:PlacasBase ./componentes/placas_base.csv
php artisan importar:MemoriasRam ./componentes/ram.csv
php artisan importar:DiscosDuros ./componentes/discos_duros.csv
php artisan importar:TarjetasGraficas ./componentes/graficas.csv
php artisan importar:FuentesAlimentacion ./componentes/fuentes_alimentacion.csv
php artisan importar:Torres ./componentes/torres.csv

echo ------------------------------
echo FIN DE LA IMPORTACION DE DATOS
echo ------------------------------