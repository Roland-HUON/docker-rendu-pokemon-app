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