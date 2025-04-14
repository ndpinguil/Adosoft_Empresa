import { createClient } from '@supabase/supabase-js';

// Tu URL y clave de Supabase
const supabaseUrl = 'https://kxnwgrbwcchoiycmuqyo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bndncmJ3Y2Nob2l5Y211cXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDkwNTAsImV4cCI6MjA2MDIyNTA1MH0.GW-vZAR5fohkgi5r2injb-2q1sVlxu-SoLXl5e49_1U';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
