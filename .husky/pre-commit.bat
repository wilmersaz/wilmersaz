@echo off
setlocal EnableDelayedExpansion
echo 🚀 Ejecutando verificaciones pre-commit...

:: Variables para contadores
set "outdated_count=0"
set "type_error_count=0"
set "lint_error_count=0"
set "vulnerabilities_count=0"

:: 0. Actualización de Browserslist
echo 🚀 0. Verificando y actualizando Browserslist...
npx update-browserslist-db@latest --silent 2>nul
if %ERRORLEVEL% equ 0 (
    echo ✅ Browserslist actualizado correctamente.
) else (
    echo ⚠️  Advertencia: No se pudo actualizar Browserslist automáticamente.
)

:: 1. Auditoría de vulnerabilidades
echo 🚀 1. Auditoría de vulnerabilidades y corrección automática
npm audit --audit-level low 2>nul | findstr /C:"vulnerabilities" > audit_result.tmp
if exist audit_result.tmp (
    for /f "tokens=1" %%a in (audit_result.tmp) do (
        if "%%a" neq "found" if "%%a" neq "0" (
            set "vulnerabilities_count=%%a"
            echo 🔧 Intentando corregir automáticamente vulnerabilidades...
            npm audit fix --silent 2>nul
            echo ✅ Correcciones aplicadas.
        )
    )
) else (
    echo ✅ No se detectaron vulnerabilidades.
)
if exist audit_result.tmp del audit_result.tmp 2>nul

:: 2. Dependencias desactualizadas
echo 🚀 2. Comprobando dependencias desactualizadas:
npm outdated 2>nul | findstr /V "Package" | findstr /V "^$" > outdated_check.tmp 2>nul
if exist outdated_check.tmp (
    for /f %%i in ('findstr /R /N "^" outdated_check.tmp ^| find /C ":"') do set outdated_count=%%i
    if !outdated_count! gtr 0 (
        npm outdated
        echo 🔔 Total de dependencias desactualizadas: !outdated_count!
    ) else (
        echo ✅ Todas las dependencias están actualizadas.
    )
) else (
    echo ✅ Todas las dependencias están actualizadas.
)
if exist outdated_check.tmp del outdated_check.tmp 2>nul

:: 3. Comprobación de tipos TypeScript
echo 🚀 3. Ejecutando comprobación de tipos de TypeScript...
npm run type-check 2>type_errors.tmp
set "type_exit_code=%ERRORLEVEL%"
if exist type_errors.tmp (
    for /f %%i in ('findstr /C:"error TS" type_errors.tmp ^| find /C "error TS"') do set type_error_count=%%i
)
if %type_exit_code% neq 0 (
    if !type_error_count! gtr 0 (
        type type_errors.tmp
        echo 🔔 Total de errores de tipo: !type_error_count!. Se recomienda corregirlos previamente.
    ) else (
        echo ❌ Errores de tipos detectados
    )
    set "has_type_errors=1"
) else (
    echo ✅ Comprobación de tipos completada sin errores.
    set "has_type_errors=0"
)
if exist type_errors.tmp del type_errors.tmp 2>nul

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

:: 4. ESLint con autofix en los archivos preparados
echo 🚀 4. Ejecutando ESLint con autofix en los archivos preparados...
npm run lint:fix 2>lint_errors.tmp
set "lint_exit_code=%ERRORLEVEL%"
if exist lint_errors.tmp (
    for /f %%i in ('findstr /C:"error" lint_errors.tmp ^| find /C "error"') do set lint_error_count=%%i
)
if %lint_exit_code% neq 0 (
    if !lint_error_count! gtr 0 (
        type lint_errors.tmp
        echo ⚠️  Se encontraron !lint_error_count! errores de ESLint detectados, se recomienda corregirlos previamente.
    ) else (
        echo ❌ Errores de ESLint detectados
    )
    set "has_lint_errors=1"
) else (
    echo ✅ ESLint completado sin errores.
    set "has_lint_errors=0"
)
if exist lint_errors.tmp del lint_errors.tmp 2>nul

:: 5. Build check
echo 🚀 5. Verificando que el proyecto compila correctamente...
npm run build 2>build_errors.tmp
set "build_exit_code=%ERRORLEVEL%"
if %build_exit_code% neq 0 (
    if exist build_errors.tmp type build_errors.tmp
    echo ❌ Errores de compilación detectados
    set "has_build_errors=1"
) else (
    echo ✅ Proyecto compila correctamente.
    set "has_build_errors=0"
)
if exist build_errors.tmp del build_errors.tmp 2>nul

:: Habilitamos variables de entorno
setlocal EnableDelayedExpansion

:: Resumen final
echo.
echo 📋 =============== RESUMEN FINAL ===============

:: Variables de control
set "has_critical_errors=0"

if !outdated_count! gtr 0 (
    echo 🟡 Dependencias desactualizadas: !outdated_count! ^(informativo^)
)

if "!has_type_errors!"=="1" (
    if !type_error_count! gtr 0 (
        echo 🔴 Errores de tipos TypeScript: !type_error_count!
    ) else (
        echo 🔴 Errores de tipos TypeScript detectados
    )
    set "has_critical_errors=1"
)

if "!has_lint_errors!"=="1" (
    if !lint_error_count! gtr 0 (
        echo 🔴 Errores de ESLint: !lint_error_count!
    ) else (
        echo 🔴 Errores de ESLint detectados
    )
    set "has_critical_errors=1"
)

if "!has_build_errors!"=="1" (
    echo 🔴 Errores de compilación detectados
    set "has_critical_errors=1"
)

echo ==============================================

if "!has_critical_errors!"=="1" (
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
