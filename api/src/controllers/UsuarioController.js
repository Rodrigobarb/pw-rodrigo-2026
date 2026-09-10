const UsuarioGateway = require('../gateways/UsuarioGateway');
const UsuarioUseCases = require('../usecases/UsuarioUseCases');

const usuarioUseCases = new UsuarioUseCases(new UsuarioGateway());

// Controlador: adaptador entre o HTTP (Express) e os casos de uso.
const UsuarioController = {
  get: async (req, res) => {
    try {
      const usuarios = await usuarioUseCases.get();
      res.status(200).json(usuarios);
    } catch (erro) {
      res.status(500).json({ msg: erro.message });
    }
  },

  getByEmail: async (req, res) => {
    try {
      const usuario = await usuarioUseCases.getByEmail(req.params.email);
      if (usuario === null) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
      }
      res.status(200).json(usuario);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },

  add: async (req, res) => {
    try {
      const usuario = await usuarioUseCases.add(req.body);
      res.status(201).json(usuario);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },

  update: async (req, res) => {
    try {
      const usuario = await usuarioUseCases.update(req.body);
      if (usuario === null) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
      }
      res.status(200).json(usuario);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },

  delete: async (req, res) => {
    try {
      const usuario = await usuarioUseCases.delete(req.params.email);
      if (usuario === null) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
      }
      res.status(200).json(usuario);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },

  login: async (req, res) => {
    try {
      const usuario = await usuarioUseCases.login(req.body.email, req.body.senha);
      if (usuario === null) {
        return res.status(401).json({ msg: 'E-mail ou senha inválidos' });
      }
      res.status(200).json(usuario);
    } catch (erro) {
      res.status(400).json({ msg: erro.message });
    }
  },
};

module.exports = UsuarioController;
