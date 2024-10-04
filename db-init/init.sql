USE pokemon;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pokemons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  hp INT NOT NULL,
  damage INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pokemon_user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  pokemon_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pokemon_id) REFERENCES pokemons(id)
);

-- Add admin user
INSERT INTO users (username, email, password) VALUES 
('admin', 'admin@pokemonapp.com', '12345678');

-- Add pokemons to the database
INSERT INTO pokemons (name, type, hp, damage) VALUES 
('Pikachu', 'Électrique', 35, 55),
('Salamèche', 'Feu', 39, 52),
('Reptincel', 'Feu', 64, 75),
('Dracaufeu', 'Feu', 112, 90),
('Carapuce', 'Eau', 44, 48),
('Carabaffe', 'Eau', 59, 63),
('Tortank', 'Eau', 79, 83),
('Bulbizarre', 'Plante', 45, 49),
('Herbizarre', 'Plante', 60, 62),
('Florizarre', 'Plante', 80, 82),
('Chenipan', 'Insecte', 45, 30),
('Aspicot', 'Insecte', 40, 35),
('Roucool', 'Normal', 40, 45),
('Roucoups', 'Normal', 63, 60),
('Roucarnage', 'Normal', 83, 80),
('Rattata', 'Normal', 30, 56),
('Rattatac', 'Normal', 55, 81),
('Piafabec', 'Normal', 40, 60),
('Rapasdepic', 'Normal', 65, 90),
('Abo', 'Poison', 35, 60),
('Arbok', 'Poison', 60, 85),
('Pikachu', 'Électrique', 35, 55),
('Raichu', 'Électrique', 60, 90),
('Sabelette', 'Sol', 50, 75),
('Sablaireau', 'Sol', 75, 100),
('Nidoran♀', 'Poison', 55, 47),
('Nidorina', 'Poison', 70, 62),
('Nidoqueen', 'Poison', 90, 82),
('Nidoran♂', 'Poison', 46, 57),
('Nidorino', 'Poison', 61, 72),
('Nidoking', 'Poison', 81, 92),
('Mélofée', 'Fée', 70, 45),
('Mélodelfe', 'Fée', 95, 70),
('Goupix', 'Feu', 38, 41),
('Feunard', 'Feu', 73, 76),
('Rondoudou', 'Normal', 115, 45),
('Grodoudou', 'Normal', 140, 70),
('Nosferapti', 'Poison', 40, 45),
('Nosferalto', 'Poison', 75, 80),
('Mystherbe', 'Plante', 45, 50),
('Ortide', 'Plante', 60, 65),
('Rafflessia','Plante', 80, 85),
('Nanméouie', 'Normal', 115, 45);