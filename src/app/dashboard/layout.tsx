'use client'

import {
  Bell,
  Home,
  KeyRound,
  LineChart,
  LogOut,
  CreditCard,
  MessageSquare,
  User as UserIcon,
  Search,
  Rocket,
  PanelLeft
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"

const navItems = [
    { href: "/dashboard", icon: Home, label: "Overview" },
    { href: "/dashboard/keys", icon: KeyRound, label: "API Keys" },
    { href: "/dashboard/usage", icon: LineChart, label: "Usage" },
    { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
    { href: "/dashboard/support", icon: MessageSquare, label: "Support" },
    { href: "/dashboard/account", icon: UserIcon, label: "Account" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  const NavLink = ({ item }: { item: typeof navItems[0]}) => (
     <Link href={item.href}>
        <SidebarMenuButton
          isActive={pathname === item.href}
          icon={<item.icon />}
          tooltip={{
            children: item.label,
            side: "right",
            align: "center",
          }}
        >
          {item.label}
        </SidebarMenuButton>
      </Link>
  )
  
  return (
    <SidebarProvider>
        <Sidebar collapsible="icon" className="border-r">
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
               <Rocket className="h-6 w-6 text-primary" />
               <span className="text-lg font-bold text-foreground font-headline group-data-[collapsible=icon]:hidden">Zyro API</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
             {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                 <NavLink item={item} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleSignOut} icon={<LogOut/>}>
                        Logout
                    </SidebarMenuButton>
                </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="group flex h-10 shrink-0 items-center gap-2 text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Rocket className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold text-foreground font-headline">Zyro API</span>
                  </Link>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                          "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                          pathname === item.href && "text-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full h-8 w-8"
                >
                   <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'User'} />
                      <AvatarFallback>{user?.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </SidebarInset>
    </SidebarProvider>
  )
}
