
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Glasses } from 'lucide-react';
import { Logo } from './logo';
import { ThemeSwitcher } from './theme-switcher';

export function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline">
          <Logo className="h-8 w-8 text-primary" />
          <span>Bifrost Brews</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
           <ThemeSwitcher />
          <Button variant="outline" asChild>
            <Link href="/">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-10">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline mb-4">
                  <Logo className="h-8 w-8 text-primary" />
                  <span>Bifrost Brews</span>
                </Link>
                <div className="flex flex-col gap-2 mt-auto">
                  <Button variant="outline" asChild>
                    <Link href="/">Log In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
