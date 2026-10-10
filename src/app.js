const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();

// Middlewares globais
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota raiz (Health check)
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API Cafeteria REST em funcionamento!',
        recursos: {
            produtos: '/produtos'
        }
    });
});

// Vincula as rotas de produto
app.use('/produtos', produtoRoutes);

module.exports = app;
