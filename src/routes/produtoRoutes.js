const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// 1. LISTAR TODOS OS PRODUTOS (GET /produtos)
router.get('/', async (req, res) => {
    try {
        const [produtos] = await pool.query('SELECT * FROM produto');
        return res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        return res.status(500).json({ mensagem: 'Erro interno ao listar produtos', erro: error.message });
    }
});

// 2. BUSCAR PRODUTO POR ID (GET /produtos/:id)
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [produtos] = await pool.query('SELECT * FROM produto WHERE id = ?', [id]);
        if (produtos.length === 0) {
            return res.status(404).json({ mensagem: `Produto com id ${id} não encontrado.` });
        }
        return res.status(200).json(produtos[0]);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        return res.status(500).json({ mensagem: 'Erro interno ao buscar produto', erro: error.message });
    }
});

// 3. CADASTRAR NOVO PRODUTO (POST /produtos)
router.post('/', async (req, res) => {
    const { nome, categoria, preco } = req.body;

    if (!nome || !categoria || preco === undefined || preco === null) {
        return res.status(400).json({ mensagem: 'Campos obrigatórios: nome, categoria e preco.' });
    }

    try {
        const [resultado] = await pool.query(
            'INSERT INTO produto (nome, categoria, preco) VALUES (?, ?, ?)',
            [nome, categoria, Number(preco)]
        );

        return res.status(201).json({
            mensagem: 'Produto cadastrado com sucesso!',
            id: resultado.insertId,
            produto: {
                id: resultado.insertId,
                nome,
                categoria,
                preco: Number(preco)
            }
        });
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        return res.status(500).json({ mensagem: 'Erro interno ao cadastrar produto', erro: error.message });
    }
});

// 4. ATUALIZAR PRODUTO (PUT /produtos/:id)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, categoria, preco } = req.body;

    if (!nome || !categoria || preco === undefined || preco === null) {
        return res.status(400).json({ mensagem: 'Campos obrigatórios: nome, categoria e preco.' });
    }

    try {
        // Verifica se o produto existe
        const [existente] = await pool.query('SELECT * FROM produto WHERE id = ?', [id]);
        if (existente.length === 0) {
            return res.status(404).json({ mensagem: `Produto com id ${id} não encontrado para atualização.` });
        }

        await pool.query(
            'UPDATE produto SET nome = ?, categoria = ?, preco = ? WHERE id = ?',
            [nome, categoria, Number(preco), id]
        );

        return res.status(200).json({
            mensagem: 'Produto atualizado com sucesso!',
            produto: {
                id: Number(id),
                nome,
                categoria,
                preco: Number(preco)
            }
        });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        return res.status(500).json({ mensagem: 'Erro interno ao atualizar produto', erro: error.message });
    }
});

// 5. DELETAR PRODUTO (DELETE /produtos/:id)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [existente] = await pool.query('SELECT * FROM produto WHERE id = ?', [id]);
        if (existente.length === 0) {
            return res.status(404).json({ mensagem: `Produto com id ${id} não encontrado para exclusão.` });
        }

        await pool.query('DELETE FROM produto WHERE id = ?', [id]);

        return res.status(200).json({ mensagem: `Produto com id ${id} excluído com sucesso!` });
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        return res.status(500).json({ mensagem: 'Erro interno ao excluir produto', erro: error.message });
    }
});

module.exports = router;
