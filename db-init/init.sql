ALTER DATABASE pokemon CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
  name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  types JSON NOT NULL,
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
INSERT INTO pokemons (name, types, hp, damage) VALUES 
('Charmander', '["Fire"]', 39, 52),
('Charmeleon', '["Fire"]', 64, 75),
('Charizard', '["Fire", "Flying"]', 112, 90),
('Squirtle', '["Water"]', 44, 48),
('Wartortle', '["Water"]', 59, 63),
('Blastoise', '["Water"]', 79, 83),
('Bulbasaur', '["Grass", "Poison"]', 45, 49),
('Ivysaur', '["Grass", "Poison"]', 60, 62),
('Venusaur', '["Grass", "Poison"]', 80, 82),
('Caterpie', '["Bug"]', 45, 30),
('Metapod', '["Bug", "Poison"]', 40, 35),
('Pidgey', '["Normal", "Flying"]', 40, 45),
('Pidgeotto', '["Normal", "Flying"]', 63, 60),
('Pidgeot', '["Normal", "Flying"]', 83, 80),
('Rattata', '["Normal"]', 30, 56),
('Raticate', '["Normal"]', 55, 81),
('Pidgey', '["Normal", "Flying"]', 40, 60),
('Fearow', '["Normal", "Flying"]', 65, 90),
('Ekans', '["Poison"]', 35, 60),
('Arbok', '["Poison"]', 60, 85),
('Pikachu', '["Electric"]', 35, 55),
('Raichu', '["Electric"]', 60, 90),
('Sandshrew', '["Ground"]', 50, 75),
('Sandslash', '["Ground"]', 75, 100),
('Nidoran♀', '["Poison"]', 55, 47),
('Nidorina', '["Poison"]', 70, 62),
('Nidoqueen', '["Poison", "Ground"]', 90, 82),
('Nidoran♂', '["Poison"]', 46, 57),
('Nidorino', '["Poison"]', 61, 72),
('Nidoking', '["Poison", "Ground"]', 81, 92),
('Clefairy', '["Fairy"]', 70, 45),
('Clefable', '["Fairy"]', 95, 70),
('Vulpix', '["Fire"]', 38, 41),
('Ninetales', '["Fire"]', 73, 76),
('Jigglypuff', '["Normal", "Fairy"]', 115, 45),
('Wigglytuff', '["Normal", "Fairy"]', 140, 70),
('Zubat', '["Poison", "Flying"]', 40, 45),
('Golbat', '["Poison", "Flying"]', 75, 80),
('Oddish', '["Grass", "Poison"]', 45, 50),
('Gloom', '["Grass", "Poison"]', 60, 65),
('Vileplume', '["Grass", "Poison"]', 80, 85),
('Paras', '["Bug", "Grass"]', 70, 45);