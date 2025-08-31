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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge"

const chartConfig = {
  requests: {
    label: "Requests",
    color: "hsl(var(--chart-1))",
  },
}

const chartData = [
  { endpoint: "/audio/get", requests: 1250 },
  { endpoint: "/video/get", requests: 830 },
  { endpoint: "/search", requests: 621 },
  { endpoint: "/playlist/list", requests: 450 },
  { endpoint: "/info", requests: 312 },
]

const usageLogs = [
  { timestamp: "2023-06-29 10:45:12", endpoint: "/audio/get", status: 200, ip: "192.168.1.1" },
  { timestamp: "2023-06-29 10:45:10", endpoint: "/video/get", status: 200, ip: "192.168.1.1" },
  { timestamp: "2023-06-29 10:44:55", endpoint: "/audio/get", status: 200, ip: "10.0.0.5" },
  { timestamp: "2023-06-29 10:44:30", endpoint: "/search", status: 404, ip: "192.168.1.1" },
  { timestamp: "2023-06-29 10:43:01", endpoint: "/audio/get", status: 200, ip: "172.16.0.10" },
  { timestamp: "2023-06-28 18:22:05", endpoint: "/playlist/list", status: 200, ip: "192.168.1.1" },
  { timestamp: "2023-06-28 18:21:50", endpoint: "/info", status: 500, ip: "10.0.0.5" },
]

export default function UsagePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Usage</h1>

       <Card>
        <CardHeader>
          <CardTitle>Top Endpoints</CardTitle>
          <CardDescription>
            Most frequently accessed endpoints in the last 7 days.
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-0 sm:pl-2">
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <RechartsBarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="endpoint"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={120}
                className="text-xs sm:text-sm"
              />
              <XAxis dataKey="requests" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="requests" fill="var(--color-requests)" radius={4} />
            </RechartsBarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>API Logs</CardTitle>
          <CardDescription>
            A log of your recent API requests.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input type="date" className="max-w-full sm:max-w-sm"/>
            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by endpoint" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Endpoints</SelectItem>
                    <SelectItem value="audio">/audio/get</SelectItem>
                    <SelectItem value="video">/video/get</SelectItem>
                    <SelectItem value="search">/search</SelectItem>
                  </SelectContent>
                </Select>
                 <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="200">200 OK</SelectItem>
                    <SelectItem value="404">404 Not Found</SelectItem>
                    <SelectItem value="500">500 Error</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <Button className="w-full sm:w-auto">Filter</Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usageLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-xs sm:text-sm">{log.timestamp}</TableCell>
                    <TableCell className="font-mono text-xs sm:text-sm">{log.endpoint}</TableCell>
                    <TableCell>
                       <Badge variant={
                          log.status === 200 ? 'default' : 
                          log.status === 404 ? 'secondary' :
                          'destructive'
                        } className={`${
                          log.status === 200 ? 'bg-green-500/20 text-green-400 border-none' : 
                          log.status === 404 ? 'bg-yellow-500/20 text-yellow-400 border-none' :
                          ''
                        }`}>
                        {log.status}
                       </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs sm:text-sm">{log.ip}</TableCell>
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
