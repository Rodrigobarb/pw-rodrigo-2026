const db = require('../database/db');
const Avaliacao = require('../entities/Avaliacao');

const SELECT_AVALIACOES = `
  select codigo, autor, email, texto, nota,
         to_char(data,'YYYY-MM-DD') as data, produto
  from avaliacoes
`;

const paraAvaliacao = (linha) =>
  new Avaliacao(
    linha.codigo,
    linha.autor,
    linha.email,
    linha.texto,
    linha.nota,
    linha.data,
    linha.produto
  );

// Gateway: adaptador de interface entre os casos de uso e o banco de dados.
class AvaliacaoGateway {
  async findAll() {
    const resultado = await db.query(`${SELECT_AVALIACOES} order by codigo`);
    return resultado.rows.map(paraAvaliacao);
  }

  async findByCodigo(codigo) {
    const resultado = await db.query(`${SELECT_AVALIACOES} where codigo = $1`, [codigo]);
    if (resultado.rowCount === 0) {
      return null;
    }
    return paraAvaliacao(resultado.rows[0]);
  }

  async findByProduto(produto) {
    const resultado = await db.query(
      `${SELECT_AVALIACOES} where produto = $1 order by codigo`,
      [produto]
    );
    return resultado.rows.map(paraAvaliacao);
  }

  async add(avaliacao) {
    const resultado = await db.query(
      `insert into avaliacoes (autor, email, texto, nota, data, produto)
       values ($1, $2, $3, $4, $5, $6) returning codigo`,
      [
        avaliacao.autor,
        avaliacao.email,
        avaliacao.texto,
        avaliacao.nota,
        avaliacao.data,
        avaliacao.produto,
      ]
    );
    return this.findByCodigo(resultado.rows[0].codigo);
  }

  async update(avaliacao) {
    const resultado = await db.query(
      `update avaliacoes
          set autor = $1, email = $2, texto = $3, nota = $4, data = $5, produto = $6
        where codigo = $7 returning codigo`,
      [
        avaliacao.autor,
        avaliacao.email,
        avaliacao.texto,
        avaliacao.nota,
        avaliacao.data,
        avaliacao.produto,
        avaliacao.codigo,
      ]
    );
    if (resultado.rowCount === 0) {
      return null;
    }
    return this.findByCodigo(resultado.rows[0].codigo);
  }

  async delete(codigo) {
    const avaliacao = await this.findByCodigo(codigo);
    if (avaliacao === null) {
      return null;
    }
    await db.query('delete from avaliacoes where codigo = $1', [codigo]);
    return avaliacao;
  }
}

module.exports = AvaliacaoGateway;
