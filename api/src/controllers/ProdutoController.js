const ProdutoGateway = require('../gateways/ProdutoGateway');
const CategoriaGateway = require('../gateways/CategoriaGateway');
const ProdutoUseCases = require('../usecases/ProdutoUseCases');

const produtoUseCases = new ProdutoUseCases(new ProdutoGateway(), new CategoriaGateway());

// Controlador: adaptador entre o HTTP (Express) e os casos de uso.
const ProdutoController = {
  get: async (req, res) => {
    try {
      const produtos = await produtoUseCases.get();
      res.status(200).json(produtos);
    } catch (erro) {
      res.status(500).json({ msg: erro.message });
    }
  },

  getByCodigo: async (req, res) => {
    try {
      const produto = await produtoUseCases.getByCodigo(req.params.codigo);
      if (produto === null) {
        return res.status(404).json({ msg: 'Produto não encontrado' });
      }
      res.status(200).json(produto);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },

  getByCategoria: async (req, res) => {
    try {
      const produtos = await produtoUseCases.getByCategoria(req.params.categoria);
      res.status(200).json(produtos);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },

  add: async (req, res) => {
    try {
      const produto = await produtoUseCases.add(req.body);
      res.status(201).json(produto);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },

  update: async (req, res) => {
    try {
      const produto = await produtoUseCases.update(req.body);
      if (produto === null) {
        return res.status(404).json({ msg: 'Produto não encontrado' });
      }
      res.status(200).json(produto);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },

  delete: async (req, res) => {
    try {
      const produto = await produtoUseCases.delete(req.params.codigo);
      if (produto === null) {
        return res.status(404).json({ msg: 'Produto não encontrado' });
      }
      res.status(200).json(produto);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },
};

module.exports = ProdutoController;
