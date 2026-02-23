#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
PIDS=()

cleanup() {
  echo ""
  echo "Shutting down dev servers..."
  for pid in "${PIDS[@]}"; do
    kill "$pid" 2>/dev/null || true
  done
  wait 2>/dev/null
  echo "All servers stopped."
  exit 0
}

trap cleanup SIGINT SIGTERM

APPS=("lazyvim-trainer:5173" "typescript-trainer:5174" "v8-internals:5175")

for entry in "${APPS[@]}"; do
  APP="${entry%%:*}"
  PORT="${entry##*:}"
  DIR="$ROOT/$APP"

  if [ ! -d "$DIR/node_modules" ]; then
    echo "Installing dependencies for $APP..."
    (cd "$DIR" && npm install)
  fi

  echo "Starting $APP on port $PORT..."
  (cd "$DIR" && npm run dev -- --port "$PORT") &
  PIDS+=($!)
done

sleep 2
echo ""
echo "All dev servers running:"
echo "  lazyvim-trainer     → http://localhost:5173"
echo "  typescript-trainer  → http://localhost:5174"
echo "  v8-internals        → http://localhost:5175"
echo ""

open "$ROOT/index.html"

echo "Press Ctrl+C to stop all servers."
wait
