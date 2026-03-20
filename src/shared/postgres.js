const { Pool } = require('pg');
require('dotenv').config();

let pool = null;

const getPool = () => {
  if (pool) return pool;

  if (!process.env.DATABASE_PUBLIC_URL) {
    console.log('[PG] DATABASE_PUBLIC_URL no configurada');
    return null;
  }

  pool = new Pool({
    connectionString: process.env.DATABASE_PUBLIC_URL,
    ssl: { rejectUnauthorized: false }
  });

  return pool;
};

const testConnection = async () => {
  const pool = getPool();
  if (!pool) return false;

  try {
    const client = await pool.connect();
    console.log('[PG] Conectado a PostgreSQL');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        phone TEXT,
        status TEXT DEFAULT 'nuevo',
        source TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    client.release();
    return true;
  } catch (error) {
    console.log('[PG] Error:', error.message);
    return false;
  }
};

module.exports = { testConnection };