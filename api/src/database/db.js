const { Pool } = require('pg');

require('dotenv').config();

// Frameworks & Drivers: unico ponto do projeto que conhece o PostgreSQL.
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'pw_rodrigo_2026',
});

const query = async (sql, params) => {
  const resultado = await pool.query(sql, params);
  return resultado;
};

module.exports = { pool, query };
