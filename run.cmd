@echo off
echo Starting Process...

set TEST_TYPE=%1
set LANG=%2

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

timeout /t 45 >nul

echo Starting %TEST_TYPE%.js with %LANG%.

docker compose --profile tests run --rm -e SERVICE=%LANG% k6 run --tag testid=%date%_%time%_%LANG% --out experimental-prometheus-rw=%K6_PROMETHEUS_RW_SERVER_URL% /k6/tests/%TEST_TYPE%.js

timeout /t 45 >nul


echo Test finished, shutting down %LANG% process.
docker compose stop %LANG%
docker compose rm -f %LANG%
echo %LANG% stopped and removed.


echo Finished run %TEST_TYPE%-%LANG%. Ready to run next test.
