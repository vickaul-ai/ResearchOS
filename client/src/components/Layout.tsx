import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  History,
  Home,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Settings,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Plus, label: "New Research", href: "/new" },
    { icon: History, label: "History", href: "/history" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  ];

  const bottomNavItems = [
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans antialiased selection:bg-primary/10 selection:text-primary">
      {/* Sidebar */}
      <aside
        className={cn(
          "relative flex flex-col border-r border-border/40 bg-sidebar transition-all duration-300 ease-in-out",
          collapsed ? "w-[60px]" : "w-[240px]"
        )}
      >
        {/* Logo Area */}
        <div className="flex h-14 items-center px-4 border-b border-border/40">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <span
              className={cn(
                "font-semibold tracking-tight transition-opacity duration-300",
                collapsed ? "opacity-0 w-0" : "opacity-100"
              )}
            >
              ResearchOS
            </span>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {navItems.map((item, index) => {
              const isActive = location === item.href;
              return (
                <Link key={index} href={item.href}>
                  <a
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-muted-foreground",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span
                      className={cn(
                        "transition-all duration-300 overflow-hidden whitespace-nowrap",
                        collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                      )}
                    >
                      {item.label}
                    </span>
                  </a>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Bottom Actions */}
        <div className="mt-auto border-t border-border/40 p-2">
          <nav className="grid gap-1">
            {bottomNavItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <a
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span
                    className={cn(
                      "transition-all duration-300 overflow-hidden whitespace-nowrap",
                      collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                    )}
                  >
                    {item.label}
                  </span>
                </a>
              </Link>
            ))}
            <button
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span
                className={cn(
                  "transition-all duration-300 overflow-hidden whitespace-nowrap",
                  collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                )}
              >
                Log out
              </span>
            </button>
          </nav>
        </div>

        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-1/2 z-20 h-6 w-6 -translate-y-1/2 rounded-full border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden bg-background/50 backdrop-blur-sm">
        <div className="h-full w-full overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
