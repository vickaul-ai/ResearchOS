import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Circle, FileText, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface AgentStatus {
  id: string;
  name: string;
  status: "pending" | "running" | "complete" | "failed";
  message: string;
  progress: number;
}

export default function ResearchProgress() {
  const [, setLocation] = useLocation();
  const [overallProgress, setOverallProgress] = useState(0);
  const [agents, setAgents] = useState<AgentStatus[]>([
    { id: "openai", name: "OpenAI Deep Research", status: "running", message: "Analyzing market reports...", progress: 45 },
    { id: "gemini", name: "Gemini Deep Research", status: "running", message: "Cross-referencing academic papers...", progress: 30 },
    { id: "claude", name: "Claude Extended Thinking", status: "pending", message: "Waiting for queue...", progress: 0 },
    { id: "manus", name: "Manus Wide Research", status: "running", message: "Browsing web sources...", progress: 60 },
  ]);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => {
        const newAgents = prev.map(agent => {
          if (agent.status === "complete") return agent;
          
          // Randomly advance progress
          const increment = Math.floor(Math.random() * 5);
          const newProgress = Math.min(agent.progress + increment, 100);
          
          let newStatus: "pending" | "running" | "complete" | "failed" = agent.status;
          let newMessage = agent.message;

          if (agent.status === "pending" && Math.random() > 0.8) {
            newStatus = "running";
            newMessage = "Starting analysis...";
          }

          if (newProgress === 100) {
            newStatus = "complete";
            newMessage = "Analysis complete";
          } else if (newStatus === "running") {
            const messages = ["Reading documents...", "Extracting key insights...", "Verifying facts...", "Synthesizing data..."];
            if (Math.random() > 0.9) {
              newMessage = messages[Math.floor(Math.random() * messages.length)];
            }
          }

          return { ...agent, progress: newProgress, status: newStatus, message: newMessage };
        });

        // Calculate overall progress
        const total = newAgents.reduce((acc, curr) => acc + curr.progress, 0);
        setOverallProgress(Math.floor(total / 4));

        // Check if all complete
        if (newAgents.every(a => a.status === "complete")) {
          clearInterval(interval);
          setTimeout(() => setLocation("/results/123"), 1000);
        }

        return newAgents;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="container max-w-4xl py-10 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Research in Progress</h1>
            <span className="text-sm font-medium text-muted-foreground">{overallProgress}% Complete</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
          <p className="text-sm text-muted-foreground pt-2">
            Orchestrating multi-agent research for "Impact of Quantum Computing on Cryptography"
          </p>
        </div>

        <div className="grid gap-4">
          {agents.map((agent) => (
            <Card key={agent.id} className={cn(
              "transition-all duration-300",
              agent.status === "running" ? "border-primary/50 shadow-md" : "border-border/50"
            )}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    {agent.status === "pending" && <Circle className="h-5 w-5 text-muted-foreground" />}
                    {agent.status === "running" && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                    {agent.status === "complete" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {agent.status === "failed" && <AlertCircle className="h-5 w-5 text-destructive" />}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{agent.name}</h3>
                      <span className="text-xs text-muted-foreground">{agent.progress}%</span>
                    </div>
                    <Progress value={agent.progress} className="h-1.5 bg-muted" />
                    <p className="text-xs text-muted-foreground animate-pulse">
                      {agent.message}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-muted/30 border-dashed">
          <CardContent className="p-6 flex items-center justify-center gap-3 text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">Consolidation will begin automatically once all agents finish</span>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
