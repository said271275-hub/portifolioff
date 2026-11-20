@echo off
title Django Backend Server (Futbol Arena)
cd /d "%~dp0"

echo ===================================================
echo [1/2] Ma'lumotlar bazasi tekshirilmoqda...
echo ===================================================
python manage.py migrate

echo ===================================================
echo [2/2] Django server ishga tushmoqda...
echo Manzil: http://127.0.0.1:8000/
echo Admin panel: http://127.0.0.1:8000/admin/
echo ===================================================
python manage.py runserver 127.0.0.1:8000
pause
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.