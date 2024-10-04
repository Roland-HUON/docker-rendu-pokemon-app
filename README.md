# Pokémon API - Rendu Docker

## Installation
### Prérequis
- Docker
- Docker-compose
### Lancement
```bash
docker volume create db_data
docker build -t pokemon_app .
docker-compose up
```
### Utilisation
Le serveur est accessible à l'adresse `http://localhost`
L'API est accessible à l'adresse `http://localhost:3000`

### API
#### `GET /api/pokemons` : Récupérer tous les pokémons
#### `GET /api/pokemons/:id` : Récupérer un pokémon par son ID
#### `POST /api/users/:userId` : Ajouter un lien user/pokemon
```json
{
    "pokemon_id": <id>
}
```
#### `DELETE /api/users/:userId/pokemons/:pokemonId` : Supprimer un lien user/pokemon
#### `GET /api/users/:userId/pokemons` : Récupérer tous les pokémons d'un utilisateur
<!-- #### `GET /api/users` : Récupérer tous les utilisateurs -->
#### `GET /api/users/login` : Récupérer un utilisateur par son email et mot de passe
```json
{
    "email": <email>,
    "password": <password>
}
```
#### `POST /api/users` : Créer un utilisateur
```json
{
    "username": <username>,
    "email": <email>,
    "password": <password>
}
```