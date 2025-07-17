@echo off
echo Executing RUN BOTH...


set TEST_TYPE=%1
set LANG_1=%2
set LANG_2=%3

set WAIT_TIME=45

call .\RUN.cmd %TEST_TYPE% %LANG_1% 
@REM timeout /t %WAIT_TIME% >nul
call .\RUN.cmd %TEST_TYPE% %LANG_2%


echo === RUN BOTH ===