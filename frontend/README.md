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
- React icons

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
 │     ├── poll.js
 │     ├── user.js
 │     └── options.js
 ├── components/
 │     ├── admin/
 │     │      ├── PollList.jsx
 │     │      ├── PollForm.jsx
 │     │      ├── UserForm.jsx
 │     │      ├── UserList.jsx
 │     │      ├── PollDetails.jsx
 │     │      └── OptionEditor.jsx
 │     ├── context/
 │     │      ├── AuthContext.jsx
 │     ├── layout/
 │     │      ├── AdminLayout.jsx
 │     │      ├── AdminNavbar.jsx
 │     │      ├── UserLayout.jsx
 │     │      ├── UserNavbar.jsx
 │     ├── pages/
 │     │      ├── Login.jsx
 │     │      ├── Profil.jsx
 │     ├── public/
 │     │      ├── Poll.jsx
 │     │      └── PublicPoll.jsx
 │     ├── PrivateRoute.jsx
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

## Routing
### Boss
- '/admin/users/create'     | Formulaire de création d'utilisateur
- '/admin/users/allUsers'   | Liste des utilisateurs
- '/admin/users/edit/:id'   | Formulaire de modification d'utilisateur
- ''/admin/users/profil/:id | Profil d'un utilisateur
### Boss et Admin
- '/admin'          | Liste des sondages admin
- '/admin/create'   | Formulaire de création
- '/admin/:id'      | Détails sondage
- '/admin/edit/:id' | Formulaire d'édition
- '/accueil'        | Interface publique
### Admin
- '/profil' | Mon profil
### User
- '/'        | Interface publique
- 'myProfil' | Mon profil

## Contenu Component
### admin
- PollList     : Liste des sondages
- PollForm     : Formulaire de création/édition 
- PollDetail   : Détails d'un sondage
- OptionEditor : Gestion des options (ajout/modification/activation/supression)
- UserForm     : Formulaire de création/édition
- UserList     : Liste des utilisateurs
### context
- AuthContext : Gestion globale de l’authentification (user, token, login, logout)
### pages
- Login  : Page de connexion
- Profil : Page de profil

## Amélioration possible 
- Poll landing page avec slug
- Interface admin améliorée (recherche, filtres)
- Tableau de bord stats
- Mode vote anonyme/public
- Design avancé (animation + transitions)
- Notification de succès/erreur

## Crédit et contact
Projet réalisé dans le cadre d'un exercice pédagogique par LKWeb
Contact : luca.kiusi@gmail.com