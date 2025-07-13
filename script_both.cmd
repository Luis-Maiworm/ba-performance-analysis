@echo off
echo Starting Process...


date /T
time /T

set TEST_TYPE=steadyLoad

echo Starting Docker Setup
docker compose down -v express fastapi
docker compose up -d --build express fastapi
echo Docker Setup finished


echo Starting %TEST_TYPE%-Test in LANG.

docker compose --profile tests run --rm -e SERVICE=fastapi k6 run --tag testid=%date%_%time%_fastapi --out experimental-prometheus-rw=%K6_PROMETHEUS_RW_SERVER_URL% /k6/tests/%TEST_TYPE%.js
timeout /t 10 >nul
docker compose --profile tests run --rm -e SERVICE=express k6 run --tag testid=%date%_%time%_express --out experimental-prometheus-rw=%K6_PROMETHEUS_RW_SERVER_URL% /k6/tests/%TEST_TYPE%.js
@REM docker compose run --rm -e SERVICE=%ARG1% -e K6_PROMETHEUS_REMOTE_WRITE_LABELS="job=be_$ARG1" k6 run --out experimental-prometheus-rw=%K6_PROMETHEUS_RW_SERVER_URL% /k6/tests/%TEST%.js

@REM for /L %%i in (1,1,5) do (
@REM     echo Durchlauf %%i
@REM     docker compose run --rm -e SERVICE=%ARG1% k6 run --out experimental-prometheus-rw=%K6_PROMETHEUS_RW_SERVER_URL% /k6/tests/%TEST%.js
@REM     timeout /t 10 >nul
@REM )


echo Finished run.
