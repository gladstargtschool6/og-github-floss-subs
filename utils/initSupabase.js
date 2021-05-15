import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.imdvvfcbtrfewysxgrnr.supabase.co,
  process.env.3c89de2b-ff7c-47ec-bd52-06317b777ab1
);

export { supabase };
