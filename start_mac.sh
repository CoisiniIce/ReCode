#!/bin/bash

echo "=========================================="
echo "   ReCode - Professional Coding Notebook"
echo "=========================================="

if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed. Please install it first."
    exit 1
fi

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

if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  open http://localhost:3000
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  # Linux (Ubuntu, Debian, etc.)
  xdg-open http://localhost:3000 &> /dev/null &
fi

npm run dev