# Guide de Build - NightMod sur Windows

## Prérequis

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
npm config set prefix "%APPDATA%\npm"
# Ajouter %APPDATA%\npm à votre PATH
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