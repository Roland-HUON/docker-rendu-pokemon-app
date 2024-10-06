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
  id INT PRIMARY KEY,
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
INSERT INTO pokemons (id, name, types, hp, damage) VALUES 
(4, 'Charmander', '["Fire"]', 39, 52),
(5, 'Charmeleon', '["Fire"]', 64, 75),
(6, 'Charizard', '["Fire", "Flying"]', 112, 90),
(7, 'Squirtle', '["Water"]', 44, 48),
(8, 'Wartortle', '["Water"]', 59, 63),
(9, 'Blastoise', '["Water"]', 79, 83),
(10, 'Bulbasaur', '["Grass", "Poison"]', 45, 49),
(11, 'Ivysaur', '["Grass", "Poison"]', 60, 62),
(12, 'Venusaur', '["Grass", "Poison"]', 80, 82),
(13, 'Caterpie', '["Bug"]', 45, 30),
(14, 'Metapod', '["Bug", "Poison"]', 40, 35),
(15, 'Pidgey', '["Normal", "Flying"]', 40, 45),
(16, 'Pidgeotto', '["Normal", "Flying"]', 63, 60),
(17, 'Pidgeot', '["Normal", "Flying"]', 83, 80),
(18, 'Rattata', '["Normal"]', 30, 56),
(19, 'Raticate', '["Normal"]', 55, 81),
(20, 'Fearow', '["Normal", "Flying"]', 65, 90),
(21, 'Ekans', '["Poison"]', 35, 60),
(22, 'Arbok', '["Poison"]', 60, 85),
(23, 'Pikachu', '["Electric"]', 35, 55),
(24, 'Raichu', '["Electric"]', 60, 90),
(25, 'Sandshrew', '["Ground"]', 50, 75),
(26, 'Sandslash', '["Ground"]', 75, 100),
(27, 'Nidoran♀', '["Poison"]', 55, 47),
(28, 'Nidorina', '["Poison"]', 70, 62),
(29, 'Nidoqueen', '["Poison", "Ground"]', 90, 82),
(30, 'Nidoran♂', '["Poison"]', 46, 57),
(31, 'Nidorino', '["Poison"]', 61, 72),
(32, 'Nidoking', '["Poison", "Ground"]', 81, 92),
(33, 'Clefairy', '["Fairy"]', 70, 45),
(34, 'Clefable', '["Fairy"]', 95, 70),
(35, 'Vulpix', '["Fire"]', 38, 41),
(36, 'Ninetales', '["Fire"]', 73, 76),
(37, 'Jigglypuff', '["Normal", "Fairy"]', 115, 45),
(38, 'Wigglytuff', '["Normal", "Fairy"]', 140, 70),
(39, 'Zubat', '["Poison", "Flying"]', 40, 45),
(40, 'Golbat', '["Poison", "Flying"]', 75, 80),
(41, 'Oddish', '["Grass", "Poison"]', 45, 50),
(42, 'Gloom', '["Grass", "Poison"]', 60, 65),
(43, 'Vileplume', '["Grass", "Poison"]', 80, 85),
(44, 'Paras', '["Bug", "Grass"]', 70, 45);
