@echo off
title Futbol Portfolio Boshqaruv Markazi
cd /d "%~dp0"

echo ===================================================
echo ⚽ FUTBOL ARENA PORTFOLIO ISHGA TUSHMOQDA...
echo ===================================================

echo [1] Backend (Django API) yangi oynada ochilmoqda...
start "Django Backend Server" cmd /c "cd backend && run_backend.bat"

echo [2] Frontend (React Vite) yangi oynada ochilmoqda...
start "React Frontend Server" cmd /c "cd frontend && run_frontend.bat"

echo.
echo Kutilmoqda... Serverlar tayyor bo'lishi bilan brauzer ochiladi.
timeout /t 5 /nobreak >nul

echo [3] Brauzerda portfolio ochilmoqda...
start http://localhost:5173/

echo ===================================================
echo Loyiha muvaffaqiyatli ishga tushirildi!
echo - Sayt: http://localhost:5173/
echo - Backend API: http://127.0.0.1:8000/api/
echo - Admin Panel: http://127.0.0.1:8000/admin/
echo ===================================================
exit

