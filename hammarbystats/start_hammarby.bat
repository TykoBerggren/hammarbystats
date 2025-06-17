@echo off
title Hammarby IF Statistik Server
color 0A

echo.
echo =================================================
echo  🟢⚪ HAMMARBY IF STATISTIK SERVER 🟢⚪
echo =================================================
echo.
echo  Startar lokal server för att undvika CORS-problem...
echo.

REM Kontrollera om Python finns
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python hittades inte!
    echo 💡 Installera Python från https://python.org
    echo.
    pause
    exit /b 1
)

REM Kontrollera om vi är i rätt mapp
if not exist "index.html" (
    echo ❌ index.html hittades inte!
    echo 💡 Se till att köra denna fil från samma mapp som index.html
    echo.
    pause
    exit /b 1
)

echo ✅ Python hittades
echo ✅ index.html hittades
echo.
echo 🚀 Startar server...
echo 🌐 Server kommer att öppnas på: http://localhost:8000
echo 🔄 Tryck Ctrl+C för att stoppa servern
echo.

REM Starta Python-servern
python start_server.py

echo.
echo 👋 Servern stängdes. Tack för att du använde Hammarby IF Statistik!
pause 