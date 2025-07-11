@echo off
echo Starte Ablauf %cd%
date /T
time /T

set ARG1=%1
set TEST=test
set TEST2=rampLoad

@REM docker compose run --rm -e SERVICE=%ARG1% -e K6_PROMETHEUS_REMOTE_WRITE_LABELS="job=be_$ARG1" k6 run --out experimental-prometheus-rw=%K6_PROMETHEUS_RW_SERVER_URL% /k6/tests/%TEST%.js
docker compose run --rm -e SERVICE=%ARG1% k6 run --out experimental-prometheus-rw=%K6_PROMETHEUS_RW_SERVER_URL% /k6/tests/%TEST%.js

@REM for /L %%i in (1,1,5) do (
@REM     echo Durchlauf %%i
@REM     docker compose run --rm -e SERVICE=%ARG1% k6 run --out experimental-prometheus-rw=%K6_PROMETHEUS_RW_SERVER_URL% /k6/tests/%TEST%.js
@REM     timeout /t 10 >nul
@REM )

echo Fertig
