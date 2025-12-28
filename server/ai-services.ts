import { OpenAI } from "openai";
import { Anthropic } from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

export class AIService {
  private openai: OpenAI | null = null;
  private anthropic: Anthropic | null = null;
  private gemini: GoogleGenerativeAI | null = null;

  constructor(
    openaiKey?: string,
    anthropicKey?: string,
    geminiKey?: string
  ) {
    if (openaiKey) this.openai = new OpenAI({ apiKey: openaiKey });
    if (anthropicKey) this.anthropic = new Anthropic({ apiKey: anthropicKey });
    if (geminiKey) this.gemini = new GoogleGenerativeAI(geminiKey);
  }

  async refinePrompt(prompt: string, model: string = "gpt-4o-mini"): Promise<string> {
    if (!this.openai) throw new Error("OpenAI API key not configured");

    const completion = await this.openai.chat.completions.create({
      model: model,
      messages: [
        { 
          role: "system", 
          content: "You are an expert research strategist. Your goal is to refine the user's raw query into a comprehensive, structured research plan. \n\nOutput Format:\n1. **Research Goal**: A clear statement of what we are trying to find.\n2. **Key Questions**: 3-5 specific questions to investigate.\n3. **Search Strategy**: Keywords and domains to target.\n\nKeep it concise and actionable." 
        },
        { role: "user", content: prompt }
      ]
    });

    return completion.choices[0].message.content || "";
  }

  async runOpenAIResearch(prompt: string): Promise<string> {
    if (!this.openai) throw new Error("OpenAI API key not configured");
    
    // In a real scenario, this would call the deep research endpoint or an agent loop
    const completion = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a deep research agent. Conduct a thorough investigation on the user's topic. Provide a detailed report with facts and figures." },
        { role: "user", content: prompt }
      ]
    });

    return completion.choices[0].message.content || "";
  }

  async runClaudeResearch(prompt: string): Promise<string> {
    if (!this.anthropic) throw new Error("Anthropic API key not configured");

    const msg = await this.anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      messages: [
        { role: "user", content: `Please conduct deep research on the following topic. Be exhaustive and detailed:\n\n${prompt}` }
      ]
    });

    // @ts-ignore
    return msg.content[0].text;
  }

  async runGeminiResearch(prompt: string): Promise<string> {
    if (!this.gemini) throw new Error("Gemini API key not configured");

    const model = this.gemini.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(`Act as a senior researcher. Investigate this topic deeply:\n\n${prompt}`);
    return result.response.text();
  }

  async consolidateResults(
    originalPrompt: string, 
    results: { platform: string, content: string }[], 
    model: string = "claude-3-5-sonnet-20241022"
  ): Promise<string> {
    // We prefer Claude for consolidation due to large context window and writing quality
    if (model.includes("claude")) {
      if (!this.anthropic) throw new Error("Anthropic API key required for consolidation");
      
      const inputs = results.map(r => `--- REPORT FROM ${r.platform.toUpperCase()} ---\n${r.content}\n`).join("\n");
      
      const msg = await this.anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 8192,
        messages: [
          { 
            role: "user", 
            content: `You are a Lead Research Editor. I have collected research reports from multiple AI agents on the topic: "${originalPrompt}".\n\nPlease synthesize these into a single, master research report.\n\nRules:\n1. Prioritize readability and narrative flow.\n2. Use specific citations [Agent Name] only for specific data points, quotes, or controversial claims.\n3. Resolve conflicts if agents disagree.\n4. Output in clean Markdown.\n\nHere are the source reports:\n\n${inputs}` 
          }
        ]
      });

      // @ts-ignore
      return msg.content[0].text;
    } 
    
    // Fallback to OpenAI if requested
    if (model.includes("gpt")) {
      if (!this.openai) throw new Error("OpenAI API key required for consolidation");
      
      const inputs = results.map(r => `--- REPORT FROM ${r.platform.toUpperCase()} ---\n${r.content}\n`).join("\n");

      const completion = await this.openai.chat.completions.create({
        model: model,
        messages: [
          { role: "system", content: "You are a Lead Research Editor. Synthesize the provided reports into a single master report." },
          { role: "user", content: `Topic: ${originalPrompt}\n\nSources:\n${inputs}` }
        ]
      });

      return completion.choices[0].message.content || "";
    }

    throw new Error("Unsupported consolidation model");
  }
}
