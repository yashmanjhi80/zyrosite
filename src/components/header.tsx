'use client'

import { Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground font-headline">Zyro Networks</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <button onClick={() => scrollTo('features')} className="text-muted-foreground transition-colors hover:text-primary">Features</button>
          <button onClick={() => scrollTo('pricing')} className="text-muted-foreground transition-colors hover:text-primary">Pricing</button>
          <button onClick={() => scrollTo('faq')} className="text-muted-foreground transition-colors hover:text-primary">FAQ</button>
        </nav>
        <Button onClick={() => scrollTo('pricing')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Get Started
        </Button>
      </div>
    </header>
  )
}
