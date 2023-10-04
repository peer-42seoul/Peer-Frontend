#!/bin/bash

JSON_FILE="./db.json"

# Port number
PORT=4000

# Check if db.json file exists
if [ ! -f "$JSON_FILE" ]; then
  echo "Error: $JSON_FILE not found."
  exit 1
fi

# Start json-server
npx json-server --watch "$JSON_FILE" --port "$PORT"
# npx json-server --watch ./db.json --port 3001