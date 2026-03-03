import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hxfbhpitbqptjsyvsclx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4ZmJocGl0YnFwdGpzeXZzY2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MTMyNDAsImV4cCI6MjA4ODA4OTI0MH0.wfB9zfLEAwDlh1TuonnBt8dDmugsNdrMy--LlDY3Pdo"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);