const Categoria = require('../entities/Categoria');

// Casos de uso: regras de negocio da aplicacao para Categoria.
class CategoriaUseCases {
  constructor(categoriaGateway) {
    this.categoriaGateway = categoriaGateway;
  }

  async get() {
    return this.categoriaGateway.findAll();
  }

  async getByCodigo(codigo) {
    if (!codigo || isNaN(codigo)) {
      throw new Error('Código inválido');
    }
    return this.categoriaGateway.findByCodigo(codigo);
  }

  async add(nome) {
    this.validaNome(nome);
    return this.categoriaGateway.add(new Categoria(null, nome.trim()));
  }

  async update(codigo, nome) {
    if (!codigo || isNaN(codigo)) {
      throw new Error('Código inválido');
    }
    this.validaNome(nome);
    return this.categoriaGateway.update(new Categoria(codigo, nome.trim()));
  }

  async delete(codigo) {
    if (!codigo || isNaN(codigo)) {
      throw new Error('Código inválido');
    }
    const produtos = await this.categoriaGateway.countProdutos(codigo);
    if (produtos > 0) {
      throw new Error('A categoria não pode ser excluída pois possui produtos vinculados');
    }
    return this.categoriaGateway.delete(codigo);
  }

  validaNome(nome) {
    if (!nome || nome.trim().length === 0) {
      throw new Error('O nome da categoria é obrigatório');
    }
    if (nome.trim().length > 40) {
      throw new Error('O nome da categoria deve ter no máximo 40 caracteres');
    }
  }
}

module.exports = CategoriaUseCases;
