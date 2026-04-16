'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X, Search, Gift } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/stores/cart-store';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/support', label: 'Support' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl">
              <Image
                src="/logo.jpg"
                alt="GiftAura"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-xl font-bold text-transparent">
              GiftAura
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <Search className="h-5 w-5 text-muted-foreground" />
            </Link>

            <button
              onClick={onCartClick}
              className="relative flex items-center justify-center h-10 w-10 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              <Gift className="h-4 w-4" />
              Shop Now
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-3 text-sm font-medium text-white"
              >
                <Gift className="h-4 w-4" />
                Shop Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
