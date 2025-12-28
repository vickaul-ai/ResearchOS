import { createClient } from "@supabase/supabase-js";
import { describe, it, expect } from "vitest";

// Note: In client-side tests, we might not have access to process.env the same way
// But since we are running via 'vitest run', it runs in Node environment.

describe("Supabase Connection", () => {
  it("should connect to Supabase", async () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Skipping Supabase test: Credentials not provided");
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.from("research_requests").select("count", { count: "exact", head: true });

    if (error) {
       expect(error.message).not.toContain("Invalid API key");
       expect(error.message).not.toContain("JWT");
    }
  });
});
