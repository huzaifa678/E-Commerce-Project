#!/bin/sh
set -e

echo "Node version: $(node -v)"
echo "Working directory: $(pwd)"
echo "Listing files:"
ls -l

exec npm start
