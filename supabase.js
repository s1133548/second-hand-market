// js/supabase.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://jdxdqmggyxhdycfmvygw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeGRxbWdneXhoZHljZm12eWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0OTAxNzYsImV4cCI6MjA3OTA2NjE3Nn0.HFwu8W_oAsY-enrdYbe-pqBYaWY6TECAruW-yINYNrE"
);
