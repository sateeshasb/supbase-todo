// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jpujtdfljfierlpdyapa.supabase.co'; // ← replace with your URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwdWp0ZGZsamZpZXJscGR5YXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NjAzNTksImV4cCI6MjA2NTIzNjM1OX0.C_6-T-5jG0TjCiggr_uilH605hsEKCqIxuSY7tHXaYs'; // ← replace with your key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
