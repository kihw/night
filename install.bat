@echo off
echo 🌙 Installation de NightMod pour Windows...

REM Vérifier si Node.js est installé
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js n'est pas installé
    echo 📦 Veuillez installer Node.js depuis https://nodejs.org
    echo    ou utiliser Chocolatey: choco install nodejs
    pause
    exit /b 1
)

REM Vérifier si npm est disponible
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm n'est pas disponible
    pause
    exit /b 1
)

echo ✅ Node.js et npm détectés

REM Installer les dépendances
echo 📥 Installation des dépendances...
npm install
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'installation des dépendances
    pause
    exit /b 1
)

REM Build de l'application
echo 🏗️ Build de l'application pour Windows...
npm run build-win
if %errorlevel% neq 0 (
    echo ❌ Erreur lors du build
    pause
    exit /b 1
)

echo ✅ Installation terminée !
echo.
echo 🚀 Pour lancer NightMod :
echo    npm start
echo.
echo 📦 Les packages Windows sont disponibles dans le dossier dist\ :
echo    - NightMod Setup 1.0.0.exe (installateur)
echo    - NightMod-1.0.0-portable.exe (portable)
echo    - NightMod-1.0.0-win.zip (archive)
echo.
echo 💡 Pour installer l'application :
echo    Double-cliquez sur "NightMod Setup 1.0.0.exe"
echo.
pause