import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.REACT_APP_SUPABASE_ANON_KEY;

if (
  supabaseUrl === "YOUR_SUPABASE_URL" ||
  supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY"
) {
  console.warn(
    "Supabase URL ou Chave Anónima não configurada em supabaseClient.js. " +
      "Por favor, atualize supabaseUrl e supabaseAnonKey no código se não estiverem corretas."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
