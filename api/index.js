const express = require('express');
const cors = require('cors');

require('dotenv').config();

const categoriaRoutes = require('./src/routes/CategoriaRoutes');
const produtoRoutes = require('./src/routes/ProdutoRoutes');
const avaliacaoRoutes = require('./src/routes/AvaliacaoRoutes');
const usuarioRoutes = require('./src/routes/UsuarioRoutes');

const app = express();
const porta = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('/categoria', categoriaRoutes);
app.use('/produto', produtoRoutes);
app.use('/avaliacao', avaliacaoRoutes);
app.use('/usuario', usuarioRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    api: 'pw-rodrigo-2026',
    rotas: ['/categoria', '/produto', '/avaliacao', '/usuario'],
  });
});

app.use((req, res) => {
  res.status(404).json({ msg: 'Rota não encontrada' });
});

app.listen(porta, () => {
  console.log(`API rodando na porta ${porta}`);
});

module.exports = app;
