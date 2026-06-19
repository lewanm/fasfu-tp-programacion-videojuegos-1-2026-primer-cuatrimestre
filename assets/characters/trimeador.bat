@echo off
setlocal enabledelayedexpansion
chcp 65001 > nul

echo ===================================================
echo   Renombrador de Spritesheets Dinámico por Carpeta
echo ===================================================
echo.

:: Solicitar la ruta al usuario
set /p "folder=Introduce o arrastra la carpeta donde están los tiles: "

:: Limpiar comillas por si el usuario arrastró la carpeta a la consola
set "folder=%folder:"=%"

:: Quitar la barra invertida del final si la tiene (para obtener bien el nombre)
if "%folder:~-1%"=="\" set "folder=%folder:~0,-1%"

:: Obtener el nombre de la carpeta actual como prefijo
for %%A in ("%folder%") do set "prefijo=%%~nxA"

:: Ahora sí, asegurar que la ruta termine en barra invertida para buscar los archivos
set "folder=%folder%\"

:: Verificar si la carpeta existe
if not exist "%folder%" (
    echo.
    echo [ERROR] La ruta especificada no existe: "%folder%"
    echo.
    pause
    exit /b
)

:: Detectar la extensión de los archivos en esa carpeta específica
set "ext="
for %%F in ("%folder%tile000.*") do (
    set "ext=%%~xF"
)

if "%ext%"=="" (
    echo.
    echo [ERROR] No se encontró 'tile000' en la carpeta especificada.
    echo Revisa que los archivos estén ahí y se llamen exactamente 'tile000'.
    echo.
    pause
    exit /b
)

echo.
echo Carpeta detectada: %folder%
echo Nombre asignado (Prefijo): %prefijo%
echo Extensión detectada: %ext%
echo Procesando...
echo ---------------------------------------------------

:: Iterar del 0 al 11 (los 12 frames del personaje)
for /l %%i in (0,1,11) do (
    
    :: Formatear el número actual a 3 dígitos (000, 001, 010, etc.)
    set "num=00%%i"
    set "num=!num:~-3!"
    
    :: Definir la animación y el índice interno según el rango
    if %%i geq 0 if %%i lss 4 (
        set "anim=down"
        set /a "frame=%%i"
    )
    if %%i geq 4 if %%i lss 8 (
        set "anim=right"
        set /a "frame=%%i - 4"
    )
    if %%i geq 8 if %%i lss 12 (
        set "anim=up"
        set /a "frame=%%i - 8"
    )
    
    :: Renombrar si el archivo existe
    if exist "%folder%tile!num!%ext%" (
        echo Renombrando tile!num!%ext% a %prefijo%_!anim!_!frame!%ext%
        ren "%folder%tile!num!%ext%" "%prefijo%_!anim!_!frame!%ext%"
    )
)

echo ---------------------------------------------------
echo ¡Proceso terminado con éxito!
echo.
pause