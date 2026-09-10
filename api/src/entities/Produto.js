// Entidade: regra de negocio da empresa (camada mais interna).
class Produto {
  constructor(
    codigo,
    nome,
    descricao,
    quantidadeEstoque,
    ativo,
    valor,
    dataCadastro,
    categoria,
    categoriaNome
  ) {
    this.codigo = codigo;
    this.nome = nome;
    this.descricao = descricao;
    this.quantidade_estoque = quantidadeEstoque;
    this.ativo = ativo;
    this.valor = valor;
    this.data_cadastro = dataCadastro;
    this.categoria = categoria;
    this.categoria_nome = categoriaNome;
  }
}

module.exports = Produto;
