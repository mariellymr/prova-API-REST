-- 1. Cria o banco de dados se não existir
CREATE DATABASE IF NOT EXISTS cafeteria;

-- 2. Seleciona o banco para uso
USE cafeteria;

-- 3. Cria a tabela produto 
CREATE TABLE IF NOT EXISTS produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL
);

INSERT INTO produto (nome, categoria, preco) VALUES 
('Espresso', 'Café Tradicional', 6.50),
('Cappuccino Italiano', 'Bebidas Especiais', 12.00),
('Croissant de Queijo', 'Salgados', 9.50);