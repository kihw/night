#Requires -Version 5.1

<#
.SYNOPSIS
    Script d'installation simplifié pour NightMod
.DESCRIPTION
    Installation automatique de NightMod avec vérifications minimales
#>

[CmdletBinding()]
param(
    [switch]$SkipNodeCheck
)

$ErrorActionPreference = "Stop"

function Write-Step {
    param([string]$Message)
    Write-Host "🔄 $Message" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-CustomError {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Test-Command {
    param([string]$Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Vérifications de base
Write-Host "🌙 Installation de NightMod" -ForegroundColor Magenta

if (-not (Test-Path "package.json")) {
    Write-CustomError "Fichier package.json introuvable. Exécutez depuis le répertoire racine."
    exit 1
}

# Vérifier Node.js
if (-not $SkipNodeCheck) {
    Write-Step "Vérification de Node.js..."
    if (-not (Test-Command "node") -or -not (Test-Command "npm")) {
        Write-CustomError "Node.js et npm requis. Installez depuis https://nodejs.org"
        exit 1
    }
    Write-Success "Node.js et npm détectés"
}

# Installation des dépendances
Write-Step "Installation des dépendances..."
try {
    npm install
    Write-Success "Dépendances installées"
}
catch {
    Write-CustomError "Erreur installation dépendances: $_"
    exit 1
}

# Build
Write-Step "Build de l'application..."
try {
    npm run build-win
    Write-Success "Build terminé"
}
catch {
    Write-CustomError "Erreur de build: $_"
    exit 1
}

# Vérification finale
if (Test-Path "dist") {
    $files = Get-ChildItem dist -File | Select-Object Name, @{N = "SizeMB"; E = { [math]::Round($_.Length / 1MB, 1) } }
    Write-Success "Fichiers générés:"
    $files | ForEach-Object { Write-Host ("  📦 {0} ({1} MB)" -f $_.Name, $_.SizeMB) -ForegroundColor White }

}

Write-Success "Installation terminée! Lancez avec: npm start"
