import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY
)?.trim();

function isValidPublicKey(key: string | undefined): key is string {
  if (!key || key.startsWith('sb_secret_')) return false;

  if (key.startsWith('sb_publishable_')) return key.length > 'sb_publishable_'.length;

  const parts = key.split('.');
  if (parts.length !== 3) return false;

  try {
    const claims = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    return claims.role === 'anon';
  } catch {
    return true;
  }
}

function isValidSupabaseUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || (parsed.protocol === 'http:' && parsed.hostname === 'localhost');
  } catch {
    return false;
  }
}

export const supabaseConfigError = !isValidSupabaseUrl(supabaseUrl)
  ? 'Supabase URL is missing or invalid. Set VITE_SUPABASE_URL in .env.local and restart Vite.'
  : !isValidPublicKey(supabaseKey)
    ? 'Supabase publishable key is missing, invalid, or appears to be a secret key. Set VITE_SUPABASE_PUBLISHABLE_KEY in .env.local and restart Vite.'
    : null;

export const supabase = supabaseConfigError
  ? null
  : createClient(supabaseUrl, supabaseKey);
