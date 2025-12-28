import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowRight, Bot, Check, Loader2, MessageSquare, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

export default function NewResearch() {
  const [location, setLocation] = useLocation();
  const [step, setStep] = useState<"input" | "refining" | "review">("input");
  const [prompt, setPrompt] = useState("");
  const [refinedPrompt, setRefinedPrompt] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  
  // Parse query param for initial prompt
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get("q");
    if (q && step === "input") {
      setPrompt(q);
      handleRefine(q);
    }
  }, []);

  const handleRefine = (inputPrompt: string) => {
    setStep("refining");
    setIsRefining(true);
    
    // Simulate API call to refine prompt
    setTimeout(() => {
      setRefinedPrompt(`Comprehensive analysis of: ${inputPrompt}\n\nKey Research Areas:\n1. Historical context and evolution\n2. Current market dynamics and key players\n3. Technological breakthroughs in the last 24 months\n4. Regulatory landscape and future outlook\n\nTarget Sources: Academic journals, Industry reports, News archives`);
      setIsRefining(false);
      setStep("review");
    }, 2000);
  };

  const handleStartResearch = () => {
    // Navigate to progress page with ID (simulated)
    setLocation("/research/123");
  };

  return (
    <Layout>
      <div className="container max-w-3xl py-10 h-full flex flex-col justify-center min-h-[80vh]">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">New Research Task</h1>
            <p className="text-muted-foreground">
              {step === "input" && "What would you like to investigate?"}
              {step === "refining" && "Refining your query for optimal results..."}
              {step === "review" && "Review the optimized research plan"}
            </p>
          </div>

          {step === "input" && (
            <Card className="border-border/60 shadow-lg">
              <CardContent className="pt-6">
                <Textarea 
                  placeholder="Describe your research topic in detail..." 
                  className="min-h-[200px] text-lg resize-none border-0 focus-visible:ring-0 p-0"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  autoFocus
                />
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
                <span className="text-xs text-muted-foreground flex items-center">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" />
                  AI will refine this for better results
                </span>
                <Button 
                  onClick={() => handleRefine(prompt)} 
                  disabled={!prompt.trim()}
                  className="gap-2"
                >
                  Refine Prompt <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === "refining" && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                <div className="relative bg-background rounded-full p-4 border border-border shadow-sm">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              </div>
              <div className="space-y-2 text-center max-w-md">
                <h3 className="font-medium">Analyzing intent...</h3>
                <p className="text-sm text-muted-foreground">
                  We're structuring your query to get the best data from OpenAI, Gemini, and Claude.
                </p>
              </div>
            </div>
          )}

          {step === "review" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-muted/30 border-dashed">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" /> Original Input
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{prompt}</p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
                      <Bot className="h-4 w-4" /> Optimized Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap font-medium">{refinedPrompt}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setStep("input")}>
                  Edit
                </Button>
                <Button onClick={handleStartResearch} className="gap-2 pl-4 pr-5">
                  <Check className="h-4 w-4" /> Approve & Start Research
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
