'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Suspense, useState, useRef, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  ChevronDown,
  HelpCircle,
  Headphones,
  User,
  Loader2,
} from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onCartClick: () => void;
}

const categories = [
  { label: 'All Products', href: '/products' },
  { label: 'Candles', href: '/products?category=Candles' },
  { label: 'Cards', href: '/products?category=Cards' },
  { label: 'Hampers', href: '/products?category=Hampers' },
];

const newArrivals = [
  { label: 'Birthday Candle Set', href: '/products' },
  { label: 'Deluxe Gift Hamper', href: '/products?category=Hampers' },
  { label: 'Handmade Birthday Card', href: '/products?category=Cards' },
];

const categoryPills = [
  { label: 'All', href: '/products', value: '' },
  { label: 'Candles', href: '/products?category=Candles', value: 'Candles' },
  { label: 'Cards', href: '/products?category=Cards', value: 'Cards' },
  { label: 'Hampers', href: '/products?category=Hampers', value: 'Hampers' },
];

// Separate component for search sync that uses useSearchParams
function SearchSync({ onQueryChange }: { onQueryChange: (query: string) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('q') || '';
    onQueryChange(query);
  }, [searchParams, onQueryChange]);

  return null;
}

function SearchSyncFallback() {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/60 w-full max-w-xs">
      <Search className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
      <div className="h-4 w-24 rounded bg-muted animate-pulse" />
    </div>
  );
}

export function Header({ onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const totalItems = useCartStore((state) => state.getTotalItems());
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  const handleQueryChange = (query: string) => {
    setSearchVal(query);
  };

  const catRef = useRef<HTMLDivElement>(null);
  const newRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
      if (newRef.current && !newRef.current.contains(e.target as Node)) setNewOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchVal.trim())}`);
    } else {
      // Clear search - go to products without query
      router.push('/products');
    }
  }

  function clearSearch() {
    setSearchVal('');
    if (pathname === '/products') {
      router.push('/products');
    }
  }

  // Determine active category pill
  const activeCategory = pathname === '/products'
    ? (typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('category') ?? ''
        : '')
    : null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm">
      {/* ── ROW 1 ── hamburger | logo (center) | utility nav */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">

          {/* Left — hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center h-9 w-9 rounded-lg text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Center — Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg ring-2 ring-primary/20">
              <Image src="/logo.jpg" alt="GiftAura" fill className="object-cover" priority />
            </div>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-lg font-bold text-transparent tracking-tight">
              GiftAura
            </span>
          </Link>

          {/* Right — utility links + cart */}
          <div className="flex items-center gap-1">
            <Link
              href="/support"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            >
              Support
            </Link>
            <Link
              href="/support#faq"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            >
              FAQs
            </Link>

            {/* Cart */}
            <button
              id="cart-button"
              onClick={onCartClick}
              className="relative flex items-center justify-center h-9 w-9 rounded-full bg-muted hover:bg-muted/80 transition-colors ml-1"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-4 w-4 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[9px] font-bold text-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* User Auth */}
            {isSignedIn ? (
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9",
                  },
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <button className="flex items-center justify-center h-9 w-9 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                  <User className="h-4 w-4 text-foreground" />
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>

      {/* ── ROW 2 ── categories dropdown | new arrivals dropdown | search | pills */}
      <div className="border-t border-border/60 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-11 items-center gap-2">

            {/* Categories dropdown */}
            <div ref={catRef} className="relative hidden sm:block">
              <button
                id="categories-dropdown"
                onClick={() => { setCatOpen((v) => !v); setNewOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors whitespace-nowrap"
              >
                Categories
                <ChevronDown className={cn('h-3.5 w-3.5 text-muted-foreground transition-transform duration-200', catOpen && 'rotate-180')} />
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 rounded-xl border border-border bg-white shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {categories.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setCatOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* New Arrivals dropdown */}
            <div ref={newRef} className="relative hidden sm:block">
              <button
                id="new-arrivals-dropdown"
                onClick={() => { setNewOpen((v) => !v); setCatOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors whitespace-nowrap"
              >
                New Arrivals
                <ChevronDown className={cn('h-3.5 w-3.5 text-muted-foreground transition-transform duration-200', newOpen && 'rotate-180')} />
              </button>
              {newOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-border bg-white shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {newArrivals.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setNewOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="hidden sm:block h-5 w-px bg-border mx-1" />

            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className="flex flex-1 items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/60 hover:bg-muted transition-colors group max-w-xs"
            >
              <Search className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              <input
                id="search-input"
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search gifts..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
              />
              {searchVal && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="p-0.5 rounded-full hover:bg-muted-foreground/20 text-muted-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </form>

            {/* Divider */}
            <div className="hidden md:block h-5 w-px bg-border mx-1" />

            {/* Category pills */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Category shortcuts">
              {categoryPills.map((pill) => (
                <Link
                  key={pill.value}
                  href={pill.href}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
                    activeCategory === pill.value
                      ? 'bg-foreground text-white'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {pill.label}
                </Link>
              ))}
            </nav>

          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3 space-y-1">
            {/* Search on mobile */}
            <form
              onSubmit={(e) => { handleSearch(e); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted mb-2"
            >
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search gifts..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </form>

            {/* Nav links */}
            {[
              { href: '/', label: 'Home' },
              { href: '/products', label: 'All Products' },
              { href: '/products?category=Candles', label: 'Candles' },
              { href: '/products?category=Cards', label: 'Cards' },
              { href: '/products?category=Hampers', label: 'Hampers' },
              { href: '/support', label: 'Support' },
              { href: '/support#faq', label: 'FAQs' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
