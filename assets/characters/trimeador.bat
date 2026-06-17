@echo off
setlocal enabledelayedexpansion
chcp 65001 > nul

echo ===================================================
echo   Renombrador de Spritesheets por Ruta
echo ===================================================
echo.

:: Solicitar la ruta al usuario
set /p "folder=Introduce o arrastra la carpeta donde están los tiles: "

:: Limpiar comillas por si el usuario arrastró la carpeta a la consola
set "folder=%folder:"=%"

:: Asegurar que la ruta termine en barra invertida si no la tiene
if not "%folder:~-1%"=="\" set "folder=%folder%\"

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
echo Extensión detectada: %ext%
echo Procesando...
echo ---------------------------------------------------

:: --- ANIMACIÓN ABAJO (000 al 003) ---
for /l %%i in (0,1,3) do (
    set "num=00%%i"
    set "num=!num:~-3!"
    if exist "%folder%tile!num!%ext%" (
        echo Renombrando tile!num!%ext% a down_%%i%ext%
        ren "%folder%tile!num!%ext%" "down_%%i%ext%"
    )
)

:: --- ANIMACIÓN DERECHA (004 al 007) ---
for /l %%i in (4,1,7) do (
    set "num=00%%i"
    set "num=!num:~-3!"
    set /a "nuevo_num=%%i - 4"
    if exist "%folder%tile!num!%ext%" (
        echo Renombrando tile!num!%ext% a right_!nuevo_num!%ext%
        ren "%folder%tile!num!%ext%" "right_!nuevo_num!%ext%"
    )
)

:: --- ANIMACIÓN ARRIBA (008 al 011) ---
for /l %%i in (8,1,11) do (
    if %%i lss 10 (set "num=00%%i") else (set "num=0%%i")
    set /a "nuevo_num=%%i - 8"
    if exist "%folder%tile!num!%ext%" (
        echo Renombrando tile!num!%ext% a up_!nuevo_num!%ext%
        ren "%folder%tile!num!%ext%" "up_!nuevo_num!%ext%"
    )
)

echo ---------------------------------------------------
echo ¡Proceso terminado con éxito!
echo.
pause