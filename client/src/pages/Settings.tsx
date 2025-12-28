import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Database, Key, Save, Shield } from "lucide-react";

export default function Settings() {
  return (
    <Layout>
      <div className="container max-w-4xl py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your API keys, integrations, and preferences.
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="obsidian">Obsidian Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Appearance & Behavior</CardTitle>
                <CardDescription>Customize how ResearchOS looks and feels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable dark mode for the interface.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-Consolidate</Label>
                    <p className="text-sm text-muted-foreground">Automatically generate a consolidated report when all agents finish.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api-keys">
            <Card>
              <CardHeader>
                <CardTitle>AI Provider Keys</CardTitle>
                <CardDescription>
                  Your keys are stored securely in Supabase and encrypted at rest.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="openai">OpenAI API Key</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="openai" type="password" placeholder="sk-..." className="pl-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">Required for Deep Research.</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="anthropic">Anthropic API Key</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="anthropic" type="password" placeholder="sk-ant-..." className="pl-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">Required for Claude and Consolidation.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gemini">Google Gemini API Key</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="gemini" type="password" placeholder="AIza..." className="pl-9" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-6 py-4">
                <Button className="ml-auto gap-2">
                  <Save className="h-4 w-4" /> Save Keys
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="obsidian">
            <Card>
              <CardHeader>
                <CardTitle>Obsidian Integration</CardTitle>
                <CardDescription>
                  Configure how reports are saved to your Obsidian vault.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Integration Method</Label>
                  <RadioGroup defaultValue="mcp">
                    <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="mcp" id="mcp" />
                      <Label htmlFor="mcp" className="flex-1 cursor-pointer">
                        <div className="font-medium">MCP Server (Recommended)</div>
                        <div className="text-sm text-muted-foreground">
                          Uses the Obsidian Local REST API for rich integration (tags, frontmatter).
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="filesystem" id="filesystem" />
                      <Label htmlFor="filesystem" className="flex-1 cursor-pointer">
                        <div className="font-medium">Direct File System</div>
                        <div className="text-sm text-muted-foreground">
                          Writes Markdown files directly to your vault folder. Simple fallback.
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vault-path">Vault Path</Label>
                  <div className="relative">
                    <Database className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="vault-path" placeholder="/Users/username/Documents/Obsidian/MyVault" className="pl-9" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-key">Obsidian Local REST API Key</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="api-key" type="password" placeholder="Ob..." className="pl-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">Only required for MCP method.</p>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-6 py-4">
                <Button className="ml-auto gap-2">
                  <Save className="h-4 w-4" /> Save Configuration
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
