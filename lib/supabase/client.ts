import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Provide dummy values if env vars are not set (dev mode without Supabase)
  // The actual requests will fail gracefully
  return createBrowserClient(
    supabaseUrl || 'http://localhost:54321',
    supabaseKey || 'dummy-key-for-dev'
  )
}
