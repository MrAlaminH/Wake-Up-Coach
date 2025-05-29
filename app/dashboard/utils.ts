import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Ensure that Supabase URL and Key are defined
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseKey) 