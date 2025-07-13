@echo off

cd /d %~dp0
IF EXIST "sqlite.db" (
    echo Database exists. Preparing for startup...
) ELSE (
    echo SQLite database is missing. Generating new one...
    py ./setup/seed.py
    echo SQLite database created.
)

echo Starting Docker Setup
docker compose down -v prometheus grafana
docker compose up -d --build prometheus grafana
docker compose build express fastapi
echo Docker Setup finished
