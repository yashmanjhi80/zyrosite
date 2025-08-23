'use client'

import { Button } from "@/components/ui/button"

const ParticleBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute bg-primary/20 rounded-full animate-particle"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 20 + 10}s`,
          animationDelay: `${Math.random() * -20}s`,
        }}
      />
    ))}
    <style jsx>{`
      @keyframes particle {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(${(Math.random() - 0.5) * 500}px, ${(Math.random() - 0.5) * 500}px) scale(${Math.random() * 1.5}); opacity: 0; }
      }
      .animate-particle {
        animation-name: particle;
        animation-iteration-count: infinite;
      }
    `}</style>
  </div>
);

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="relative py-24 md:py-40 text-center overflow-hidden">
      <ParticleBackground />
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-headline">
          Blazing-Fast Minecraft Servers
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
          Instant setup. Unbeatable performance. Lag-free gameplay guaranteed. Power up your world with Zyro Networks.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" onClick={() => scrollTo('pricing')} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg">
            Start Your Server
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollTo('features')} className="font-semibold px-8 py-6 text-lg border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            View Features
          </Button>
        </div>
      </div>
    </section>
  )
}
