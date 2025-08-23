'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { plans } from "@/lib/data"
import { CheckCircle2 } from "lucide-react"

export default function Pricing() {
  const { toast } = useToast();

  const handlePurchaseClick = (planName: string) => {
    toast({
      title: `Added ${planName} to cart!`,
      description: "You can proceed to checkout from your cart.",
    });
  };

  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Choose Your Perfect Plan
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Simple, transparent pricing. All plans come with our core features, and you can upgrade any time.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3 xl:grid-cols-5 md:grid-cols-2">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col border-2 transition-all duration-300 hover:border-primary ${plan.name === 'Iron' ? 'border-primary' : 'border-border/60'}`}
            >
              {plan.name === 'Iron' && (
                <div className="text-center py-1 bg-primary text-primary-foreground text-sm font-semibold">Most Popular</div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold font-headline">{plan.name}</CardTitle>
                <CardDescription>
                    <span className="text-4xl font-bold text-foreground font-code">${plan.priceUSD}</span>
                    <span className="text-muted-foreground">/mo</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    <span><span className="font-bold">{plan.ramGB} GB</span> RAM</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    <span><span className="font-bold">{plan.vcpu} vCPU</span> Core</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    <span><span className="font-bold">{plan.storageGB} GB</span> NVMe Storage</span>
                  </li>
                  {plan.features.map((feature, i) => (
                     <li key={i} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground/70 mr-2" />
                        <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.name === 'Iron' ? 'default' : 'outline'}
                  onClick={() => handlePurchaseClick(plan.name)}
                >
                  Purchase Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
