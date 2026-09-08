@echo off
setlocal

set TEST_INDEX=%1

if "%TEST_INDEX%"=="01" (
    set TEST_FILE=tests/examples/test_example_passed.spec.ts
) else if "%TEST_INDEX%"=="02" (
    set TEST_FILE=tests/examples/test_example_failed.spec.ts
) else (
    echo Invalid test index: %TEST_INDEX%. Valid values: 01, 02, ... more
    exit /b 1
)

cd ..
npx playwright test %TEST_FILE% --reporter=html,allure-playwright

endlocal