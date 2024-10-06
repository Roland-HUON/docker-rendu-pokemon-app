# Pokémon API - Rendu Docker

## Installation
### Prérequis
- Docker
- Docker Compose
### Clonage du projet
```bash
git clone https://github.com/Roland-HUON/docker-rendu-pokemon-app.git
```
### Configuration
Créer un fichier `.env` à la racine du projet avec les variables suivantes :
```env
MYSQL_ROOT_PASSWORD=LeMotDePasseDeVotreChoix
```
### Lancement
```bash
docker-compose up -d
```
### Utilisation
Le serveur est accessible à l'adresse `http://localhost`
L'API est accessible à l'adresse `http://localhost/api`

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