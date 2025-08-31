'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Copy, Trash2, PlusCircle, Gauge } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

const apiKeys = [
  {
    key: "zyro_sk_...aBcDeF",
    created: "2023-01-15",
    lastUsed: "2023-06-28",
    status: "Active",
  },
  {
    key: "zyro_sk_...gHiJkL",
    created: "2022-11-20",
    lastUsed: "2023-05-10",
    status: "Active",
  },
  {
    key: "zyro_sk_...mNoPqR",
    created: "2022-09-01",
    lastUsed: "2022-10-05",
    status: "Revoked",
  },
]

export default function ApiKeysPage() {
    const { toast } = useToast();

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to clipboard!",
            description: "The API key has been copied to your clipboard.",
        });
    };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground">
            Manage your API keys for accessing the Zyro API.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Generate New Key
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage Limits</CardTitle>
          <CardDescription>You are on the Pro plan.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center space-x-4">
                <Gauge className="h-10 w-10 text-primary"/>
                <div>
                    <p className="text-sm font-medium leading-none">Requests per Day</p>
                    <p className="text-2xl font-bold">1,234 / 10,000</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Gauge className="h-10 w-10 text-primary"/>
                <div>
                    <p className="text-sm font-medium leading-none">Requests per Month</p>
                    <p className="text-2xl font-bold">34,567 / 300,000</p>
                </div>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Keys</CardTitle>
          <CardDescription>
            These keys can be used to access the API.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.key}>
                    <TableCell className="font-mono">{apiKey.key}</TableCell>
                    <TableCell>{apiKey.created}</TableCell>
                    <TableCell>{apiKey.lastUsed}</TableCell>
                    <TableCell>
                      <Badge variant={apiKey.status === 'Active' ? 'default' : 'destructive'} className={`${apiKey.status === 'Active' ? 'bg-green-500/20 text-green-400 border-none' : 'bg-red-500/20 text-red-400 border-none'}`}>{apiKey.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(apiKey.key)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
