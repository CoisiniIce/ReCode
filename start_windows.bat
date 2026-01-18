@echo off
SETLOCAL
echo ==========================================
echo    ReCode - Professional Coding Notebook
echo ==========================================

if not exist "node_modules\" (
    echo [1/3] Installing dependencies (this may take a while)...
    call npm install
) else (
    echo [1/3] Dependencies already installed.
)

if not exist "prisma\dev.db" (
    echo [2/3] Initializing SQLite database...
    call npx prisma generate
    call npx prisma db push
) else (
    echo [2/3] Database already exists.
)

echo [3/3] Launching ReCode...
echo.
echo Please visit: http://localhost:3000
echo.
call npm run dev

pause