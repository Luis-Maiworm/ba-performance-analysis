@echo off
echo === run.cmd: Starting Process ===

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

echo run.cmd: Starting Docker Setup
docker compose up -d --build %LANG%
echo run.cmd: Docker Setup finished

timeout /t 15 /nobreak>nul

echo === run.cmd: Starting %TEST_TYPE%.js with %LANG% ===

docker compose --profile tests run --rm -e SERVICE=%LANG% k6 run --tag testid=%date%_%time%_%LANG% --out experimental-prometheus-rw /k6/tests/%TEST_TYPE%.js

timeout /t 15 /nobreak>nul


echo run.cmd: Test finished, shutting down %LANG% process
docker compose down -v --remove-orphans %LANG%
echo run.cmd: %LANG% stopped and removed


echo === run.cmd: Finished %TEST_TYPE%.js with %LANG% ===
