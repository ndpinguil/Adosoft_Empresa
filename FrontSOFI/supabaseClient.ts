import { createClient } from '@supabase/supabase-js';

// Reemplaza con tus propias credenciales de Supabase
const supabaseUrl = 'db.kxnwgrbwcchoiycmuqyo.supabase.co'; // Tu URL de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bndncmJ3Y2Nob2l5Y211cXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDkwNTAsImV4cCI6MjA2MDIyNTA1MH0.GW-vZAR5fohkgi5r2injb-2q1sVlxu-SoLXl5e49_1U'; // Tu clave de anon public API

// Crear cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;



