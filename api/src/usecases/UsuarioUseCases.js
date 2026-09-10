const Usuario = require('../entities/Usuario');

const TIPOS_VALIDOS = ['T', 'A', 'U'];

// Casos de uso: regras de negocio da aplicacao para Usuario.
class UsuarioUseCases {
  constructor(usuarioGateway) {
    this.usuarioGateway = usuarioGateway;
  }

  async get() {
    const usuarios = await this.usuarioGateway.findAll();
    return usuarios.map((usuario) => this.semSenha(usuario));
  }

  async getByEmail(email) {
    this.validaEmail(email);
    const usuario = await this.usuarioGateway.findByEmail(email);
    return usuario === null ? null : this.semSenha(usuario);
  }

  async add(usuario) {
    const validado = this.valida(usuario);
    const existente = await this.usuarioGateway.findByEmail(validado.email);
    if (existente !== null) {
      throw new Error('Já existe um usuário cadastrado com este e-mail');
    }
    return this.semSenha(await this.usuarioGateway.add(validado));
  }

  async update(usuario) {
    const validado = this.valida(usuario);
    const atualizado = await this.usuarioGateway.update(validado);
    return atualizado === null ? null : this.semSenha(atualizado);
  }

  async delete(email) {
    this.validaEmail(email);
    const removido = await this.usuarioGateway.delete(email);
    return removido === null ? null : this.semSenha(removido);
  }

  async login(email, senha) {
    this.validaEmail(email);
    if (!senha || senha.length === 0) {
      throw new Error('A senha é obrigatória');
    }
    const usuario = await this.usuarioGateway.findByEmail(email);
    if (usuario === null || usuario.senha !== senha) {
      return null;
    }
    return this.semSenha(usuario);
  }

  validaEmail(email) {
    if (!email || email.trim().length === 0) {
      throw new Error('O e-mail é obrigatório');
    }
    if (!email.includes('@')) {
      throw new Error('E-mail inválido');
    }
  }

  valida(usuario) {
    this.validaEmail(usuario.email);
    if (!usuario.senha || usuario.senha.length === 0) {
      throw new Error('A senha é obrigatória');
    }
    if (usuario.senha.length > 20) {
      throw new Error('A senha deve ter no máximo 20 caracteres');
    }
    if (!usuario.tipo || !TIPOS_VALIDOS.includes(usuario.tipo)) {
      throw new Error("O tipo deve ser 'T', 'A' ou 'U'");
    }
    if (!usuario.telefone || usuario.telefone.trim().length === 0) {
      throw new Error('O telefone é obrigatório');
    }
    if (!usuario.nome || usuario.nome.trim().length === 0) {
      throw new Error('O nome é obrigatório');
    }
    return new Usuario(
      usuario.email.trim(),
      usuario.senha,
      usuario.tipo,
      usuario.telefone.trim(),
      usuario.nome.trim()
    );
  }

  // A senha nunca sai da API.
  semSenha(usuario) {
    return {
      email: usuario.email,
      tipo: usuario.tipo,
      telefone: usuario.telefone,
      nome: usuario.nome,
    };
  }
}

module.exports = UsuarioUseCases;
