import { createClient } from "@supabase/supabase-js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { AIService } from "./ai-services";
import { ManusAutomator } from "./manus-automation";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// --- API Routes ---

// 1. Refine Prompt
app.post("/api/refine", async (req, res) => {
  const { prompt, model, userId } = req.body;
  
  try {
    const { data: settings } = await supabase
      .from("user_settings")
      .select("openai_api_key")
      .eq("user_id", userId)
      .single();

    if (!settings?.openai_api_key) {
      return res.status(400).json({ error: "OpenAI API key not found in settings" });
    }

    const aiService = new AIService(settings.openai_api_key);
    const refinedPrompt = await aiService.refinePrompt(prompt, model);

    res.json({ refinedPrompt });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Start Research (Orchestrator)
app.post("/api/start-research", async (req, res) => {
  const { requestId, userId } = req.body;

  try {
    await supabase
      .from("research_requests")
      .update({ status: "running" })
      .eq("id", requestId);

    const { data: request } = await supabase
      .from("research_requests")
      .select("*")
      .eq("id", requestId)
      .single();

    const { data: settings } = await supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", userId)
      .single();

    const agents = settings.enabled_agents || ["openai", "gemini", "claude", "manus"];
    const aiService = new AIService(
      settings.openai_api_key,
      settings.anthropic_api_key,
      settings.gemini_api_key
    );

    // Spawn tasks
    agents.forEach(async (agent: string) => {
      const { data: task } = await supabase
        .from("research_tasks")
        .insert({
          request_id: requestId,
          platform: agent,
          status: "running",
          started_at: new Date().toISOString()
        })
        .select()
        .single();

      if (!task) return;

      try {
        let result = "";
        
        if (agent === "openai") {
          result = await aiService.runOpenAIResearch(request.refined_prompt);
        } else if (agent === "gemini") {
          result = await aiService.runGeminiResearch(request.refined_prompt);
        } else if (agent === "claude") {
          result = await aiService.runClaudeResearch(request.refined_prompt);
        } else if (agent === "manus") {
          const automator = new ManusAutomator();
          result = await automator.runResearch(request.refined_prompt);
        }

        await supabase
          .from("research_tasks")
          .update({
            status: "complete",
            result_text: result,
            completed_at: new Date().toISOString()
          })
          .eq("id", task.id);

      } catch (err: any) {
        await supabase
          .from("research_tasks")
          .update({
            status: "failed",
            error_message: err.message,
            completed_at: new Date().toISOString()
          })
          .eq("id", task.id);
      }
    });

    res.json({ message: "Research started", tasks: agents.length });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Consolidate Results
app.post("/api/consolidate", async (req, res) => {
  const { requestId, userId } = req.body;

  try {
    const { data: tasks } = await supabase
      .from("research_tasks")
      .select("platform, result_text")
      .eq("request_id", requestId)
      .eq("status", "complete");

    const { data: request } = await supabase
      .from("research_requests")
      .select("refined_prompt")
      .eq("id", requestId)
      .single();

    const { data: settings } = await supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!tasks || tasks.length === 0) {
      return res.status(400).json({ error: "No completed tasks to consolidate" });
    }

    const aiService = new AIService(
      settings.openai_api_key,
      settings.anthropic_api_key,
      settings.gemini_api_key
    );

    if (!request) throw new Error("Request not found");
    
    const consolidatedReport = await aiService.consolidateResults(
      request.refined_prompt,
      tasks.map(t => ({ platform: t.platform, content: t.result_text })),
      settings.consolidation_model
    );

    const { data: report } = await supabase
      .from("consolidated_reports")
      .insert({
        request_id: requestId,
        content: consolidatedReport,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    await supabase
      .from("research_requests")
      .update({ status: "complete", completed_at: new Date().toISOString() })
      .eq("id", requestId);

    res.json({ report });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
