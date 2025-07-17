@echo off
echo Executing RUN BOTH...


set TEST_TYPE=%1
set LANG_1=%2
set LANG_2=%3

set WAIT_TIME=30

.\RUN.cmd %LANG_1% %TEST_TYPE%
timeout /t %WAIT_TIME% >nul
.\RUN.cmd %LANG_2% %TEST_TYPE%


echo === RUN BOTH ===