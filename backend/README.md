# Mini Voting App

## Contexte du projet
Ce backend fait partie d'une mini-application de vote conçue pour faciliter les sondages lors de réunions, ateliers ou choix visuels.

Le but : fournir une API simple, propre et réutilisable pour permettre à un frontend (React ou autre) d'afficher un ou plusieurs sondages, voter et recevoir les résultats en temps réel.

## Objectif
Créer une API REST avec NestJS permettant :
- Créer, modifier et supprimer un sondage
- Gérer l'état et le statut du sondage (brouillon, public ou archivé)
- Créer, modifier et supprimer l'option
- Récupérer un ou plusieurs sondages avec ses options
- Voter pour l'une des options
- Retourner les résultats instantanément
- Gérer proprement la validation des données

## Stack technique
- NestJS => Structure backend
- TypeScript => Typage
- Class-validator => Validation stricte des DTO
- ValidationPipe => Sécurité  
- Prisma 6 => ORM 
- MySQL => Base relationnelle
- CORS enabled => Communication React -> Nest

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

## Architecture du projet
```cpp
src/
 ├─ prisma/
 │   ├─ prisma.module.ts
 │   └─ prisma.service.ts
 ├─ poll/
 │   ├─ poll.module.ts
 │   ├─ poll.controller.ts
 │   ├─ poll.service.ts
 │   └─ dto/
 │      ├─ create-option.dto.ts
 │      ├─ create-poll.dto.ts
 │      ├─ update-option.dto.ts
 │      ├─ update-poll.dto.ts
 │      └─ vote.dto.ts
 ├─ app.module.ts
 └─ main.ts
```

## Modèle de données (Prisma)
```prisma
model Poll {
  id          Int         @id @default(autoincrement())
  title       String
  question    String
  description String?
  status      PollStatus  @default(DRAFT)
  isActive    Boolean     @default(false)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  options     Option[]
}

model Option {
  id        Int      @id @default(autoincrement())
  label     String
  votes     Int      @default(0)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())

  pollId  Int
  poll    Poll   @relation(fields: [pollId], references: [id])
}

enum PollStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

## API Endpoints
1. Sondages
- GET    | /polls     | Liste des sondages
- GET    | /polls/all | Liste des sondages avec leurs options 
- GET    | /polls/:id | Détail d'un sondage
- POST   | /polls     | Créer un sondage
- PATCH  | /polls/:id | Modifier un sondage
- DELETE | /polls/:id | Supprimer un sondage

2. Options
- POST   | /polls/:id/options       | Ajouter une option
- PATCH  | /polls/options/:optionId | Modifier une option
- DELETE | /polls/options/:optionId | Supprimer une option 

3. Vote
- POST   | /polls/vote | Voter pour une option

Règles métier vote : 
- Le sondage doit être public (PUBLISHED)
- Le sondage doit être actif (isActive = true)
- L'option doit être active (isActive = true)

## V4
- Comptes utilisateurs
- Rôles : admin - voter
- Auth JWT
- Gestion sécurisée des votes
- Historique complet 
- WebSocket (temps réel)
- Page publique via slug (/poll/:slug)

## Crédit et contact
Projet réalisé dans le cadre d'un exercice pédagogique par LKWeb
Contact : luca.kiusi@gmail.com