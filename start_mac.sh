#!/bin/bash

echo "=========================================="
echo "   ReCode - Professional Coding Notebook"
echo "=========================================="

if [ ! -d "node_modules" ]; then
    echo "[1/3] Installing dependencies..."
    npm install
else
    echo "[1/3] Dependencies already installed."
fi

if [ ! -f "prisma/dev.db" ]; then
    echo "[2/3] Initializing SQLite database..."
    npx prisma generate
    npx prisma db push
else
    echo "[2/3] Database already exists."
fi

echo "[3/3] Launching ReCode..."
echo "Please visit: http://localhost:3000"
npm run dev