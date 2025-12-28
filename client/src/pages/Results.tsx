import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ArrowLeft, Copy, Download, ExternalLink, FileText, Share2, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Results() {
  return (
    <Layout>
      <div className="flex h-full flex-col">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold">Impact of Quantum Computing on Cryptography</h1>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Consolidated Report
                </span>
                <span>•</span>
                <span>Dec 27, 2025</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button size="sm" className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
              <FileText className="h-4 w-4" /> Save to Obsidian
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="report" className="flex h-full">
            {/* Sidebar Tabs */}
            <div className="w-64 border-r bg-muted/10 flex flex-col">
              <div className="p-4 font-medium text-sm text-muted-foreground">Views</div>
              <TabsList className="flex flex-col h-auto bg-transparent p-2 gap-1 w-full justify-start">
                <TabsTrigger value="report" className="w-full justify-start px-3 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Sparkles className="mr-2 h-4 w-4" /> Consolidated Report
                </TabsTrigger>
                <Separator className="my-2" />
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Source Data</div>
                <TabsTrigger value="openai" className="w-full justify-start px-3 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  OpenAI Deep Research
                </TabsTrigger>
                <TabsTrigger value="gemini" className="w-full justify-start px-3 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Gemini Deep Research
                </TabsTrigger>
                <TabsTrigger value="claude" className="w-full justify-start px-3 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Claude Extended
                </TabsTrigger>
                <TabsTrigger value="manus" className="w-full justify-start px-3 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Manus Wide Research
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden bg-background">
              <TabsContent value="report" className="h-full m-0">
                <ScrollArea className="h-full">
                  <div className="container max-w-4xl py-10 px-8">
                    <article className="prose prose-slate dark:prose-invert max-w-none">
                      <h1>Executive Summary</h1>
                      <p className="lead">
                        Quantum computing poses a significant existential threat to current public-key cryptography standards (RSA, ECC). However, the transition to Post-Quantum Cryptography (PQC) is well underway, led by NIST's standardization efforts.
                      </p>
                      
                      <div className="my-8 grid grid-cols-2 gap-4 not-prose">
                        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">Timeline to Threat</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">7-15 Years</div>
                            <p className="text-xs text-muted-foreground">Estimated window until cryptographically relevant quantum computers emerge.</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-green-600 dark:text-green-400">PQC Readiness</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">Standardized</div>
                            <p className="text-xs text-muted-foreground">NIST has released first 3 final standards (FIPS 203, 204, 205) in Aug 2024.</p>
                          </CardContent>
                        </Card>
                      </div>

                      <h2>1. The Quantum Threat Landscape</h2>
                      <p>
                        Shor's algorithm allows quantum computers to factor large integers and compute discrete logarithms exponentially faster than classical computers. This effectively breaks:
                      </p>
                      <ul>
                        <li><strong>RSA</strong>: Used for secure web browsing (HTTPS), email encryption, and digital signatures.</li>
                        <li><strong>Elliptic Curve Cryptography (ECC)</strong>: Used in blockchain, mobile messaging, and IoT.</li>
                        <li><strong>Diffie-Hellman</strong>: Used for secure key exchange.</li>
                      </ul>
                      <p>
                        Symmetric encryption (AES) is less affected; Grover's algorithm only provides a quadratic speedup, meaning AES-128 would need to be upgraded to AES-256 to maintain the same security level.
                      </p>

                      <h2>2. Post-Quantum Cryptography (PQC) Standards</h2>
                      <p>
                        The National Institute of Standards and Technology (NIST) has finalized the first set of PQC algorithms designed to withstand quantum attacks:
                      </p>
                      <h3>Key Encapsulation Mechanisms (KEM)</h3>
                      <ul>
                        <li><strong>ML-KEM (Kyber)</strong>: The primary standard for general encryption. It offers balanced performance and security.</li>
                      </ul>
                      <h3>Digital Signatures</h3>
                      <ul>
                        <li><strong>ML-DSA (Dilithium)</strong>: The primary standard for digital signatures.</li>
                        <li><strong>SLH-DSA (SPHINCS+)</strong>: A stateless hash-based signature scheme, slower but more conservative security assumptions.</li>
                      </ul>

                      <h2>3. Strategic Recommendations</h2>
                      <p>
                        Organizations should adopt a "crypto-agile" posture immediately. This involves:
                      </p>
                      <ol>
                        <li><strong>Inventory</strong>: Catalog all cryptographic assets and dependencies.</li>
                        <li><strong>Hybrid Deployment</strong>: Implement PQC algorithms alongside classical ones (hybrid mode) to ensure backward compatibility and defense-in-depth.</li>
                        <li><strong>Vendor Assessment</strong>: Evaluate cloud and software vendors for their PQC roadmaps.</li>
                      </ol>
                    </article>
                    
                    <Separator className="my-10" />
                    
                    <div className="text-sm text-muted-foreground">
                      <h4 className="font-medium text-foreground mb-2">Sources</h4>
                      <ul className="space-y-1">
                        <li>[1] NIST. "NIST Releases First 3 Finalized Post-Quantum Encryption Standards." Aug 2024.</li>
                        <li>[2] McKinsey & Company. "Quantum computing: An emerging ecosystem and industry use cases." 2023.</li>
                        <li>[3] Google Quantum AI. "Our roadmap to a useful quantum computer."</li>
                      </ul>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Placeholder for other tabs */}
              {["openai", "gemini", "claude", "manus"].map((tab) => (
                <TabsContent key={tab} value={tab} className="h-full m-0 p-8">
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                    <div className="p-4 rounded-full bg-muted">
                      <FileText className="h-8 w-8" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-foreground">Raw Output from {tab.charAt(0).toUpperCase() + tab.slice(1)}</h3>
                      <p className="text-sm max-w-md mt-2">
                        This is the raw, unprocessed data returned by the agent. It was used to generate the consolidated report.
                      </p>
                    </div>
                    <Button variant="outline">View Raw JSON</Button>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
