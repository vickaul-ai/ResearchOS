import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, Calendar, Filter, Search } from "lucide-react";
import { Link } from "wouter";

export default function History() {
  const historyData = [
    {
      id: "1",
      query: "Impact of Quantum Computing on Cryptography",
      date: "Dec 27, 2025",
      status: "complete",
      sources: 4,
      tags: ["Tech", "Security"],
    },
    {
      id: "2",
      query: "Sustainable Aviation Fuel Market Trends 2025",
      date: "Dec 26, 2025",
      status: "complete",
      sources: 4,
      tags: ["Energy", "Market"],
    },
    {
      id: "3",
      query: "CRISPR Applications in Agriculture",
      date: "Dec 25, 2025",
      status: "failed",
      sources: 2,
      tags: ["Bio", "Agri"],
    },
    {
      id: "4",
      query: "History of Roman Concrete Durability",
      date: "Dec 24, 2025",
      status: "complete",
      sources: 3,
      tags: ["History", "Materials"],
    },
    {
      id: "5",
      query: "Generative AI in Healthcare Workflows",
      date: "Dec 23, 2025",
      status: "complete",
      sources: 4,
      tags: ["AI", "Health"],
    },
  ];

  return (
    <Layout>
      <div className="container max-w-6xl py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Research History</h1>
            <p className="text-muted-foreground">
              Archive of all your past deep research sessions.
            </p>
          </div>
          <Button className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search past research..." 
              className="pl-9 bg-background"
            />
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 px-3 py-1">All</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary/80 px-3 py-1">Completed</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary/80 px-3 py-1">Failed</Badge>
          </div>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Research Topic</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sources</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyData.map((item) => (
                <TableRow key={item.id} className="group cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <Link href={`/results/${item.id}`}>
                      <a className="hover:underline decoration-primary underline-offset-4">
                        {item.query}
                      </a>
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" /> {item.date}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={item.status === "complete" ? "default" : "destructive"}
                      className={item.status === "complete" ? "bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:text-green-400 border-0" : "bg-red-500/15 text-red-700 hover:bg-red-500/25 dark:text-red-400 border-0"}
                    >
                      {item.status === "complete" ? "Completed" : "Failed"}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.sources} Agents</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {item.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs font-normal text-muted-foreground">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      View <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </Layout>
  );
}
