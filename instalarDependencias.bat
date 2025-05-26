@echo off
echo -------------------
echo BIENVENIDO AL INSTALADOR DE DEPENDENCIAS DE MBUILDER
echo ----------------------

set /p respuesta=¿Instalar XAMPP? (s/n):
if /i "%respuesta%"=="s" (
    ./instaladores/xampp.exe
)

set /p respuesta=¿Instalar Composer? (s/n):
if /i "%respuesta%"=="s" (
    ./instaladores/composer.exe
)

set /p respuesta=¿Instalar PHP? (s/n):
if /i "%respuesta%"=="s" (
    xcopy "./instaladores/php" "C:\Users\%USERNAME%\Documents\php" /E /I /H /Y
    setx PATH "%PATH%;C:\Users\%USERNAME%\Documents\php"
    
    echo "PHP instalado y agregado al PATH del usuario"
)

echo -------------------
echo DEPENDENCIAS INSTALADAS
echo ----------------------