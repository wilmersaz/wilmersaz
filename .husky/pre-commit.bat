@echo off
echo 🚀 Ejecutando verificaciones pre-commit...

:: 1. Auditoría de vulnerabilidades
echo 🚀 1. Auditoría de vulnerabilidades y corrección automática
npm audit --audit-level low --json > audit_check.tmp 2>nul
if %ERRORLEVEL% neq 0 echo {} > audit_check.tmp

:: Verificar si hay vulnerabilidades
findstr "vulnerabilities" audit_check.tmp >nul
if %ERRORLEVEL% equ 0 (
    echo 🔧 Intentando corregir automáticamente vulnerabilidades...
    npm audit fix --force
    echo ✅ Correcciones aplicadas.
) else (
    echo ✅ No se detectaron vulnerabilidades.
)

del audit_check.tmp 2>nul

:: 2. Dependencias desactualizadas
echo 🚀 2. Comprobando dependencias desactualizadas:
npm outdated

:: 3. Comprobación de tipos TypeScript
echo 🚀 3. Ejecutando comprobación de tipos de TypeScript...
npm run type-check
if %ERRORLEVEL% neq 0 (
    echo ❌ Errores de tipos detectados
    set "type_errors=1"
) else (
    echo ✅ Comprobación de tipos completada sin errores.
    set "type_errors=0"
)

:: 4. ESLint con autofix
echo 🚀 4. Ejecutando ESLint con autofix...
npm run lint:fix
if %ERRORLEVEL% neq 0 (
    echo ❌ Errores de ESLint detectados
    set "lint_errors=1"
) else (
    echo ✅ ESLint completado sin errores.
    set "lint_errors=0"
)

:: 5. Build check
echo 🚀 5. Verificando que el proyecto compila correctamente...
npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Errores de compilación detectados
    set "build_errors=1"
) else (
    echo ✅ Proyecto compila correctamente.
    set "build_errors=0"
)

:: Resumen final
echo.
echo 📋 =============== RESUMEN FINAL ===============

if "%type_errors%"=="1" (
    echo ❌ Errores de tipos TypeScript detectados
    set "has_errors=1"
)

if "%lint_errors%"=="1" (
    echo ❌ Errores de ESLint detectados
    set "has_errors=1"
)

if "%build_errors%"=="1" (
    echo ❌ Errores de compilación detectados
    set "has_errors=1"
)

if "%has_errors%"=="1" (
    echo ❌ SE REQUIERE ATENCIÓN ANTES DEL COMMIT
    echo Por favor, revisa y corrige los errores listados arriba
    echo ==============================================
    exit /b 1
) else (
    echo ✅ ¡TODAS LAS COMPROBACIONES CRÍTICAS PASARON!
    echo 🚀 ¡Listo para hacer commit!
    echo ==============================================
    exit /b 0
)
