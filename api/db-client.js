import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL;

const supabaseKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET;

if (!supabaseUrl) {
  throw new Error('Missing Supabase URL environment variable');
}

if (!supabaseKey) {
  throw new Error('Missing Supabase secret key environment variable');
}

const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

export default supabase;