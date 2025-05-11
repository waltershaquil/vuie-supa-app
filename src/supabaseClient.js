import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase URL or Anonymous Key is not configured correctly. " +
      "Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file " +
      "and that you have restarted the Vite development server."
  );
} else if (
  supabaseUrl === "YOUR_SUPABASE_URL_PLACEHOLDER" ||
  supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY_PLACEHOLDER"
) {
  console.warn(
    "Supabase URL ou Chave Anónima parecem ser placeholders em supabaseClient.js. " +
      "Verifique se os valores corretos estão carregados do arquivo .env."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
