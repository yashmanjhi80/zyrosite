'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { plans } from "@/lib/data"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function Pricing() {

  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Choose Your Perfect Plan
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Simple, transparent pricing for projects of all sizes. Start for free and upgrade as you grow.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col border-2 transition-all duration-300 hover:border-primary ${plan.recommended ? 'border-primary' : 'border-border/60'}`}
            >
              {plan.recommended && (
                <div className="text-center py-1 bg-primary text-primary-foreground text-sm font-semibold">Most Popular</div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold font-headline">{plan.name}</CardTitle>
                <CardDescription>
                    <span className="text-4xl font-bold text-foreground font-code">
                        {`₹${plan.priceINR}`}
                    </span>
                    <span className="text-muted-foreground">{plan.duration}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature, i) => (
                     <li key={i} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                        <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.recommended ? 'default' : 'outline'}
                  asChild
                >
                  <Link href="https://t.me/mrzyro" target="_blank">Get API Key</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
