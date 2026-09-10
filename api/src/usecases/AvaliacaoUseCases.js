const Avaliacao = require('../entities/Avaliacao');

// Casos de uso: regras de negocio da aplicacao para Avaliacao.
class AvaliacaoUseCases {
  constructor(avaliacaoGateway, produtoGateway) {
    this.avaliacaoGateway = avaliacaoGateway;
    this.produtoGateway = produtoGateway;
  }

  async get() {
    return this.avaliacaoGateway.findAll();
  }

  async getByCodigo(codigo) {
    this.validaCodigo(codigo);
    return this.avaliacaoGateway.findByCodigo(codigo);
  }

  async getByProduto(produto) {
    if (!produto || isNaN(produto)) {
      throw new Error('Código do produto inválido');
    }
    return this.avaliacaoGateway.findByProduto(produto);
  }

  async add(avaliacao) {
    const validada = await this.valida(avaliacao);
    return this.avaliacaoGateway.add(validada);
  }

  async update(avaliacao) {
    this.validaCodigo(avaliacao.codigo);
    const validada = await this.valida(avaliacao);
    validada.codigo = avaliacao.codigo;
    return this.avaliacaoGateway.update(validada);
  }

  async delete(codigo) {
    this.validaCodigo(codigo);
    return this.avaliacaoGateway.delete(codigo);
  }

  validaCodigo(codigo) {
    if (!codigo || isNaN(codigo)) {
      throw new Error('Código inválido');
    }
  }

  async valida(avaliacao) {
    if (!avaliacao.autor || avaliacao.autor.trim().length === 0) {
      throw new Error('O autor é obrigatório');
    }
    if (!avaliacao.email || avaliacao.email.trim().length === 0) {
      throw new Error('O e-mail é obrigatório');
    }
    if (!avaliacao.email.includes('@')) {
      throw new Error('E-mail inválido');
    }
    if (!avaliacao.texto || avaliacao.texto.trim().length === 0) {
      throw new Error('O texto da avaliação é obrigatório');
    }
    if (avaliacao.texto.trim().length > 200) {
      throw new Error('O texto da avaliação deve ter no máximo 200 caracteres');
    }

    const nota = Number(avaliacao.nota);
    if (isNaN(nota) || nota < 0 || nota > 5) {
      throw new Error('A nota deve estar entre 0 e 5');
    }

    const data = avaliacao.data ? avaliacao.data : new Date().toISOString().substring(0, 10);

    if (!avaliacao.produto || isNaN(avaliacao.produto)) {
      throw new Error('O produto é obrigatório');
    }
    const produto = await this.produtoGateway.findByCodigo(avaliacao.produto);
    if (produto === null) {
      throw new Error('O produto informado não existe');
    }

    return new Avaliacao(
      null,
      avaliacao.autor.trim(),
      avaliacao.email.trim(),
      avaliacao.texto.trim(),
      nota,
      data,
      Number(avaliacao.produto)
    );
  }
}

module.exports = AvaliacaoUseCases;
