# Guide de Build - NightMod sur Fedora

## Prérequis

Installez Node.js et npm :
```bash
# Méthode 1: Via DNF (recommandée)
sudo dnf install nodejs npm

# Méthode 2: Via NodeSource (version plus récente)
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo dnf install nodejs
```

Vérifiez l'installation :
```bash
node --version
npm --version
```

## Build du site web

1. **Cloner le projet** (si pas déjà fait) :
```bash
git clone <votre-repo>
cd nightmod-website
```

2. **Installer les dépendances** :
```bash
npm install
```

3. **Développement local** :
```bash
npm run dev
```
Le site sera accessible sur `http://localhost:5173`

4. **Build de production** :
```bash
npm run build
```
Les fichiers optimisés seront dans le dossier `dist/`

5. **Prévisualiser le build** :
```bash
npm run preview
```

## Déploiement

### Option 1: Serveur web local
```bash
# Installer un serveur HTTP simple
sudo dnf install python3
cd dist
python3 -m http.server 8080
```

### Option 2: Nginx
```bash
# Installer Nginx
sudo dnf install nginx

# Copier les fichiers
sudo cp -r dist/* /var/www/html/

# Démarrer Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Option 3: Apache
```bash
# Installer Apache
sudo dnf install httpd

# Copier les fichiers
sudo cp -r dist/* /var/www/html/

# Démarrer Apache
sudo systemctl start httpd
sudo systemctl enable httpd
```

## Dépannage

### Erreur de permissions Node.js
```bash
# Configurer npm pour éviter sudo
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Erreur de mémoire lors du build
```bash
# Augmenter la limite de mémoire Node.js
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Port déjà utilisé
```bash
# Utiliser un port différent
npm run dev -- --port 3000
```

## Structure du projet après build

```
dist/
├── index.html          # Page principale
├── assets/
│   ├── index-[hash].js # JavaScript optimisé
│   └── index-[hash].css # CSS optimisé
└── vite.svg           # Favicon
```

## Commandes utiles

```bash
# Nettoyer les dépendances
rm -rf node_modules package-lock.json
npm install

# Analyser la taille du bundle
npm run build -- --analyze

# Linter le code
npm run lint

# Build avec mode de développement
npm run build -- --mode development
```