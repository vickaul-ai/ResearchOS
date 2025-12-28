import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import History from "@/pages/History";
import Home from "@/pages/Home";
import NewResearch from "@/pages/NewResearch";
import NotFound from "@/pages/NotFound";
import ResearchProgress from "@/pages/ResearchProgress";
import Results from "@/pages/Results";
import Settings from "@/pages/Settings";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/new" component={NewResearch} />
      <Route path="/research/:id" component={ResearchProgress} />
      <Route path="/results/:id" component={Results} />
      <Route path="/history" component={History} />
      <Route path="/settings" component={Settings} />
      <Route path="/dashboard" component={History} /> {/* Reuse History for Dashboard for now */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
