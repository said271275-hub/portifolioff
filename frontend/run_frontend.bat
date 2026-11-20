@echo off
title React Frontend Server (Futbol Arena)
cd /d "%~dp0"

echo ===================================================
echo [1/2] Node paketlari o'rnatilmoqda (npm install)...
echo ===================================================
call npm.cmd install

echo ===================================================
echo [2/2] Vite Dev Server ishga tushmoqda...
echo Manzil: http://localhost:5173/
echo ===================================================
call npm.cmd run dev
pause

