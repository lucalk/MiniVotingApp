# Mini Voting App

## Contexte du projet
Ce backend fait partie d'une mini-application de vote conçue pour faciliter les sondages lors de réunions, ateliers ou choix visuels.

Le but : fournir une API simple, propre et réutilisable pour permettre à un frontend (React ou autre) d'afficher un ou plusieurs sondages, voter et recevoir les résultats en temps réel.

## Objectif
Créer une API REST avec NestJS permettant :
- Gérer les sondages (création, modification, suppression)
- Gérer le cycle de vie d'un sondage (brouillon, public ou archivé)
- Gérer les options d'un sondage
- Authentifier les utilisateurs
- Gérer les rôles (ADMIN/USER)
- Autoriser un seul vote par utilisateur et par sondage
- Garantir la cohérence métier des votes
- Fournir des résultats clairs et exploitables par le frontend
- Gérer proprement la validation des données

## Rôles et permissions
ADMIN : Gestion complète (sondages, options, utilisateurs)
USER  : COnsultation et vote sur les sondages actifs

- Les routes sont protégées par JWT + Guards + rôles

## Stack technique
- NestJS => Structure backend
- TypeScript => Typage strict
- Class-validator => Validation stricte des DTO
- ValidationPipe => Sécurité des entrées
- Prisma 6 => Accès base de données 
- MySQL => Base de données relationnelle
- CORS enabled => Communication React <-> Nest
- JWT => Authentification sécurisée
- Passport.js Stratégie JWT

## Installation et lancement
- Installer les dépendances
```bash
pnpm install
```
- Lancer le serveur 
```bash
pnpm start:dev
```
- Backend : http://localhost:3000
- Frontend React : http://localhost:5173


## Configuration (.env)
Variables attendues : 
- DATABASE_URL
- JWT_SECRET 

## Architecture du projet
```cpp
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt-auth.guard.ts
│   ├── jwt.strategy.ts
│   ├── roles.decorator.ts
│   ├── roles.guard.ts
│   └── dto/
│       └── login.dto.ts
│
├── poll/
│   ├── poll.controller.ts
│   ├── poll.module.ts
│   ├── poll.service.ts
│   └── dto/
│       ├── create-poll.dto.ts
│       ├── update-poll.dto.ts
│       ├── create-option.dto.ts
│       ├── update-option.dto.ts
│       └── vote.dto.ts
│
├── user/
│   ├── user.controller.ts
│   ├── user.module.ts
│   ├── user.service.ts
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
│
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── main.ts
```

## Modèle de données (Prisma)
Poll : 
- Sondage principal
- Gère l'état, la visibilité et les options

Option :
- Choix d'un sondage
- Comptabilise les votes

Vote : 
- Historique des votes utilisateurs
- Empêche les votes multiples

```prisma
enum PollStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model Poll {
  id          Int        @id @default(autoincrement())
  title       String     
  question    String
  description String?
  status      PollStatus @default(DRAFT)
  isActive    Boolean    @default(false)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  options     Option[]
  voteRecords Vote[]
}

model Option {
  id        Int      @id @default(autoincrement())
  label     String
  votes     Int      @default(0)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())

  pollId    Int
  poll      Poll @relation(fields: [pollId], references: [id])

  voteRecords     Vote[]
}

enum UserRole {
  BOSS
  ADMIN
  USER
}

model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  email     String   @unique
  password  String
  role      UserRole @default(USER)
  createdAt DateTime @default(now())

  voteRecords     Vote[]
}

model Vote {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())

  userId    Int
  user      User     @relation(fields: [userId], references: [id])

  pollId    Int
  poll      Poll     @relation(fields: [pollId], references: [id])

  optionId  Int
  option    Option   @relation(fields: [optionId], references: [id])

  @@unique([userId, pollId]) // vote unique par utilisateur et par sondage
}
```

## API Endpoints
1. Authentification
- POST   | /auth/login | Connexion utilisateur

2. Sondages
- GET    | /polls     | Liste des sondages
- GET    | /polls/all | Liste des sondages avec leurs options 
- GET    | /polls/:id | Détail d'un sondage
- POST   | /polls     | Créer un sondage
- PATCH  | /polls/:id | Modifier un sondage
- DELETE | /polls/:id | Supprimer un sondage

3. Options
- POST   | /polls/:id/options       | Ajouter une option
- PATCH  | /polls/options/:optionId | Modifier une option
- DELETE | /polls/options/:optionId | Supprimer une option 

4. Vote
- POST   | /polls/vote | Voter pour une option

Règles métier vote : 
- Le sondage doit être public (PUBLISHED)
- Le sondage doit être actif (isActive = true)
- L'option doit être active (isActive = true)

## Amélioration possible 
- WebSocket (temps réel)
- Page publique via slug (/poll/:slug)

## Crédit et contact
Projet réalisé dans le cadre d'un exercice pédagogique par LKWeb
Contact : luca.kiusi@gmail.com