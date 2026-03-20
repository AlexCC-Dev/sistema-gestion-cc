require('dotenv').config();
const { testStorage } = require('./src/shared/supabase');

testStorage().then(ok => {
  console.log('[TEST] Supabase:', ok ? 'OK' : 'FALLÓ');
});