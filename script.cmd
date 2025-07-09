@echo off
echo Starte Ablauf %cd%
date /T
time /T

for /L %%i in (1,1,5) do (
    echo Durchlauf %%i
    docker compose run --rm -e SERVICE=node k6 run --out experimental-prometheus-rw=%K6_PROMETHEUS_RW_SERVER_URL% /k6/tests/rampLoad.js
    timeout /t 10 >nul
)

echo Fertig
