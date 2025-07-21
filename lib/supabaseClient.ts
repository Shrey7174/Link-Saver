// lib/supabaseClient.ts


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rnhvcmxkyqfpfqeazezj.supabase.co'
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuaHZjbXhreXFmcGZxZWF6ZXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MTgwMzUsImV4cCI6MjA2ODQ5NDAzNX0.hRkXPN-fmUm9YG2EY0J5rkU2s-kNx3eDyCd1fcF-JDQ';
export const supabase = createClient(supabaseUrl, supabaseAnonKey)