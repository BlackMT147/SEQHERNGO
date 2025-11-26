'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/components/icons/Logo';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


const navLinks = [
  { href: '/programs', label: 'Programs' },
  { href: '/blog', label: 'Blog' },
  { href: '/appointment', label: 'Book Appointment' },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isAdmin, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
  }

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
           <Avatar className="h-10 w-10">
              <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} />
              <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
            </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.displayName || 'Welcome'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isAdmin && <DropdownMenuItem asChild><Link href="/admin">Admin Dashboard</Link></DropdownMenuItem>}
        <DropdownMenuItem onClick={signOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <Logo className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl font-headline tracking-tight">SEQHER</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
                 <Button asChild variant="ghost" className="text-accent-foreground hover:bg-accent/10">
                    <Link href="/donate">Donate</Link>
                </Button>
                {user ? <UserMenu /> : (
                    <Button asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                )}
            </div>

            <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
        </div>
      </nav>
      
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background shadow-lg py-4">
            <div className="container mx-auto px-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                    <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        'text-lg font-medium transition-colors hover:text-primary',
                        pathname === link.href ? 'text-primary' : 'text-foreground'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                    >
                    {link.label}
                    </Link>
                ))}
                <div className="border-t pt-4 flex flex-col gap-4">
                    <Button asChild variant="outline">
                        <Link href="/donate" onClick={() => setIsMenuOpen(false)}>Donate</Link>
                    </Button>
                     {user ? (
                         <>
                            {isAdmin && 
                                <Button asChild variant="secondary">
                                    <Link href="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>
                                </Button>
                            }
                            <Button onClick={() => { signOut(); setIsMenuOpen(false); }}>Logout</Button>
                         </>
                     ) : (
                        <Button asChild>
                            <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                        </Button>
                     )}
                </div>
            </div>
        </div>
      )}
    </header>
  );
}
