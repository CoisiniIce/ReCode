@echo off
chcp 65001 >nul
echo ==========================================
echo    ReCode - Professional Coding Notebook
echo ==========================================

:: --- Environment Check ---
where node >nul 2>nul
if %errorlevel% neq 0 goto NO_NODE

:: --- Dependency Check ---
if exist "node_modules" goto DB_CHECK
echo [1/3] Installing dependencies (this may take a few minutes)...
call npm install
if %errorlevel% neq 0 goto ERROR_EXIT

:DB_CHECK
echo [1/3] Dependencies are ready.
if exist "prisma\dev.db" goto LAUNCH
echo [2/3] Initializing SQLite database...
call npx prisma generate
call npx prisma db push
if %errorlevel% neq 0 goto ERROR_EXIT

:LAUNCH
echo [2/3] Database is ready.
echo [3/3] Launching ReCode...
echo.
echo Automatically opening: http://localhost:3000
echo.

:: Launch browser and start dev server
start http://localhost:3000
call npm run dev
goto END

:NO_NODE
echo [ERROR] Node.js not found. Please install Node.js first!
goto END

:ERROR_EXIT
echo [ERROR] An error occurred during execution. Please check the logs above.
goto END

:END
pause