const CategoriaGateway = require('../gateways/CategoriaGateway');
const CategoriaUseCases = require('../usecases/CategoriaUseCases');

const categoriaUseCases = new CategoriaUseCases(new CategoriaGateway());

// Controlador: adaptador entre o HTTP (Express) e os casos de uso.
const CategoriaController = {
  get: async (req, res) => {
    try {
      const categorias = await categoriaUseCases.get();
      res.status(200).json(categorias);
    } catch (erro) {
      res.status(500).json({ msg: erro.message });
    }
  },

  getByCodigo: async (req, res) => {
    try {
      const categoria = await categoriaUseCases.getByCodigo(req.params.codigo);
      if (categoria === null) {
        return res.status(404).json({ msg: 'Categoria não encontrada' });
      }
      res.status(200).json(categoria);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },

  add: async (req, res) => {
    try {
      const categoria = await categoriaUseCases.add(req.body.nome);
      res.status(201).json(categoria);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },

  update: async (req, res) => {
    try {
      const categoria = await categoriaUseCases.update(req.body.codigo, req.body.nome);
      if (categoria === null) {
        return res.status(404).json({ msg: 'Categoria não encontrada' });
      }
      res.status(200).json(categoria);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },

  delete: async (req, res) => {
    try {
      const categoria = await categoriaUseCases.delete(req.params.codigo);
      if (categoria === null) {
        return res.status(404).json({ msg: 'Categoria não encontrada' });
      }
      res.status(200).json(categoria);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },
};

module.exports = CategoriaController;
