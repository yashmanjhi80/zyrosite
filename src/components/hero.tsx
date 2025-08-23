'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"

interface ParticleStyle {
  width: string;
  height: string;
  left: string;
  top: string;
  animationDuration: string;
  animationDelay: string;
  transformX: number;
  transformY: number;
  scale: number;
}

const ParticleBackground = () => {
  const [particles, setParticles] = useState<ParticleStyle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const generateParticles = () => {
        return Array.from({ length: 20 }).map(() => ({
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 20 + 10}s`,
          animationDelay: `${Math.random() * -20}s`,
          transformX: (Math.random() - 0.5) * 500,
          transformY: (Math.random() - 0.5) * 500,
          scale: Math.random() * 1.5,
        }));
      };
      setParticles(generateParticles());
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {particles.map((style, i) => (
        <div
          key={i}
          className="absolute bg-primary/20 rounded-full animate-particle"
          style={{
            width: style.width,
            height: style.height,
            left: style.left,
            top: style.top,
            animationDuration: style.animationDuration,
            animationDelay: style.animationDelay,
            '--transform-x': `${style.transformX}px`,
            '--transform-y': `${style.transformY}px`,
            '--transform-scale': `${style.scale}`,
          } as React.CSSProperties}
        />
      ))}
      <style jsx>{`
        @keyframes particle {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--transform-x), var(--transform-y)) scale(var(--transform-scale)); opacity: 0; }
        }
        .animate-particle {
          animation-name: particle;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};


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
