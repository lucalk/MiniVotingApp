# Mini Voting App

## Contexte du projet
Ce frontend fait partie d'une mini-application de vote conçue pour un client souhaitant faciliter ses sondages internes lors de réunions, ateliers ou choix visuels.

Il permet d'afficher un sondage, voter pour une option et voir immédiatement les résultats mis à jour.

## Fonctionnalités 
- Interface Admin complète
- Interface publique votant
- UI moderne et responsive
- Gestion des états + interactions propres

## Objectif
Ce frontend React a pour rôle de :
- Afficher la question d'un sondage
- Afficher les options avec leurs résultats (votes + pourcentage)
- Permettre de voter pour une option
- Mettre à jour l'interface automatiquement après le vote
- Fournir une interface simple, ergonomique et réutilisable

## Stack technique
- React + Vite
- TailwindCSS
- React Router
- Fetch API
- Composants modulaires
- Architecture claire
- Fonctionne avec Backend NestJS associé port(3000)

## Installation et lancement
- Installer les dépendances
```bash
pnpm install
```
- Lancer le serveur
```bash
pnpm run dev
```
- Frontend React : http://localhost:5173
- Backend : http://localhost:3000

## Architecture du projet
```pgsql
src/
 ├── service/
 │     ├── polls.js
 │     └── options.js
 ├── components/
 │     ├── admin/
 │     │      ├── PollList.jsx
 │     │      ├── PollForm.jsx
 │     │      ├── PollDetails.jsx
 │     │      └── OptionEditor.jsx
 │     ├── public/
 │     │      ├── Poll.jsx
 │     │      └── PublicPoll.jsx
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

## Routing
- /admin          | Liste des sondages admin
- /admin/create   | Formulaire de création
- /admin/edit/:id | Formulaire d'édition
- /admin/:id      | Détails sondage
- /               | Interface publique : 1 sondage
- /a              | Deuxième interface publique : 1 à plusieurs sondages

## Interface Admin
- PollList : Liste des sondages
- PollForm : Formulaire de création/édition 
- PollDetail : Détails d'un sondage
- OptionEditor : Gestion des options (ajout/modification/activation/supression)

## Amélioration possible (V4)
- Authentification (JWT) votant/admin
- Accès public sécurisé
- Poll landing page avec slug
- Interface admin améliorée (recherche, filtres)
- Tableau de bord stats
- Mode vote anonyme/public
- Design avancé (animation + transitions)
- Notification de succès/erreur

## Crédit et contact
Projet réalisé dans le cadre d'un exercice pédagogique par LKWeb
Contact : luca.kiusi@gmail.com