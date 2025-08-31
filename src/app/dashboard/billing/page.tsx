'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
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
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const paymentHistory = [
  { date: "2023-06-01", amount: "₹499.00", status: "Paid", invoiceId: "INV-001" },
  { date: "2023-05-01", amount: "₹499.00", status: "Paid", invoiceId: "INV-002" },
  { date: "2023-04-01", amount: "₹499.00", status: "Paid", invoiceId: "INV-003" },
  { date: "2023-03-01", amount: "₹49.00", status: "Paid", invoiceId: "INV-004" },
]

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Billing</h1>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
            <Card>
                <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>You are currently on the <span className="font-bold text-primary">Pro</span> plan.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div>
                    <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Monthly Usage</span>
                    <span className="text-sm text-muted-foreground">34,567 / 300,000 requests (11.5%)</span>
                    </div>
                    <Progress value={11.5} />
                </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Next payment of ₹499 on July 1, 2023</p>
                    <Button variant="outline">Cancel Subscription</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                    Your recent payments.
                </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paymentHistory.map((payment) => (
                        <TableRow key={payment.invoiceId}>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>{payment.amount}</TableCell>
                            <TableCell>
                            <Badge variant={payment.status === 'Paid' ? 'default' : 'destructive'} className={`${payment.status === 'Paid' ? 'bg-green-500/20 text-green-400 border-none' : ''}`}>{payment.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                            <Button variant="outline" size="sm">Download Invoice</Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                   </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card className="bg-primary/10 border-primary">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Upgrade Your Plan</CardTitle>
                    <CardDescription>Get more features and higher limits by upgrading.</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p>Unlock 4K video downloads, priority support, and up to 1,000,000 requests per month.</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg">View Plans</Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  )
}
