'use client'

import { useState } from 'react';
import { Rocket, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { usePathname } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useAuth } from './auth-provider';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const router = usePathname();

  const handleSignOut = async () => {
    await signOut(auth);
  };

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
          {user ? (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                      <AvatarFallback>{user.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem disabled>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
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
                 {user ? (
                   <Button className="w-full" onClick={handleSignOut}>Log Out</Button>
                 ) : (
                   <Button className="w-full" asChild>
                      <Link href="/login">Login</Link>
                   </Button>
                 )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
