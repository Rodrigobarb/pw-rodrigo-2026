const db = require('../database/db');
const Categoria = require('../entities/Categoria');

// Gateway: adaptador de interface entre os casos de uso e o banco de dados.
class CategoriaGateway {
  async findAll() {
    const resultado = await db.query('select codigo, nome from categorias order by codigo');
    return resultado.rows.map((linha) => new Categoria(linha.codigo, linha.nome));
  }

  async findByCodigo(codigo) {
    const resultado = await db.query(
      'select codigo, nome from categorias where codigo = $1',
      [codigo]
    );
    if (resultado.rowCount === 0) {
      return null;
    }
    const linha = resultado.rows[0];
    return new Categoria(linha.codigo, linha.nome);
  }

  async add(categoria) {
    const resultado = await db.query(
      'insert into categorias (nome) values ($1) returning codigo, nome',
      [categoria.nome]
    );
    const linha = resultado.rows[0];
    return new Categoria(linha.codigo, linha.nome);
  }

  async update(categoria) {
    const resultado = await db.query(
      'update categorias set nome = $1 where codigo = $2 returning codigo, nome',
      [categoria.nome, categoria.codigo]
    );
    if (resultado.rowCount === 0) {
      return null;
    }
    const linha = resultado.rows[0];
    return new Categoria(linha.codigo, linha.nome);
  }

  async delete(codigo) {
    const resultado = await db.query(
      'delete from categorias where codigo = $1 returning codigo, nome',
      [codigo]
    );
    if (resultado.rowCount === 0) {
      return null;
    }
    const linha = resultado.rows[0];
    return new Categoria(linha.codigo, linha.nome);
  }

  async countProdutos(codigo) {
    const resultado = await db.query(
      'select count(*) as total from produtos where categoria = $1',
      [codigo]
    );
    return parseInt(resultado.rows[0].total, 10);
  }
}

module.exports = CategoriaGateway;
