import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pinryxqaeltjwiipkrdb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbnJ5eHFhZWx0andpaXBrcmRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NzYwNDMsImV4cCI6MjA2MjA1MjA0M30.oX40l7K1_vAXzXKdftXKq7iOOuPf_zfL1XNOW1aiyWU';

// Verifica se as variáveis de ambiente foram substituídas.
// Pode ser removido se as chaves estiverem sempre preenchidas diretamente como acima.
if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn(
    "Supabase URL ou Chave Anónima não configurada em supabaseClient.js. " +
    "Por favor, atualize supabaseUrl e supabaseAnonKey no código se não estiverem corretas."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

