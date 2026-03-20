const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

let supabase = null;

const getSupabase = () => {
  if (supabase) return supabase;

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANNON_KEY) {
    console.log('[SB] Supabase no configurado');
    return null;
  }

  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANNON_KEY
  );

  return supabase;
};

const testStorage = async () => {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const testContent = 'Archivo de prueba';
    const testPath = path.join(process.cwd(), 'test.txt');
    fs.writeFileSync(testPath, testContent);

    const fileContent = fs.readFileSync(testPath);
    const fileName = `test-${Date.now()}.txt`;

    const { error } = await supabase
      .storage
      .from('documentos-cc')
      .upload(fileName, fileContent);

    if (error) throw error;

    const { data: urlData } = supabase
      .storage
      .from('documentos-cc')
      .getPublicUrl(fileName);

    console.log('[SB] Archivo subido:', urlData.publicUrl);

    fs.unlinkSync(testPath);
    return true;

  } catch (error) {
    console.log('[SB] Error:', error.message);
    return false;
  }
};

module.exports = { testStorage };