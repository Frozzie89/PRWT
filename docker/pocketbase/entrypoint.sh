#!/bin/sh
set -e

echo "Running migrations..."
pocketbase migrate up --dir /pb/pb_data

echo "Starting PocketBase..."
exec pocketbase serve --http=0.0.0.0:8090 --dir /pb/pb_data
