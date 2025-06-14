#!/bin/bash

# Script pour fusionner toutes les branches vers main
# Assurez-vous d'être dans le répertoire racine du projet

echo "🔄 Début de la fusion des branches vers main..."

# Vérifier si on est dans un repo Git
if [ ! -d ".git" ]; then
    echo "❌ Erreur: Ce répertoire n'est pas un dépôt Git"
    echo "Initialisez d'abord un dépôt avec: git init"
    exit 1
fi

# Sauvegarder la branche actuelle
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Branche actuelle: $CURRENT_BRANCH"

# Aller sur la branche main
echo "🔄 Basculement vers la branche main..."
git checkout main 2>/dev/null || git checkout -b main

# Récupérer toutes les branches (locales et distantes)
echo "📋 Récupération de toutes les branches..."
git fetch --all 2>/dev/null || echo "⚠️  Pas de remote configuré"

# Lister toutes les branches locales (sauf main)
BRANCHES=$(git branch | grep -v "main" | grep -v "^\*" | sed 's/^[ \t]*//')

if [ -z "$BRANCHES" ]; then
    echo "ℹ️  Aucune branche à fusionner (seule main existe)"
    exit 0
fi

echo "📋 Branches à fusionner:"
echo "$BRANCHES" | sed 's/^/  - /'

# Fusionner chaque branche
for branch in $BRANCHES; do
    echo ""
    echo "🔄 Fusion de la branche: $branch"
    
    # Vérifier si la branche existe
    if git show-ref --verify --quiet refs/heads/$branch; then
        # Tenter la fusion
        if git merge "$branch" --no-ff -m "Merge branch '$branch' into main"; then
            echo "✅ Branche '$branch' fusionnée avec succès"
            
            # Demander si on veut supprimer la branche
            read -p "🗑️  Supprimer la branche '$branch' ? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                git branch -d "$branch"
                echo "🗑️  Branche '$branch' supprimée"
            fi
        else
            echo "❌ Conflit lors de la fusion de '$branch'"
            echo "🔧 Résolvez les conflits manuellement, puis continuez avec:"
            echo "   git add ."
            echo "   git commit"
            echo "   Puis relancez ce script"
            exit 1
        fi
    else
        echo "⚠️  La branche '$branch' n'existe pas localement"
    fi
done

echo ""
echo "✅ Toutes les branches ont été fusionnées vers main"
echo "📊 État final du dépôt:"
git log --oneline -10
echo ""
echo "🌿 Branches restantes:"
git branch