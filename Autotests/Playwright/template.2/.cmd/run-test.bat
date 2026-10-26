@echo off
setlocal

set TEST_INDEX=%1

if "%TEST_INDEX%"=="01" (
    set TEST_FILE=tests/test.spec.ts
) else if "%TEST_INDEX%"=="02" (
    set TEST_FILE=tests/test.pattern.spec.ts
) else if "%TEST_INDEX%"=="03" (
    set TEST_FILE=tests/snapshot.spec.ts
) else (
    echo Invalid test index: %TEST_INDEX%. Valid values: 01, 02, ... more
    exit /b 1
)

cd ..
npx playwright test %TEST_FILE% --headed

endlocal