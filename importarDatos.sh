#!/bin/bash

read -p "¿Refrescar TODOS los datos? (s/n): " respuesta

if [[ "$respuesta" == "s" || "$respuesta" == "S" ]]; then
    php artisan migrate:fresh
else
    php artisan migrate
fi

php artisan importar:Procesadores ./app/Console/Commands/componentes/procesadores.csv
php artisan importar:PlacasBase ./app/Console/Commands/componentes/placas_base.csv
php artisan importar:MemoriasRam ./app/Console/Commands/componentes/ram.csv
php artisan importar:DiscosDuros ./app/Console/Commands/componentes/discos_duros.csv
php artisan importar:TarjetasGraficas ./app/Console/Commands/componentes/graficas.csv
php artisan importar:FuentesAlimentacion ./app/Console/Commands/componentes/fuentes_alimentacion.csv
php artisan importar:Disipadores ./app/Console/Commands/componentes/disipadores.csv
php artisan importar:Torres ./app/Console/Commands/componentes/torres.csv

echo "------------------------------"
echo "FIN DE LA IMPORTACIÓN DE DATOS"
echo "------------------------------"

read -p "Pulsa Enter para salir..."
