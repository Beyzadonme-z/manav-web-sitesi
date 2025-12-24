@echo off
echo Basit Web Sunucusu Baslatiliyor...
echo.
echo Tarayicida su adresi acin: http://localhost:8000
echo.
echo Durdurmak icin Ctrl+C tuslarina basin
echo.
python -m http.server 8000
pause
