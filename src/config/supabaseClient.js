import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eeqhpfuoxqacsghvkpbp.supabase.co';
const supabaseAnonKey = 'sb_publishable_bviekUHw3f3VykCEpA_1CQ_ARx8LnmX';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);