# Script PowerShell pour fusionner toutes les branches vers main
# Exécuter depuis le répertoire racine du projet

param(
    [switch]$Force,
    [switch]$DeleteBranches
)

Write-Host "🔄 Début de la fusion des branches vers main..." -ForegroundColor Cyan

# Vérifier si on est dans un repo Git
if (-not (Test-Path ".git")) {
    Write-Host "❌ Erreur: Ce répertoire n'est pas un dépôt Git" -ForegroundColor Red
    Write-Host "Initialisez d'abord un dépôt avec: git init" -ForegroundColor Yellow
    exit 1
}

try {
    # Sauvegarder la branche actuelle
    $currentBranch = git branch --show-current
    Write-Host "📍 Branche actuelle: $currentBranch" -ForegroundColor Green

    # Aller sur la branche main
    Write-Host "🔄 Basculement vers la branche main..." -ForegroundColor Cyan
    try {
        git checkout main 2>$null
    } catch {
        git checkout -b main
    }

    # Récupérer toutes les branches
    Write-Host "📋 Récupération de toutes les branches..." -ForegroundColor Cyan
    try {
        git fetch --all 2>$null
    } catch {
        Write-Host "⚠️  Pas de remote configuré" -ForegroundColor Yellow
    }

    # Lister toutes les branches locales (sauf main)
    $branches = git branch | Where-Object { $_ -notmatch "main" -and $_ -notmatch "^\*" } | ForEach-Object { $_.Trim() }

    if (-not $branches) {
        Write-Host "ℹ️  Aucune branche à fusionner (seule main existe)" -ForegroundColor Blue
        exit 0
    }

    Write-Host "📋 Branches à fusionner:" -ForegroundColor Cyan
    $branches | ForEach-Object { Write-Host "  - $_" -ForegroundColor White }

    # Fusionner chaque branche
    foreach ($branch in $branches) {
        Write-Host ""
        Write-Host "🔄 Fusion de la branche: $branch" -ForegroundColor Cyan
        
        # Vérifier si la branche existe
        $branchExists = git show-ref --verify --quiet "refs/heads/$branch"
        if ($LASTEXITCODE -eq 0) {
            # Tenter la fusion
            git merge $branch --no-ff -m "Merge branch '$branch' into main"
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Branche '$branch' fusionnée avec succès" -ForegroundColor Green
                
                # Demander si on veut supprimer la branche
                if ($DeleteBranches) {
                    git branch -d $branch
                    Write-Host "🗑️  Branche '$branch' supprimée" -ForegroundColor Yellow
                } else {
                    $response = Read-Host "🗑️  Supprimer la branche '$branch' ? (y/N)"
                    if ($response -match "^[Yy]$") {
                        git branch -d $branch
                        Write-Host "🗑️  Branche '$branch' supprimée" -ForegroundColor Yellow
                    }
                }
            } else {
                Write-Host "❌ Conflit lors de la fusion de '$branch'" -ForegroundColor Red
                Write-Host "🔧 Résolvez les conflits manuellement, puis continuez avec:" -ForegroundColor Yellow
                Write-Host "   git add ." -ForegroundColor White
                Write-Host "   git commit" -ForegroundColor White
                Write-Host "   Puis relancez ce script" -ForegroundColor White
                exit 1
            }
        } else {
            Write-Host "⚠️  La branche '$branch' n'existe pas localement" -ForegroundColor Yellow
        }
    }

    Write-Host ""
    Write-Host "✅ Toutes les branches ont été fusionnées vers main" -ForegroundColor Green
    Write-Host "📊 État final du dépôt:" -ForegroundColor Cyan
    git log --oneline -10
    Write-Host ""
    Write-Host "🌿 Branches restantes:" -ForegroundColor Cyan
    git branch

} catch {
    Write-Host "❌ Erreur lors de la fusion: $_" -ForegroundColor Red
    exit 1
}