'use client'

import { useState } from 'react';
import { Rocket, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { usePathname } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const scrollTo = (id: string) => {
    if (pathname !== '/') {
      window.location.href = `/#${id}`;
    } else {
      const element = document.getElementById(id);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const navLinks = [
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'faq', label: 'FAQ' },
    { 
      label: 'Documentation',
      isDropdown: true,
      items: [
        { href: '/documentation', label: 'API Docs' },
        { href: '/documentation/bot', label: 'Bot Docs' },
      ]
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground font-headline">Zyro API</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(link => (
            link.isDropdown ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger className="text-muted-foreground transition-colors hover:text-primary outline-none">
                  {link.label}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {link.items?.map(item => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
             <button key={link.id} onClick={() => scrollTo(link.id!)} className="text-muted-foreground transition-colors hover:text-primary">{link.label}</button>
            )
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-2">
          <Button asChild>
            <Link href="https://t.me/mrzyro" target="_blank">Get API Key</Link>
          </Button>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs bg-background">
            <div className="flex flex-col h-full p-4">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <Rocket className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold text-foreground font-headline">Zyro API</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex flex-col space-y-4 text-lg">
                {navLinks.map(link => (
                  link.isDropdown ? (
                    <div key={link.label}>
                      <span className="text-left text-muted-foreground font-semibold">{link.label}</span>
                      <div className="flex flex-col space-y-2 mt-2 pl-4">
                        {link.items?.map(item => (
                          <Link key={item.href} href={item.href} className="text-left text-muted-foreground transition-colors hover:text-primary" onClick={() => setIsOpen(false)}>{item.label}</Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button key={link.id} onClick={() => scrollTo(link.id!)} className="text-left text-muted-foreground transition-colors hover:text-primary">{link.label}</button>
                  )
                ))}
              </nav>
              <div className="mt-auto space-y-2">
                 <Button className="w-full" asChild>
                    <Link href="https://t.me/mrzyro" target="_blank">Get API Key</Link>
                 </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
