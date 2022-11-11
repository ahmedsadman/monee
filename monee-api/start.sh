#!/bin/sh
echo "Waiting for MySQL..."
bash -c "./wait-for-it.sh db:3306 -- uvicorn app.main:app --reload --host 0.0.0.0 --port 80"
