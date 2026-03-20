const Database = require('better-sqlite3');
const path = require('path');

let db = null;

const getDatabase = () => {
  if (db) return db;

  const dbPath = path.join(process.cwd(), 'local.db');
  console.log('[DB] Ruta:', dbPath);
  
  db = new Database(dbPath);

  // Crear tabla leads
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT,
      status TEXT DEFAULT 'nuevo',
      source TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insertar datos de ejemplo
  const count = db.prepare('SELECT COUNT(*) as count FROM leads').get();
  
  if (count.count === 0) {
    const insert = db.prepare(`
      INSERT INTO leads (name, email, phone, status, source, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insert.run('Juan Pérez', 'juan@ejemplo.com', '555-1234', 'contactado', 'Web', 'Interesado');
    insert.run('María García', 'maria@ejemplo.com', '555-5678', 'nuevo', 'Referido', 'Busca opciones');
    
    console.log('[DB] Datos de ejemplo insertados');
  }

  return db;
};

module.exports = { getDatabase };