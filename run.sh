#!/bin/bash
# Source the .env file and export the variables
if [ -f backend/.env ]; then
#  export $(grep -v '^#' .env | xargs)
  source backend/.env
else
  exit 1
fi

# Start Next.js frontend
cd frontend
npm run dev &

cd ../backend

# Run FastAPI with ASGI Server (Uvicorn)
uvicorn app:app --host 0.0.0.0 --port 5000 --log-level debug --reload
