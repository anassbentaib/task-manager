import { createClient } from "@supabase/supabase-js";
import { config } from "./index";

if (!config.supabaseUrl || !config.supabaseKey) {
  throw new Error("Missing Supabase credentials");
}

export const supabase = createClient(config.supabaseUrl, config.supabaseKey);
