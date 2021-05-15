import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.imdvvfcbtrfewysxgrnr.supabase.co,
  process.env.key
);

export { supabase };
