const Produto = require('../entities/Produto');

// Casos de uso: regras de negocio da aplicacao para Produto.
class ProdutoUseCases {
  constructor(produtoGateway, categoriaGateway) {
    this.produtoGateway = produtoGateway;
    this.categoriaGateway = categoriaGateway;
  }

  async get() {
    return this.produtoGateway.findAll();
  }

  async getByCodigo(codigo) {
    this.validaCodigo(codigo);
    return this.produtoGateway.findByCodigo(codigo);
  }

  async getByCategoria(categoria) {
    if (!categoria || isNaN(categoria)) {
      throw new Error('Código da categoria inválido');
    }
    return this.produtoGateway.findByCategoria(categoria);
  }

  async add(produto) {
    const validado = await this.valida(produto);
    return this.produtoGateway.add(validado);
  }

  async update(produto) {
    this.validaCodigo(produto.codigo);
    const validado = await this.valida(produto);
    validado.codigo = produto.codigo;
    return this.produtoGateway.update(validado);
  }

  async delete(codigo) {
    this.validaCodigo(codigo);
    const avaliacoes = await this.produtoGateway.countAvaliacoes(codigo);
    if (avaliacoes > 0) {
      throw new Error('O produto não pode ser excluído pois possui avaliações vinculadas');
    }
    return this.produtoGateway.delete(codigo);
  }

  validaCodigo(codigo) {
    if (!codigo || isNaN(codigo)) {
      throw new Error('Código inválido');
    }
  }

  async valida(produto) {
    if (!produto.nome || produto.nome.trim().length === 0) {
      throw new Error('O nome do produto é obrigatório');
    }
    if (produto.nome.trim().length > 50) {
      throw new Error('O nome do produto deve ter no máximo 50 caracteres');
    }

    const quantidadeEstoque =
      produto.quantidade_estoque === undefined || produto.quantidade_estoque === null
        ? 0
        : Number(produto.quantidade_estoque);
    if (isNaN(quantidadeEstoque) || quantidadeEstoque < 0) {
      throw new Error('A quantidade em estoque deve ser maior ou igual a zero');
    }

    const valor = Number(produto.valor);
    if (isNaN(valor) || valor < 0) {
      throw new Error('O valor deve ser maior ou igual a zero');
    }

    if (produto.ativo === undefined || produto.ativo === null) {
      throw new Error('O campo ativo é obrigatório');
    }

    const dataCadastro = produto.data_cadastro
      ? produto.data_cadastro
      : new Date().toISOString().substring(0, 10);

    if (!produto.categoria || isNaN(produto.categoria)) {
      throw new Error('A categoria é obrigatória');
    }
    const categoria = await this.categoriaGateway.findByCodigo(produto.categoria);
    if (categoria === null) {
      throw new Error('A categoria informada não existe');
    }

    return new Produto(
      null,
      produto.nome.trim(),
      produto.descricao ? produto.descricao.trim() : null,
      quantidadeEstoque,
      produto.ativo === true || produto.ativo === 'true',
      valor,
      dataCadastro,
      Number(produto.categoria),
      categoria.nome
    );
  }
}

module.exports = ProdutoUseCases;
