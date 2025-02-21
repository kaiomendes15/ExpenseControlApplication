// const { Pool } = require('pg');

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'ControleGastos',
//     password: '141517',
//     port: 5432
// });


require('dotenv').config();
const { Pool } = require('pg');

const { DATABASE_URL } = process.env;

const pool = new Pool({
    connectionString: DATABASE_URL, // O correto é connectionString
    ssl: { rejectUnauthorized: false } // Necessário para Neon
  });
  

async function getPgVersion() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT version()');
    console.log(result.rows[0]);
  } finally {
    client.release();
  }
}

getPgVersion();



// pool.connect()
//     .then(() => console.log("Conectado ao PostgresSQL localmente."))
//     .catch(err => console.log(`Erro na conexão: ${err}`))
/*
* Por que não chamar pool.connect() antes de exportar? Se fizer, Isso abriria uma única conexão imediatamente, mas pode trazer problemas como: 
?   Manter uma única conexão aberta indefinidamente, o que pode causar estouro de conexões quando várias requisições forem feitas simultaneamente.
?   Desperdício de recursos ao manter uma conexão ativa o tempo todo, mesmo quando ninguém está usando.
?   Impedir que o Pool gerencie as conexões automaticamente, pois estaríamos manualmente segurando apenas uma conexão.
*/

module.exports = pool;