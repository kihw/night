#Requires -Version 5.1

<#
.SYNOPSIS
    Script d'installation pour NightMod sur Windows
.DESCRIPTION
    Ce script installe automatiquement NightMod et ses dépendances sur Windows.
    Il vérifie les prérequis, installe Node.js si nécessaire, et build l'application.
.PARAMETER SkipNodeInstall
    Ignore l'installation automatique de Node.js
.PARAMETER BuildOnly
    Effectue uniquement le build sans vérifier les dépendances
.PARAMETER Verbose
    Affiche des informations détaillées pendant l'installation
.EXAMPLE
    .\install.ps1
    Installation complète avec vérification automatique
.EXAMPLE
    .\install.ps1 -SkipNodeInstall
    Installation en ignorant l'installation de Node.js
#>

[CmdletBinding()]
param(
    [switch]$SkipNodeInstall,
    [switch]$BuildOnly,
    [switch]$Verbose
)

# Configuration
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

# Couleurs pour l'affichage
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    
    $colorMap = @{
        "Red" = [ConsoleColor]::Red
        "Green" = [ConsoleColor]::Green
        "Yellow" = [ConsoleColor]::Yellow
        "Blue" = [ConsoleColor]::Blue
        "Cyan" = [ConsoleColor]::Cyan
        "Magenta" = [ConsoleColor]::Magenta
        "White" = [ConsoleColor]::White
    }
    
    Write-Host $Message -ForegroundColor $colorMap[$Color]
}

function Write-Step {
    param([string]$Message)
    Write-ColorOutput "🔄 $Message" "Cyan"
}

function Write-Success {
    param([string]$Message)
    Write-ColorOutput "✅ $Message" "Green"
}

function Write-Error {
    param([string]$Message)
    Write-ColorOutput "❌ $Message" "Red"
}

function Write-Warning {
    param([string]$Message)
    Write-ColorOutput "⚠️  $Message" "Yellow"
}

function Write-Info {
    param([string]$Message)
    Write-ColorOutput "ℹ️  $Message" "Blue"
}

# Fonction pour vérifier si un programme est installé
function Test-ProgramInstalled {
    param([string]$ProgramName)
    
    try {
        $null = Get-Command $ProgramName -ErrorAction Stop
        return $true
    }
    catch {
        return $false
    }
}

# Fonction pour installer Node.js via Chocolatey
function Install-NodeJS {
    Write-Step "Installation de Node.js..."
    
    # Vérifier si Chocolatey est installé
    if (Test-ProgramInstalled "choco") {
        Write-Info "Installation de Node.js via Chocolatey..."
        try {
            choco install nodejs -y
            Write-Success "Node.js installé via Chocolatey"
            return $true
        }
        catch {
            Write-Warning "Échec de l'installation via Chocolatey: $($_.Exception.Message)"
        }
    }
    
    # Vérifier si Scoop est installé
    if (Test-ProgramInstalled "scoop") {
        Write-Info "Installation de Node.js via Scoop..."
        try {
            scoop install nodejs
            Write-Success "Node.js installé via Scoop"
            return $true
        }
        catch {
            Write-Warning "Échec de l'installation via Scoop: $($_.Exception.Message)"
        }
    }
    
    # Installation manuelle
    Write-Info "Téléchargement de Node.js depuis le site officiel..."
    try {
        $nodeVersion = "18.19.0"
        $architecture = if ([Environment]::Is64BitOperatingSystem) { "x64" } else { "x86" }
        $downloadUrl = "https://nodejs.org/dist/v$nodeVersion/node-v$nodeVersion-$architecture.msi"
        $tempFile = "$env:TEMP\nodejs-installer.msi"
        
        Write-Info "Téléchargement depuis: $downloadUrl"
        Invoke-WebRequest -Uri $downloadUrl -OutFile $tempFile -UseBasicParsing
        
        Write-Info "Installation de Node.js..."
        Start-Process -FilePath "msiexec.exe" -ArgumentList "/i", $tempFile, "/quiet", "/norestart" -Wait
        
        # Nettoyer le fichier temporaire
        Remove-Item $tempFile -Force -ErrorAction SilentlyContinue
        
        # Actualiser les variables d'environnement
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
        
        Write-Success "Node.js installé manuellement"
        return $true
    }
    catch {
        Write-Error "Échec de l'installation manuelle: $($_.Exception.Message)"
        return $false
    }
}

