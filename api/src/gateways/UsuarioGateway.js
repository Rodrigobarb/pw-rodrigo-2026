const db = require('../database/db');
const Usuario = require('../entities/Usuario');

const paraUsuario = (linha) =>
  new Usuario(linha.email, linha.senha, linha.tipo, linha.telefone, linha.nome);

// Gateway: adaptador de interface entre os casos de uso e o banco de dados.
class UsuarioGateway {
  async findAll() {
    const resultado = await db.query(
      'select email, senha, tipo, telefone, nome from usuarios order by nome'
    );
    return resultado.rows.map(paraUsuario);
  }

  async findByEmail(email) {
    const resultado = await db.query(
      'select email, senha, tipo, telefone, nome from usuarios where email = $1',
      [email]
    );
    if (resultado.rowCount === 0) {
      return null;
    }
    return paraUsuario(resultado.rows[0]);
  }

  async add(usuario) {
    const resultado = await db.query(
      `insert into usuarios (email, senha, tipo, telefone, nome)
       values ($1, $2, $3, $4, $5) returning email, senha, tipo, telefone, nome`,
      [usuario.email, usuario.senha, usuario.tipo, usuario.telefone, usuario.nome]
    );
    return paraUsuario(resultado.rows[0]);
  }

  async update(usuario) {
    const resultado = await db.query(
      `update usuarios set senha = $1, tipo = $2, telefone = $3, nome = $4
        where email = $5 returning email, senha, tipo, telefone, nome`,
      [usuario.senha, usuario.tipo, usuario.telefone, usuario.nome, usuario.email]
    );
    if (resultado.rowCount === 0) {
      return null;
    }
    return paraUsuario(resultado.rows[0]);
  }

  async delete(email) {
    const resultado = await db.query(
      'delete from usuarios where email = $1 returning email, senha, tipo, telefone, nome',
      [email]
    );
    if (resultado.rowCount === 0) {
      return null;
    }
    return paraUsuario(resultado.rows[0]);
  }
}

module.exports = UsuarioGateway;
