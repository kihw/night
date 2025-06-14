# Guide de Build - NightMod sur Windows

## Installation rapide

**Méthode recommandée** : Utilisez le script PowerShell d'installation automatique :

```powershell
# Exécuter le script d'installation
.\install.ps1

# Ou avec des options spécifiques
.\install.ps1 -Verbose                    # Affichage détaillé
.\install.ps1 -SkipNodeInstall           # Ignorer l'installation de Node.js
.\install.ps1 -BuildOnly                 # Build uniquement
```

Le script d'installation se charge automatiquement de :
- ✅ Vérifier et installer Node.js si nécessaire
- ✅ Installer les dépendances npm
- ✅ Vérifier les outils de build Windows
- ✅ Builder l'application pour Windows
- ✅ Générer tous les packages (NSIS, portable, ZIP)

## Installation manuelle

### Prérequis

Installez Node.js et npm :
```powershell
# Méthode 1: Via Chocolatey (recommandée)
choco install nodejs

# Méthode 2: Via Scoop
scoop install nodejs

# Méthode 3: Télécharger depuis nodejs.org
# Aller sur https://nodejs.org et télécharger la version LTS
```

Vérifiez l'installation :
```powershell
node --version
npm --version
```

### Outils de build Windows (optionnel)
Pour compiler les modules natifs :
```powershell
# Installer Visual Studio Build Tools
# Télécharger depuis: https://visualstudio.microsoft.com/visual-cpp-build-tools/

# Ou installer Visual Studio Community avec les outils C++
```

## Build du site web

1. **Cloner le projet** (si pas déjà fait) :
```powershell
git clone <votre-repo>
cd nightmod-website
```

2. **Installer les dépendances** :
```powershell
npm install
```

3. **Développement local** :
```powershell
npm run dev
```
Le site sera accessible sur `http://localhost:5173`

4. **Build de production** :
```powershell
npm run build
```
Les fichiers optimisés seront dans le dossier `dist/`

5. **Prévisualiser le build** :
```powershell
npm run preview
```

## Build de l'application Electron

### Build pour Windows
```powershell
# Build complet Windows (NSIS + Portable + ZIP)
npm run build-win

# Build spécifique
npx electron-builder --win --x64
npx electron-builder --win --ia32
```

### Types de packages générés
- **NSIS Installer** : `NightMod Setup 1.0.0.exe`
- **Portable** : `NightMod-1.0.0-portable.exe`
- **ZIP** : `NightMod-1.0.0-win.zip`

## Déploiement

### Option 1: Serveur web local (pour le site)
```powershell
# Installer un serveur HTTP simple
npm install -g http-server
cd dist
http-server -p 8080
```

### Option 2: IIS (Internet Information Services)
```powershell
# Activer IIS via PowerShell (en tant qu'administrateur)
Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerRole, IIS-WebServer, IIS-CommonHttpFeatures, IIS-HttpErrors, IIS-HttpLogging, IIS-HttpRedirect, IIS-ApplicationDevelopment, IIS-NetFxExtensibility45, IIS-HealthAndDiagnostics, IIS-HttpCompressionStatic, IIS-Security, IIS-RequestFiltering, IIS-StaticContent, IIS-DefaultDocument, IIS-DirectoryBrowsing

# Copier les fichiers
Copy-Item -Path "dist\*" -Destination "C:\inetpub\wwwroot\" -Recurse -Force
```

### Option 3: Apache (via XAMPP)
```powershell
# Télécharger et installer XAMPP
# https://www.apachefriends.org/download.html

# Copier les fichiers
Copy-Item -Path "dist\*" -Destination "C:\xampp\htdocs\" -Recurse -Force
```

## Distribution de l'application

### Signature de code (optionnel)
```powershell
# Obtenir un certificat de signature de code
# Configurer dans package.json :
"win": {
  "certificateFile": "path/to/certificate.p12",
  "certificatePassword": "password"
}
```

### Publication
```powershell
# Build et publier (nécessite configuration)
npm run dist
```

## Dépannage

### Erreur de permissions Node.js
```powershell
# Configurer npm pour éviter les erreurs de permissions
npm config set prefix "$env:APPDATA\npm"
# Ajouter $env:APPDATA\npm à votre PATH
```

### Erreur de mémoire lors du build
```powershell
# Augmenter la limite de mémoire Node.js
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Port déjà utilisé
```powershell
# Utiliser un port différent
npm run dev -- --port 3000
```

### Erreurs de build Electron
```powershell
# Nettoyer le cache Electron
npx electron-builder clean

# Réinstaller les dépendances natives
npm run postinstall
```

### Problèmes avec Windows Defender
```powershell
# Ajouter une exception pour le dossier du projet
Add-MpPreference -ExclusionPath "C:\chemin\vers\nightmod"
```

### Erreurs de compilation native
```powershell
# Installer les outils de build Windows
npm install -g windows-build-tools

# Ou installer manuellement Visual Studio Build Tools
# https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

### Script PowerShell bloqué
```powershell
# Changer la politique d'exécution (temporairement)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Débloquer le script si nécessaire
Unblock-File .\install.ps1
```

## Structure du projet après build

```
dist/
├── win-unpacked/           # Version non empaquetée
├── NightMod Setup 1.0.0.exe # Installateur NSIS
├── NightMod-1.0.0-portable.exe # Version portable
├── NightMod-1.0.0-win.zip  # Archive ZIP
└── latest.yml              # Métadonnées de mise à jour
```

## Commandes utiles

```powershell
# Nettoyer les dépendances
Remove-Item -Path "node_modules" -Recurse -Force
Remove-Item -Path "package-lock.json" -Force
npm install

# Analyser la taille du bundle
npm run build -- --analyze

# Linter le code
npm run lint

# Build avec mode de développement
npm run build -- --mode development

# Vérifier les vulnérabilités
npm audit
npm audit fix

# Mettre à jour les dépendances
npm update
```

## Configuration Windows spécifique

### Variables d'environnement
```powershell
# Définir des variables d'environnement pour le build
$env:ELECTRON_CACHE = "C:\temp\electron-cache"
$env:ELECTRON_BUILDER_CACHE = "C:\temp\electron-builder-cache"
```

### Optimisations
```powershell
# Désactiver Windows Defender temporairement pour le build
# (uniquement si nécessaire et en connaissance de cause)
Set-MpPreference -DisableRealtimeMonitoring $true
# Réactiver après le build
Set-MpPreference -DisableRealtimeMonitoring $false
```

## Automatisation avec PowerShell

### Script de build automatisé
```powershell
# Créer un script de build personnalisé
function Build-NightMod {
    param(
        [switch]$Clean,
        [switch]$Verbose
    )
    
    if ($Clean) {
        Remove-Item -Path "node_modules", "dist" -Recurse -Force -ErrorAction SilentlyContinue
    }
    
    npm install
    npm run build-win
    
    if ($Verbose) {
        Get-ChildItem "dist" -File | ForEach-Object {
            Write-Host "$($_.Name) - $([math]::Round($_.Length / 1MB, 2)) MB"
        }
    }
}
```

### Déploiement automatisé
```powershell
# Script pour déployer automatiquement
function Deploy-NightMod {
    param(
        [string]$TargetPath = "C:\Deploy\NightMod"
    )
    
    if (-not (Test-Path $TargetPath)) {
        New-Item -Path $TargetPath -ItemType Directory -Force
    }
    
    Copy-Item -Path "dist\*" -Destination $TargetPath -Recurse -Force
    Write-Host "Déployé vers: $TargetPath"
}
```