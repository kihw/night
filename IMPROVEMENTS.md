# Suggestions d'Améliorations et Futures Fonctionnalités

Ce document recense des idées d'améliorations potentielles pour le projet **NightMod** ainsi que quelques points à surveiller.

## Corrections possibles

- **Chemin d'icônes manquantes** : `src/main.js` vérifie la présence de `tray-icon.png` et affiche un message si le fichier est absent. Il serait utile d'ajouter une icône par défaut ou d'informer l'utilisateur pour éviter une erreur à l'exécution.
- **Fin de fichier sans retour à la ligne** : `README.md` se termine sans saut de ligne final, ce qui peut générer un avertissement lors de certaines opérations Git.
- **Gestion d'erreurs plus détaillée** : lors de l'exécution des commandes système (extinction, veille, etc.), enregistrer les messages d'erreur et proposer des solutions à l'utilisateur.

## Idées de futures fonctionnalités

- **Mises à jour automatiques** : intégrer `electron-updater` pour proposer des mises à jour sans intervention manuelle.
- **Détection d'inactivité** : en plus des vérifications périodiques, analyser l'inactivité de l'utilisateur (souris, clavier) pour déclencher l'action plus intelligemment.
- **Internationalisation** : proposer l'interface en plusieurs langues pour toucher un public plus large.


Ces pistes pourront servir de base pour planifier les prochaines versions de NightMod.
