const supabase = require('../config/supabaseClient');

async function getAllStudents() {
  const { data, error } = await supabase.from('students').select('*');
  if (error) throw error;
  return data;
}

module.exports = { getAllStudents };
