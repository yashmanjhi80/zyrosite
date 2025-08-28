import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { features } from "@/lib/data"

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Powerful Features for Your Application
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our API is built to be simple, reliable, and powerful, giving you the tools you need to succeed.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="pt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
