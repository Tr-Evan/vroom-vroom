-- Création de la base de données
CREATE DATABASE IF NOT EXISTS vroom_vroom CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vroom_vroom;

-- Table Users
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table Cars
CREATE TABLE cars (
    id INT PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(255) NOT NULL,
    marque VARCHAR(255) NOT NULL,
    perf VARCHAR(255),
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Table Stats
CREATE TABLE stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cars_id INT NOT NULL,
    favoris INT DEFAULT 0,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cars_id) REFERENCES cars(id) ON DELETE CASCADE
);

-- Table Announcement
CREATE TABLE announcement (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cars_id INT NOT NULL,
    stats_id INT NOT NULL,
    date DATE NOT NULL,
    famous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cars_id) REFERENCES cars(id) ON DELETE CASCADE,
    FOREIGN KEY (stats_id) REFERENCES stats(id) ON DELETE CASCADE
);

-- Index pour améliorer les performances
CREATE INDEX idx_cars_user_id ON cars(user_id);
CREATE INDEX idx_stats_cars_id ON stats(cars_id);
CREATE INDEX idx_announcement_cars_id ON announcement(cars_id);
CREATE INDEX idx_announcement_stats_id ON announcement(stats_id);
CREATE INDEX idx_announcement_date ON announcement(date);

-- Données de test (optionnel)
INSERT INTO users (name) VALUES 
('Jean Dupont'),
('Marie Martin'),
('Pierre Dubois');

INSERT INTO cars (model, marque, perf, user_id) VALUES 
('911', 'Porsche', '450ch', 1),
('Model S', 'Tesla', '670ch', 2),
('Mustang GT', 'Ford', '450ch', 1);

INSERT INTO stats (cars_id, favoris, views) VALUES 
(1, 150, 2500),
(2, 230, 3200),
(3, 89, 1500);

INSERT INTO announcement (cars_id, stats_id, date, famous) VALUES 
(1, 1, '2024-01-15', TRUE),
(2, 2, '2024-02-20', TRUE),
(3, 3, '2024-03-10', FALSE);