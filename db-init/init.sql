USE pokemon;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
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

-- Add admin user
INSERT INTO users (username, email, password) VALUES 
('admin', 'admin@example.com', 'admin');

-- Add pokemons to the database
INSERT INTO pokemons (name, type, hp, damage) VALUES 
('Pikachu', 'Électrique', 35, 55),
('Salamèche', 'Feu', 39, 52),
('Reptincel', 'Feu', 64, 75),
('Dracaufeu', 'Feu', 112, 90),
('Carapuce', 'Eau', 44, 48),
('Bulbizarre', 'Plante', 45, 49),
('Nanméouie', 'Normal', 115, 45);