# Fonction principale
function Main {
    Write-ColorOutput @"
🌙 ================================
   Installation de NightMod
   Protection nocturne pour Windows
================================
"@ "Magenta"

    try {
        # Vérifier les permissions
        $currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
        $isAdmin = $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
        
        if (-not $isAdmin) {
            Write-Warning "Ce script n'est pas exécuté en tant qu'administrateur."
            Write-Info "Certaines fonctionnalités peuvent nécessiter des privilèges élevés."
        }

        # Vérifier si on est dans le bon répertoire
        if (-not (Test-Path "package.json")) {
            Write-Error "Le fichier package.json n'a pas été trouvé."
            Write-Info "Assurez-vous d'exécuter ce script depuis le répertoire racine de NightMod."
            exit 1
        }

        # Étape 1: Vérifier Node.js
        if (-not $BuildOnly) {
            Write-Step "Vérification de Node.js..."
            
            if (Test-ProgramInstalled "node") {
                $nodeVersion = node --version
                Write-Success "Node.js détecté: $nodeVersion"
                
                if (Test-ProgramInstalled "npm") {
                    $npmVersion = npm --version
                    Write-Success "npm détecté: v$npmVersion"
                }
                else {
                    Write-Error "npm n'est pas disponible"
                    exit 1
                }
            }
            elseif (-not $SkipNodeInstall) {
                Write-Warning "Node.js n'est pas installé"
                $install = Read-Host "Voulez-vous installer Node.js automatiquement? (O/n)"
                
                if ($install -eq "" -or $install -eq "O" -or $install -eq "o" -or $install -eq "Y" -or $install -eq "y") {
                    if (-not (Install-NodeJS)) {
                        Write-Error "Impossible d'installer Node.js automatiquement"
                        Write-Info "Veuillez installer Node.js manuellement depuis https://nodejs.org"
                        exit 1
                    }
                    
                    # Vérifier l'installation
                    if (-not (Test-ProgramInstalled "node")) {
                        Write-Error "Node.js n'a pas été installé correctement"
                        Write-Info "Redémarrez PowerShell et réessayez"
                        exit 1
                    }
                }
                else {
                    Write-Info "Installation annulée. Installez Node.js manuellement et relancez ce script."
                    exit 0
                }
            }
            else {
                Write-Error "Node.js requis mais installation ignorée (--SkipNodeInstall)"
                exit 1
            }
        }

        # Étape 2: Vérifier les outils de build Windows
        Write-Step "Vérification des outils de build..."
        
        # Vérifier Visual Studio Build Tools ou Visual Studio
        $hasBuildTools = $false
        
        # Chercher Visual Studio Build Tools
        $vswhere = "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe"
        if (Test-Path $vswhere) {
            $vsInstances = & $vswhere -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -format json | ConvertFrom-Json
            if ($vsInstances.Count -gt 0) {
                $hasBuildTools = $true
                Write-Success "Visual Studio Build Tools détectés"
            }
        }
        
        if (-not $hasBuildTools) {
            Write-Warning "Visual Studio Build Tools non détectés"
            Write-Info "Certains modules natifs pourraient ne pas se compiler correctement"
            Write-Info "Vous pouvez installer les Build Tools depuis:"
            Write-Info "https://visualstudio.microsoft.com/visual-cpp-build-tools/"
        }

        # Étape 3: Installation des dépendances
        Write-Step "Installation des dépendances npm..."
        
        try {
            npm install
            Write-Success "Dépendances installées avec succès"
        }
        catch {
            Write-Error "Erreur lors de l'installation des dépendances: $($_.Exception.Message)"
            Write-Info "Essayez de supprimer node_modules et package-lock.json puis relancez"
            exit 1
        }

        # Étape 4: Build de l'application
        Write-Step "Build de l'application pour Windows..."
        
        try {
            npm run build-win
            Write-Success "Build terminé avec succès"
        }
        catch {
            Write-Error "Erreur lors du build: $($_.Exception.Message)"
            exit 1
        }

        # Étape 5: Vérifier les fichiers générés
        Write-Step "Vérification des fichiers générés..."
        
        $distPath = "dist"
        if (Test-Path $distPath) {
            $files = Get-ChildItem $distPath -File
            Write-Success "Fichiers générés dans le dossier dist:"
            
            foreach ($file in $files) {
                $size = [math]::Round($file.Length / 1MB, 2)
                Write-Info "  📦 $($file.Name) ($size MB)"
            }
        }
        else {
            Write-Warning "Le dossier dist n'a pas été créé"
        }

        # Étape 6: Instructions finales
        Write-ColorOutput @"

🎉 ================================
   Installation terminée !
================================

🚀 Pour lancer NightMod en développement :
   npm start

📦 Packages Windows disponibles dans dist\ :
   • NightMod Setup 1.0.0.exe (installateur NSIS)
   • NightMod-1.0.0-portable.exe (version portable)
   • NightMod-1.0.0-win.zip (archive ZIP)

💡 Pour installer l'application :
   Double-cliquez sur "NightMod Setup 1.0.0.exe"

🔧 Commandes utiles :
   npm run dev        # Mode développement
   npm run build-win  # Rebuild pour Windows
   npm run pack       # Empaqueter sans installer

📚 Documentation complète dans BUILD.md et README.md

"@ "Green"

        Write-Success "Installation de NightMod terminée avec succès !"
        
    }
    catch {
        Write-Error "Erreur inattendue: $($_.Exception.Message)"
        Write-Info "Stack trace: $($_.Exception.StackTrace)"
        exit 1
    }
}

# Point d'entrée
if ($MyInvocation.InvocationName -ne '.') {
    Main
}