import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nokrrzwaewtkuofeagdq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5va3JyendhZXd0a3VvZmVhZ2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0MzQ3MzEsImV4cCI6MjAxNTAxMDczMX0.rx8O2Kw9mbx6RcmU89RXtBf_VEanba4QCkE9kJd2ZIQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
