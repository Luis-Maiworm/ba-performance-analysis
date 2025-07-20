@echo off
echo === run_tests.cmd: Testing Both Frameworks ===


set TEST_TYPE=%1
set LANG_1=%2
set LANG_2=%3


call .\RUN.cmd %TEST_TYPE% %LANG_1% 
call .\RUN.cmd %TEST_TYPE% %LANG_2%


echo === run_tests.cmd: Testing Finished ===