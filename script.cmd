@echo off
echo Starting Process...

set LANG=%1
set TEST_TYPE=%2

if "%TEST_TYPE%" NEQ "test" (
    if "%TEST_TYPE%" NEQ "rampLoad" (
        if "%TEST_TYPE%" NEQ "steadyLoad" (
            echo Please choose "rampLoad" or "steadyLoad"
            exit /b 1
        ) 
    )
)

if "%LANG%" NEQ "express" (
    if "%LANG%" NEQ "fastapi" (
        echo Please choose "express" or "fastapi"
        exit /b 1
    ) 
)


date /T
time /T

echo Starting Docker Setup
docker compose down -v --remove-orphans %LANG%
docker compose up -d --build %LANG%
echo Docker Setup finished


echo Starting %TEST_TYPE%-Test in %LANG%.

docker compose --profile tests run --rm -e SERVICE=%LANG% k6 run --tag testid=%date%_%time%_%LANG% --out experimental-prometheus-rw=%K6_PROMETHEUS_RW_SERVER_URL% /k6/tests/%TEST_TYPE%.js

echo Test finished, shutting down %LANG% process.
docker compose stop %LANG%
docker compose rm -f %LANG%
echo %LANG% stopped and removed.

@REM docker compose run --rm -e SERVICE=%ARG1% -e K6_PROMETHEUS_REMOTE_WRITE_LABELS="job=be_$ARG1" k6 run --out experimental-prometheus-rw=%K6_PROMETHEUS_RW_SERVER_URL% /k6/tests/%TEST%.js

@REM for /L %%i in (1,1,5) do (
@REM     echo Durchlauf %%i
@REM     docker compose run --rm -e SERVICE=%ARG1% k6 run --out experimental-prometheus-rw=%K6_PROMETHEUS_RW_SERVER_URL% /k6/tests/%TEST%.js
@REM     timeout /t 10 >nul
@REM )


echo Finished run. Ready to run next test.
