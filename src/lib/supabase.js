import { createClient } from '@supabase/supabase-js';

// Demo configuration - replace with your actual Supabase credentials
const supabaseUrl = 'https://demo.supabase.co';
const supabaseAnonKey = 'demo-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);