require('dotenv').config();
const { testConnection } = require('./src/shared/postgres.js');

testConnection().then(ok => {
  console.log('[TEST] PostgreSQL:', ok ? 'OK' : 'FALLÓ');
});