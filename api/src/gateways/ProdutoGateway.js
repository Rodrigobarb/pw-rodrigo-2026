const db = require('../database/db');
const Produto = require('../entities/Produto');

const SELECT_PRODUTOS = `
  select p.codigo as codigo, p.nome as nome, p.descricao as descricao,
         p.quantidade_estoque as quantidade_estoque, p.ativo as ativo, p.valor as valor,
         to_char(p.data_cadastro,'YYYY-MM-DD') as data_cadastro,
         p.categoria as categoria, c.nome as categoria_nome
  from produtos p
  join categorias c on p.categoria = c.codigo
`;

const paraProduto = (linha) =>
  new Produto(
    linha.codigo,
    linha.nome,
    linha.descricao,
    linha.quantidade_estoque,
    linha.ativo,
    parseFloat(linha.valor),
    linha.data_cadastro,
    linha.categoria,
    linha.categoria_nome
  );

// Gateway: adaptador de interface entre os casos de uso e o banco de dados.
class ProdutoGateway {
  async findAll() {
    const resultado = await db.query(`${SELECT_PRODUTOS} order by p.codigo`);
    return resultado.rows.map(paraProduto);
  }

  async findByCodigo(codigo) {
    const resultado = await db.query(`${SELECT_PRODUTOS} where p.codigo = $1`, [codigo]);
    if (resultado.rowCount === 0) {
      return null;
    }
    return paraProduto(resultado.rows[0]);
  }

  async findByCategoria(categoria) {
    const resultado = await db.query(
      `${SELECT_PRODUTOS} where p.categoria = $1 order by p.codigo`,
      [categoria]
    );
    return resultado.rows.map(paraProduto);
  }

  async add(produto) {
    const resultado = await db.query(
      `insert into produtos (nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria)
       values ($1, $2, $3, $4, $5, $6, $7) returning codigo`,
      [
        produto.nome,
        produto.descricao,
        produto.quantidade_estoque,
        produto.ativo,
        produto.valor,
        produto.data_cadastro,
        produto.categoria,
      ]
    );
    return this.findByCodigo(resultado.rows[0].codigo);
  }

  async update(produto) {
    const resultado = await db.query(
      `update produtos
          set nome = $1, descricao = $2, quantidade_estoque = $3, ativo = $4,
              valor = $5, data_cadastro = $6, categoria = $7
        where codigo = $8 returning codigo`,
      [
        produto.nome,
        produto.descricao,
        produto.quantidade_estoque,
        produto.ativo,
        produto.valor,
        produto.data_cadastro,
        produto.categoria,
        produto.codigo,
      ]
    );
    if (resultado.rowCount === 0) {
      return null;
    }
    return this.findByCodigo(resultado.rows[0].codigo);
  }

  async delete(codigo) {
    const produto = await this.findByCodigo(codigo);
    if (produto === null) {
      return null;
    }
    await db.query('delete from produtos where codigo = $1', [codigo]);
    return produto;
  }

  async countAvaliacoes(codigo) {
    const resultado = await db.query(
      'select count(*) as total from avaliacoes where produto = $1',
      [codigo]
    );
    return parseInt(resultado.rows[0].total, 10);
  }
}

module.exports = ProdutoGateway;
