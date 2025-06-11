# NightMod

Application de bureau intelligente qui surveille votre activité et protège automatiquement votre ordinateur lorsque vous vous endormez.

## 🌟 Fonctionnalités

### Surveillance Intelligente
- **Vérifications périodiques** : Affiche une fenêtre de vérification à intervalles réguliers
- **Actions configurables** : Extinction complète, mise en veille ou verrouillage d'écran
- **Interface de nuit** : Design sombre confortable pour une utilisation nocturne
- **Compte à rebours visuel** : Indicateur circulaire moderne avec animations

### Interface Utilisateur
- **Thème sombre moderne** : Interface élégante inspirée du Fluent Design
- **Icône dans la barre des tâches** : Contrôle discret depuis la zone de notification
- **Notifications sonores** : Alertes audio configurables (avec support du silence)
- **Fenêtre de vérification élégante** : Design non-intrusif avec animations fluides

### Configuration Flexible
- **Intervalles personnalisables** : De 1 minute à plusieurs heures entre les vérifications
- **Temps de réponse ajustable** : De 10 secondes à 2 minutes pour répondre
- **Démarrage automatique** : Option pour lancer NightMod au démarrage du système
- **Minimisation intelligente** : Peut se réduire dans la barre des tâches

## 🚀 Installation sur Fedora

### Prérequis
```bash
# Installer Node.js et npm
sudo dnf install nodejs npm

# Installer les outils de développement
sudo dnf groupinstall "Development Tools"
sudo dnf install python3-devel
```

### Installation depuis les sources
```bash
# Cloner le projet
git clone <votre-repo>
cd nightmod

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Ou lancer l'application
npm start
```

### Build de l'application
```bash
# Build pour Linux (AppImage, DEB, RPM)
npm run build-linux

# Les fichiers seront dans le dossier dist/
```

## 📦 Formats de distribution

L'application peut être buildée dans plusieurs formats :
- **AppImage** : Portable, fonctionne sur toutes les distributions
- **DEB** : Pour Debian/Ubuntu
- **RPM** : Pour Fedora/RHEL/openSUSE

## 🎮 Utilisation

1. **Lancer l'application** : NightMod apparaît dans la barre des tâches
2. **Configurer** : Ajustez l'intervalle, le temps de réponse et l'action
3. **Démarrer** : Cliquez sur "Démarrer surveillance"
4. **Répondre** : Quand la fenêtre apparaît, cliquez "Je suis éveillé !"

### Raccourcis clavier
- **Entrée/Espace** : Répondre à la vérification
- **Échap** : Fermer la fenêtre (équivaut à ne pas répondre)
- **Ctrl+Q** : Quitter l'application

## ⚙️ Configuration

### Paramètres disponibles
- **Intervalle** : 1 min à 2 heures
- **Temps de réponse** : 10 secondes à 2 minutes
- **Action** : Extinction, veille ou verrouillage
- **Son** : Activer/désactiver les notifications
- **Démarrage auto** : Lancer au démarrage du système
- **Minimisation** : Réduire dans la barre des tâches

### Actions système
- **Extinction** : `shutdown -h now`
- **Veille** : `systemctl suspend`
- **Verrouillage** : `loginctl lock-session`

## 🔧 Développement

### Structure du projet
```
nightmod/
├── src/
│   ├── main.js              # Processus principal Electron
│   ├── renderer.js          # Interface principale
│   ├── check-renderer.js    # Fenêtre de vérification
│   ├── index.html           # Interface principale
│   ├── check.html           # Fenêtre de vérification
│   ├── styles.css           # Styles principaux
│   └── check-styles.css     # Styles de vérification
├── assets/
│   ├── icon.png             # Icône principale
│   └── tray-icon.png        # Icône barre des tâches
└── package.json
```

### Scripts disponibles
```bash
npm start          # Lancer l'application
npm run dev        # Mode développement
npm run build      # Build toutes plateformes
npm run build-linux # Build Linux uniquement
npm run pack       # Empaqueter sans installer
```

## 🐛 Dépannage

### Problèmes courants

**L'application ne se lance pas :**
```bash
# Vérifier Node.js
node --version
npm --version

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

**Erreurs de permissions :**
```bash
# Donner les permissions d'exécution
chmod +x dist/nightmod-*.AppImage
```

**L'action ne fonctionne pas :**
- Vérifiez que votre utilisateur a les permissions pour les commandes système
- Pour `systemctl suspend`, vous pourriez avoir besoin de configurer polkit

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des fonctionnalités
- Soumettre des pull requests

## 📞 Support

- **Issues** : Utilisez GitHub Issues pour signaler des problèmes
- **Discussions** : GitHub Discussions pour les questions générales