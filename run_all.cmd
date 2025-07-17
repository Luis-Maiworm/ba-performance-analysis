@echo off
echo Starting Process...
setlocal enabledelayedexpansion
set "errorlevel="

set TEST_TYPE=test
set WAIT_TIME=30
set ITERATIONS=5

set LANG=express


echo Preparing environment, executing init.cmd...
.\init.cmd
echo Environment prepared.

for /L %%i in (1,1,%ITERATIONS%) do (
    echo ===  RUN: %%i: %TEST_TYPE% ===

    set /a mod=%%i %% 2

    if !mod! EQU 0 (
        .\RUN.cmd express %TEST_TYPE%
        .\RUN.cmd fastapi %TEST_TYPE%
    ) else (
        .\RUN.cmd express %TEST_TYPE%
        .\RUN.cmd fastapi %TEST_TYPE%
    )

    echo Resetting environment...
    .\init.cmd
    echo Environment reset.

    echo ===  FINISHED: %%i: %TEST_TYPE% + %LANG% ===

    timeout /t %WAIT_TIME% >nul
)


echo === Finished %ITERATIONS%-Iterations run ===
endlocal