# NightMod

Application de bureau intelligente pour Windows qui surveille votre activité et protège automatiquement votre ordinateur lorsque vous vous endormez.

## 🌟 Fonctionnalités

### Surveillance Intelligente
- **Vérifications périodiques** : Affiche une fenêtre de vérification à intervalles réguliers
- **Actions configurables** : Extinction complète, mise en veille, hibernation ou verrouillage d'écran
- **Interface de nuit** : Design sombre confortable pour une utilisation nocturne
- **Compte à rebours visuel** : Indicateur circulaire moderne avec animations

### Interface Utilisateur
- **Thème sombre moderne** : Interface élégante inspirée du Fluent Design
- **Icône dans la barre des tâches** : Contrôle discret depuis la zone de notification Windows
- **Notifications sonores** : Alertes audio configurables (avec support du silence)
- **Fenêtre de vérification élégante** : Design non-intrusif avec animations fluides

### Configuration Flexible
- **Intervalles personnalisables** : De 1 minute à plusieurs heures entre les vérifications
- **Temps de réponse ajustable** : De 10 secondes à 2 minutes pour répondre
- **Démarrage automatique** : Option pour lancer NightMod au démarrage de Windows
- **Minimisation intelligente** : Peut se réduire dans la barre des tâches

## 🚀 Installation sur Windows

### Prérequis
- Windows 10 ou Windows 11
- Node.js 18+ et npm (pour le développement)

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
# Build pour Windows (NSIS installer, portable, zip)
npm run build-win

# Les fichiers seront dans le dossier dist/
```

## 📦 Formats de distribution

L'application peut être buildée dans plusieurs formats Windows :
- **NSIS Installer** : Installateur Windows classique (.exe)
- **Portable** : Version portable sans installation
- **ZIP** : Archive compressée

## 🎮 Utilisation

1. **Lancer l'application** : NightMod apparaît dans la barre des tâches Windows
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
- **Action** : Extinction, veille, hibernation ou verrouillage
- **Son** : Activer/désactiver les notifications
- **Démarrage auto** : Lancer au démarrage de Windows
- **Minimisation** : Réduire dans la barre des tâches

### Actions système Windows
- **Extinction** : `shutdown /s /t 0`
- **Veille** : `rundll32.exe powrprof.dll,SetSuspendState 0,1,0`
- **Hibernation** : `shutdown /h`
- **Verrouillage** : `rundll32.exe user32.dll,LockWorkStation`

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
npm run build-win  # Build Windows uniquement
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
rmdir /s node_modules
del package-lock.json
npm install
```

**Erreurs de permissions :**
- Exécuter en tant qu'administrateur si nécessaire
- Vérifier les paramètres de sécurité Windows

**L'action ne fonctionne pas :**
- Vérifiez que votre utilisateur a les permissions pour les commandes système
- Certaines actions peuvent nécessiter des privilèges administrateur

## 🔒 Sécurité

NightMod utilise uniquement les API Windows standard pour :
- Éteindre l'ordinateur
- Mettre en veille/hibernation
- Verrouiller la session

Aucune donnée personnelle n'est collectée ou transmise.

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

## 🎯 Compatibilité

- **Windows 10** : Entièrement supporté
- **Windows 11** : Entièrement supporté
- **Windows 8.1** : Compatible (non testé)
- **Windows 7** : Non supporté