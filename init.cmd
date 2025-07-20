@echo off

echo === init.cmd: Starting Setup ===

cd /d %~dp0
IF EXIST "sqlite.db" (
    echo init.cmd: Database exists. Preparing for startup...
) ELSE (
    echo init.cmd: SQLite database is missing. Generating new one...
    py ./setup/seed.py
    echo init.cmd: SQLite database created.
)

echo init.cmd: Starting Prometheus and Grafana
docker compose down -v  --remove-orphans
docker compose up -d --build prometheus grafana
echo init.cmd: Prometheus and Grafana up

echo === init.cmd: Finished Setup ===
