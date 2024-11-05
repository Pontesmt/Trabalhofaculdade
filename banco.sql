-- Criando tabela de Categorias
CREATE TABLE Categorias (
    id_categoria INT PRIMARY KEY,
    nome_categoria VARCHAR(50) NOT NULL
);

-- Inserindo dados na tabela Categorias
INSERT INTO Categorias (id_categoria, nome_categoria)
VALUES 
    (1, 'Bonés'),
    (2, 'Bermudas'),
    (3, 'Calças'),
    (4, 'Camisas');

-- Criando tabela de Produtos
CREATE TABLE Produtos (
    id_produto INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    avaliacao DECIMAL(2, 1),
    categoria_id INT,
    imagem_url VARCHAR(255),
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id_categoria)
);

-- Inserindo dados na tabela Produtos
INSERT INTO Produtos (id_produto, nome, preco, avaliacao, categoria_id, imagem_url)
VALUES 
    (1, 'Camisa 100 anos', 339.99, 4.5, 4, 'url_da_imagem_camisa_100_anos'),
    (2, 'Camisa Dinamite', 220.00, 4.5, 4, 'url_da_imagem_camisa_dinamite'),
    (3, 'Camisa 22/23', 370.00, 3.8, 4, 'url_da_imagem_camisa_22_23'),
    (4, 'Camisa 100 anos fora', 339.99, 4.8, 4, 'url_da_imagem_camisa_100_anos_fora');

-- Criando tabela de Promoções
CREATE TABLE Promocoes (
    id_promocao INT PRIMARY KEY,
    descricao VARCHAR(255),
    valor_desconto DECIMAL(5, 2),
    produto_id INT,
    FOREIGN KEY (produto_id) REFERENCES Produtos(id_produto)
);

-- Inserindo dados na tabela Promocoes
INSERT INTO Promocoes (id_promocao, descricao, valor_desconto, produto_id)
VALUES 
    (1, 'Promoção 3 bonés por 49,99 cada', 49.99, NULL); -- Promoção sem produto específico

-- Exemplo de consulta para visualizar os produtos com suas categorias e promoções
SELECT 
    p.id_produto,
    p.nome AS produto_nome,
    p.preco,
    p.avaliacao,
    c.nome_categoria,
    pr.descricao AS promocao,
    pr.valor_desconto
FROM 
    Produtos p
LEFT JOIN 
    Categorias c ON p.categoria_id = c.id_categoria
LEFT JOIN 
    Promocoes pr ON pr.produto_id = p.id_produto OR pr.produto_id IS NULL
ORDER BY 
    c.nome_categoria, p.nome;
