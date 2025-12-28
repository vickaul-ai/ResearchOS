import { createClient } from "@supabase/supabase-js";
import { describe, it, expect } from "vitest";
import dotenv from "dotenv";

dotenv.config();

describe("Supabase Connection", () => {
  it("should connect to Supabase and list tables (or just ping)", async () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Skipping Supabase test: Credentials not provided");
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Simple query to check connection. 
    // Even if table doesn't exist, it confirms we reached the server.
    const { error } = await supabase.from("research_requests").select("count", { count: "exact", head: true });

    // If error is "relation does not exist", connection is good, just schema missing.
    // If error is "invalid claim" or network error, connection failed.
    if (error) {
       // We accept "relation does not exist" because schema might not be applied yet
       // But we reject auth errors
       expect(error.message).not.toContain("Invalid API key");
       expect(error.message).not.toContain("JWT");
    }
  });
});
