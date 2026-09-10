const AvaliacaoGateway = require('../gateways/AvaliacaoGateway');
const ProdutoGateway = require('../gateways/ProdutoGateway');
const AvaliacaoUseCases = require('../usecases/AvaliacaoUseCases');

const avaliacaoUseCases = new AvaliacaoUseCases(new AvaliacaoGateway(), new ProdutoGateway());

// Controlador: adaptador entre o HTTP (Express) e os casos de uso.
const AvaliacaoController = {
  get: async (req, res) => {
    try {
      const avaliacoes = await avaliacaoUseCases.get();
      res.status(200).json(avaliacoes);
    } catch (erro) {
      res.status(500).json({ msg: erro.message });
    }
  },

  getByCodigo: async (req, res) => {
    try {
      const avaliacao = await avaliacaoUseCases.getByCodigo(req.params.codigo);
      if (avaliacao === null) {
        return res.status(404).json({ msg: 'Avaliação não encontrada' });
      }
      res.status(200).json(avaliacao);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },

  getByProduto: async (req, res) => {
    try {
      const avaliacoes = await avaliacaoUseCases.getByProduto(req.params.produto);
      res.status(200).json(avaliacoes);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },

  add: async (req, res) => {
    try {
      const avaliacao = await avaliacaoUseCases.add(req.body);
      res.status(201).json(avaliacao);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },

  update: async (req, res) => {
    try {
      const avaliacao = await avaliacaoUseCases.update(req.body);
      if (avaliacao === null) {
        return res.status(404).json({ msg: 'Avaliação não encontrada' });
      }
      res.status(200).json(avaliacao);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },

  delete: async (req, res) => {
    try {
      const avaliacao = await avaliacaoUseCases.delete(req.params.codigo);
      if (avaliacao === null) {
        return res.status(404).json({ msg: 'Avaliação não encontrada' });
      }
      res.status(200).json(avaliacao);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },
};

module.exports = AvaliacaoController;
