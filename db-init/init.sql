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
(1, 'Bulbasaur', '["Grass", "Poison"]', 45, 49),
(2, 'Ivysaur', '["Grass", "Poison"]', 60, 62),
(3, 'Venusaur', '["Grass", "Poison"]', 80, 82),
(10, 'Caterpie', '["Bug"]', 45, 30),
(11, 'Metapod', '["Bug"]', 40, 20),
(16, 'Pidgey', '["Normal", "Flying"]', 40, 45),
(17, 'Pidgeotto', '["Normal", "Flying"]', 63, 60),
(18, 'Pidgeot', '["Normal", "Flying"]', 83, 80),
(19, 'Rattata', '["Normal"]', 30, 56),
(20, 'Raticate', '["Normal"]', 55, 81),
(22, 'Fearow', '["Normal", "Flying"]', 65, 90),
(23, 'Ekans', '["Poison"]', 35, 60),
(24, 'Arbok', '["Poison"]', 60, 85),
(25, 'Pikachu', '["Electric"]', 35, 55),
(26, 'Raichu', '["Electric"]', 60, 90),
(27, 'Sandshrew', '["Ground"]', 50, 75),
(28, 'Sandslash', '["Ground"]', 75, 100),
(29, 'Nidorina', '["Poison"]', 70, 62),
(30, 'Nidoqueen', '["Poison", "Ground"]', 90, 82),
(31, 'Nidorino', '["Poison"]', 61, 72),
(32, 'Nidoking', '["Poison", "Ground"]', 81, 92),
(35, 'Clefairy', '["Fairy"]', 70, 45),
(36, 'Clefable', '["Fairy"]', 95, 70),
(37, 'Vulpix', '["Fire"]', 38, 41),
(38, 'Ninetales', '["Fire"]', 73, 76),
(39, 'Jigglypuff', '["Normal", "Fairy"]', 115, 45),
(40, 'Wigglytuff', '["Normal", "Fairy"]', 140, 70),
(41, 'Zubat', '["Poison", "Flying"]', 40, 45),
(42, 'Golbat', '["Poison", "Flying"]', 75, 80),
(43, 'Oddish', '["Grass", "Poison"]', 45, 50),
(44, 'Gloom', '["Grass", "Poison"]', 60, 65),
(45, 'Vileplume', '["Grass", "Poison"]', 80, 85),
(46, 'Paras', '["Bug", "Grass"]', 35, 70);

