#!/bin/bash

# Script d'installation pour NightMod sur Fedora
echo "🌙 Installation de NightMod..."

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "📦 Installation de Node.js..."
    sudo dnf install -y nodejs npm
fi

# Vérifier si les outils de développement sont installés
if ! rpm -qa | grep -q "gcc"; then
    echo "🔧 Installation des outils de développement..."
    sudo dnf groupinstall -y "Development Tools"
    sudo dnf install -y python3-devel
fi

# Installer les dépendances
echo "📥 Installation des dépendances..."
npm install

# Build de l'application
echo "🏗️ Build de l'application..."
npm run build-linux

echo "✅ Installation terminée !"
echo ""
echo "🚀 Pour lancer NightMod :"
echo "   npm start"
echo ""
echo "📦 Les packages sont disponibles dans le dossier dist/ :"
echo "   - nightmod-*.AppImage (portable)"
echo "   - nightmod-*.rpm (pour Fedora)"
echo ""
echo "💡 Pour installer le RPM :"
echo "   sudo dnf install dist/nightmod-*.rpm"