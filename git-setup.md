# Guide de Configuration Git pour NightMod

## Initialisation du dépôt Git

Si ce n'est pas déjà fait, initialisez le dépôt Git :

```bash
# Initialiser le dépôt
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit: NightMod project setup"

# Créer la branche main (si pas déjà fait)
git branch -M main
```

## Fusion des branches vers main

### Méthode 1: Script automatique (Linux/Mac)
```bash
# Rendre le script exécutable
chmod +x merge-branches.sh

# Exécuter le script
./merge-branches.sh
```

### Méthode 2: Script PowerShell (Windows)
```powershell
# Exécuter le script PowerShell
.\merge-branches.ps1

# Avec suppression automatique des branches
.\merge-branches.ps1 -DeleteBranches

# Mode force (pour éviter les confirmations)
.\merge-branches.ps1 -Force -DeleteBranches
```

### Méthode 3: Fusion manuelle

1. **Lister toutes les branches :**
```bash
git branch -a
```

2. **Basculer vers main :**
```bash
git checkout main
```

3. **Fusionner chaque branche :**
```bash
# Pour chaque branche (remplacer 'nom-branche' par le nom réel)
git merge nom-branche --no-ff -m "Merge branch 'nom-branche' into main"

# Supprimer la branche après fusion (optionnel)
git branch -d nom-branche
```

## Gestion des conflits

Si des conflits surviennent lors de la fusion :

1. **Identifier les fichiers en conflit :**
```bash
git status
```

2. **Résoudre les conflits manuellement** dans chaque fichier marqué

3. **Marquer les conflits comme résolus :**
```bash
git add fichier-resolu.js
```

4. **Finaliser la fusion :**
```bash
git commit
```

## Commandes Git utiles

### Vérification de l'état
```bash
# État du dépôt
git status

# Historique des commits
git log --oneline --graph --all

# Différences entre branches
git diff main..nom-branche
```

### Gestion des branches
```bash
# Lister toutes les branches
git branch -a

# Créer une nouvelle branche
git checkout -b nouvelle-branche

# Supprimer une branche
git branch -d nom-branche

# Supprimer une branche de force
git branch -D nom-branche
```

### Synchronisation avec remote
```bash
# Ajouter un remote (GitHub, GitLab, etc.)
git remote add origin https://github.com/username/nightmod.git

# Pousser vers le remote
git push -u origin main

# Récupérer les changements
git pull origin main
```

## Structure recommandée des branches

Pour les futurs développements, voici une structure recommandée :

- **main** : Branche principale stable
- **develop** : Branche de développement
- **feature/nom-fonctionnalite** : Branches pour nouvelles fonctionnalités
- **hotfix/nom-correction** : Branches pour corrections urgentes
- **release/version** : Branches pour préparer les releases

## Exemple de workflow

```bash
# Créer une branche pour une nouvelle fonctionnalité
git checkout -b feature/nouvelle-interface
# ... développement ...
git add .
git commit -m "Add new interface design"

# Retourner sur main et fusionner
git checkout main
git merge feature/nouvelle-interface --no-ff
git branch -d feature/nouvelle-interface

# Pousser vers le remote
git push origin main
```

## Bonnes pratiques

1. **Commits fréquents** avec messages descriptifs
2. **Branches thématiques** pour chaque fonctionnalité
3. **Fusion avec --no-ff** pour garder l'historique des branches
4. **Tests** avant chaque fusion vers main
5. **Tags** pour marquer les versions importantes

```bash
# Créer un tag pour une version
git tag -a v1.0.1 -m "Version 1.0.1 - Bug fixes"
git push origin v1.0.1
```