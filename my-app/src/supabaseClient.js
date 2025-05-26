import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bijmqhhptjhfvcfjjzzu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpam1xaGhwdGpoZnZjZmpqenp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NzU5NTYsImV4cCI6MjA2MzM1MTk1Nn0.KXK-YTz6iGPn6Bnm9wN4ygbEzd1XQNWs0htnB8dNQaQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
