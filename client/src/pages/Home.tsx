import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock, FileText, Globe, Plus, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const [prompt, setPrompt] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      setLocation(`/new?q=${encodeURIComponent(prompt)}`);
    }
  };

  const recentResearch = [
    {
      id: 1,
      title: "Impact of Quantum Computing on Cryptography",
      date: "2 hours ago",
      status: "complete",
      sources: 4,
    },
    {
      id: 2,
      title: "Sustainable Aviation Fuel Market Trends 2025",
      date: "Yesterday",
      status: "complete",
      sources: 4,
    },
    {
      id: 3,
      title: "CRISPR Applications in Agriculture",
      date: "2 days ago",
      status: "failed",
      sources: 2,
    },
  ];

  return (
    <Layout>
      <div className="container max-w-5xl py-10 space-y-12">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center space-y-6 text-center pt-10 pb-6">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            <span>Powered by OpenAI, Gemini, Claude & Manus</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Deep Research, <br /> Orchestrated.
          </h1>
          
          <p className="max-w-[600px] text-lg text-muted-foreground">
            One prompt to rule them all. We refine your question, dispatch it to the world's best AI researchers, and consolidate the truth.
          </p>

          <form onSubmit={handleSearch} className="w-full max-w-2xl relative group">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
            <div className="relative flex items-center">
              <Input 
                className="h-14 rounded-full border-border/50 bg-background/80 pl-6 pr-14 text-lg shadow-sm backdrop-blur-md transition-all focus-visible:ring-primary/20 focus-visible:border-primary/50" 
                placeholder="What do you want to research today?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button 
                size="icon" 
                type="submit"
                className="absolute right-2 h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </section>

        {/* Recent Activity */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Recent Research</h2>
            <Link href="/history">
              <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center">
                View all <ArrowRight className="ml-1 h-3 w-3" />
              </a>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {recentResearch.map((item) => (
              <Link key={item.id} href={`/research/${item.id}`}>
                <a className="group block h-full">
                  <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-md bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          item.status === "complete" 
                            ? "bg-green-500/10 text-green-600 dark:text-green-400" 
                            : "bg-red-500/10 text-red-600 dark:text-red-400"
                        )}>
                          {item.status === "complete" ? "Completed" : "Failed"}
                        </div>
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <CardTitle className="text-base font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Globe className="mr-1.5 h-3.5 w-3.5" />
                          {item.sources} AI Sources
                        </span>
                        <span>{item.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
            
            <Link href="/new">
              <a className="group block h-full">
                <Card className="h-full border-dashed border-border/60 bg-transparent hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center text-center p-6 cursor-pointer">
                  <div className="mb-3 rounded-full bg-primary/10 p-3 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Plus className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-foreground">New Research</h3>
                  <p className="text-sm text-muted-foreground mt-1">Start a new deep dive</p>
                </Card>
              </a>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid gap-8 md:grid-cols-3 pt-8 border-t border-border/40">
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">Fast Refinement</h3>
            <p className="text-sm text-muted-foreground">
              We use lightweight models to clarify your intent before engaging the heavy lifters.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">Multi-Agent Search</h3>
            <p className="text-sm text-muted-foreground">
              Parallel execution across OpenAI, Gemini, Claude, and Manus for maximum coverage.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">Obsidian Ready</h3>
            <p className="text-sm text-muted-foreground">
              Reports are automatically formatted and synced to your vault with rich metadata.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
