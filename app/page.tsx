import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { products, testimonials } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { BirthdayBuddyBanner } from '@/components/birthday-buddy-banner';

import { cn } from '@/lib/utils';

function AvatarCircle({ 
  emoji, 
  gradient, 
  size, 
  testimonial, 
  className 
}: { 
  emoji: string; 
  gradient: string; 
  size: string; 
  testimonial: { name: string; text: string };
  className?: string;
}) {
  return (
    <div className={cn('group relative transition-all duration-300 hover:z-50', className)}>
      {/* Avatar Circle */}
      <div className={cn(
        'rounded-full bg-linear-to-br border-4 border-white shadow-xl overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:z-50',
        gradient,
        size
      )}>
        <span className={cn(
          'select-none transition-transform duration-500 group-hover:scale-110',
          size.includes('sm:h-72') ? 'text-7xl sm:text-8xl' : 'text-4xl sm:text-5xl'
        )}>
          {emoji}
        </span>
      </div>

      {/* Hover Tooltip (Review Message) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 z-50">
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/50 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
            {testimonial.name}
          </p>
          <p className="text-sm font-medium text-foreground leading-relaxed italic">
            "{testimonial.text}"
          </p>
          {/* Rating stars in tooltip */}
          <div className="flex gap-0.5 mt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const featuredProducts = products.slice(0, 7);

  return (
    <div className="flex flex-col">

      {/* ── HERO + PROMO BANNERS — contained, rounded cards ── */}
      <section className="py-4 sm:py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3">

          {/* Hero card */}
          <div
            className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl"
            style={{ height: 'min(68vh, 560px)' }}
          >
            <Image
              src="/hero-bg.png"
              alt="GiftAura — gifts, candles and hampers"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/72 via-black/30 to-black/10" />
            {/* Pink brand tint */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-accent/10" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-end pb-12 px-4 text-center">
              {/* Badge pill */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 border border-white/30">
                <Sparkles className="h-3.5 w-3.5 text-white" />
                <span className="text-xs font-semibold text-white tracking-wide uppercase">
                  New Collection Available
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl drop-shadow-lg">
                Make Every Gift{' '}
                <span className="bg-linear-to-r from-pink-300 to-amber-300 bg-clip-text text-transparent">
                  Magical
                </span>{' '}
                🎁
              </h1>

              <p className="mt-3 text-base sm:text-lg text-white/80 max-w-xl drop-shadow">
                Premium candles, heartfelt cards &amp; curated hampers — thoughtful gifts, delivered with love.
              </p>

              {/* CTA — white pill with dark arrow circle */}
              <Link
                href="/products"
                id="hero-cta"
                className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-foreground hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
              >
                Explore Products
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-white">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>

              {/* Trust row */}
              <div className="mt-5 flex items-center gap-3 text-white/70 text-sm">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-7 w-7 rounded-full bg-linear-to-br from-pink-400 to-amber-400 border-2 border-white/50 flex items-center justify-center text-[9px] font-bold text-white"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span>Trusted by 10,000+ happy customers</span>
              </div>
            </div>
          </div>

          {/* Two promo cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {/* Promo 1 — Candles */}
            <div className="relative overflow-hidden rounded-2xl" style={{ height: '210px' }}>
              <Image
                src="/promo-candles.png"
                alt="Scented candle collection"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-r from-amber-900/72 via-amber-900/40 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-center px-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-200 mb-1">Bestsellers</p>
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug max-w-[190px]">
                  Where warmth meets artisan craft
                </h2>
                <Link
                  href="/products?category=Candles"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/30 transition-colors w-fit"
                >
                  Shop Now <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Promo 2 — Hampers */}
            <div className="relative overflow-hidden rounded-2xl" style={{ height: '210px' }}>
              <Image
                src="/promo-hamper.png"
                alt="Premium gift hamper"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-r from-pink-900/65 via-pink-900/35 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-center px-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-pink-200 mb-1">Curated for you</p>
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug max-w-[200px]">
                  Enchanting gifts for every occasion
                </h2>
                <Link
                  href="/products?category=Hampers"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/30 transition-colors w-fit"
                >
                  Shop Now <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── BROWSE BY CATEGORIES ── */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Browse by categories</h2>

            {/* Filter pills */}
            <div className="flex items-center gap-2">
              {[
                { label: 'ALL', href: '/products' },
                { label: 'CANDLES', href: '/products?category=Candles' },
                { label: 'CARDS', href: '/products?category=Cards' },
                { label: 'HAMPERS', href: '/products?category=Hampers' },
              ].map((pill, i) => (
                <Link
                  key={pill.label}
                  href={pill.href}
                  className={
                    i === 0
                      ? 'rounded-full px-4 py-1.5 text-xs font-semibold bg-foreground text-white transition-colors hover:bg-foreground/80'
                      : 'rounded-full px-4 py-1.5 text-xs font-semibold border border-border text-foreground hover:bg-muted transition-colors'
                  }
                >
                  {pill.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Category cards — horizontal row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

            {/* Card 1 — Candles (real photo) */}
            <Link
              href="/products?category=Candles"
              className="group relative overflow-hidden rounded-2xl bg-muted"
              style={{ height: '220px' }}
            >
              <Image
                src="/promo-candles.png"
                alt="Candles"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                CANDLES
              </span>
            </Link>

            {/* Card 2 — Cards (gradient placeholder) */}
              <Link
              href="/products?category=Cards"
              className="group relative overflow-hidden rounded-2xl bg-muted"
              style={{ height: '220px' }}
            >
              <Image
                src="/cards.webp"
                alt="Cards"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                CARDS
              </span>
            </Link>

            {/* Card 3 — Hampers (real photo) */}
            <Link
              href="/products?category=Hampers"
              className="group relative overflow-hidden rounded-2xl bg-muted"
              style={{ height: '220px' }}
            >
              <Image
                src="/promo-hamper.png"
                alt="Hampers"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                HAMPERS
              </span>
            </Link>

            {/* Card 4 — All Gifts (gradient placeholder) */}
                 <Link
              href="/products?category=Cards"
              className="group relative overflow-hidden rounded-2xl bg-muted"
              style={{ height: '220px' }}
            >
              <Image
                src="/AlllGifts.webp"
                alt="All Gifts"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                ALL GIFTS
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Header row */}
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Popular products</h2>
            <div className="flex items-center gap-2">
              {[
                { label: 'ALL', href: '/products' },
                { label: 'CANDLES', href: '/products?category=Candles' },
                { label: 'CARDS', href: '/products?category=Cards' },
                { label: 'HAMPERS', href: '/products?category=Hampers' },
              ].map((pill, i) => (
                <Link
                  key={pill.label}
                  href={pill.href}
                  className={
                    i === 0
                      ? 'rounded-full px-4 py-1.5 text-xs font-semibold bg-foreground text-white hover:bg-foreground/80 transition-colors'
                      : 'rounded-full px-4 py-1.5 text-xs font-semibold border border-border text-foreground hover:bg-muted transition-colors hidden sm:block'
                  }
                >
                  {pill.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Row 1: 4-col grid — col 1 (span-1) | col 2 (span-2, taller) | col 3 (span-1) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <ProductCard product={featuredProducts[0]} />
            <ProductCard product={featuredProducts[1]} tall className="sm:col-span-2" />
            <ProductCard product={featuredProducts[2]} />
          </div>

          {/* Row 2: 4 equal columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {featuredProducts.slice(3, 7).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* ── BIRTHDAY BUDDY BONUS ── */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BirthdayBuddyBanner />
        </div>
      </section>

      {/* ── TESTIMONIALS (Social Proof Cluster) ── */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 px-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight max-w-4xl mx-auto">
              Over 350+ Customer reviews form our client
            </h2>
          </div>

          {/* Avatar Cluster Layout */}
          <div className="relative flex justify-center items-center h-[450px] w-full max-w-5xl mx-auto">
            
            {/* Left Small Stack */}
            <div className="absolute left-[5%] lg:left-[10%] flex flex-col gap-8 -translate-y-8">
              <AvatarCircle
                emoji="👨‍🎨"
                gradient="from-pink-400 to-rose-500"
                size="h-24 w-24 sm:h-32 sm:w-32"
                testimonial={{ name: "Alex P.", text: "The attention to detail in the packaging is superb!" }}
              />
              <AvatarCircle
                emoji="🧑‍🚀"
                gradient="from-blue-400 to-indigo-500"
                size="h-24 w-24 sm:h-32 sm:w-32"
                testimonial={{ name: "Jordan S.", text: "Fastest shipping I've ever experienced." }}
              />
            </div>

            {/* Central Large Pair */}
            <div className="flex gap-4 sm:gap-12 z-10">
              <AvatarCircle
                emoji="👩‍🎤"
                gradient="from-amber-300 to-orange-500"
                size="h-44 w-44 sm:h-72 sm:w-72"
                testimonial={{ name: "Sarah M.", text: "The candles smell divine! My house feels like a spa now." }}
                className="translate-y-12"
              />
              <AvatarCircle
                emoji="🤵"
                gradient="from-teal-300 to-emerald-500"
                size="h-44 w-44 sm:h-72 sm:w-72"
                testimonial={{ name: "James K.", text: "Buddy Bonus is a total win. Got my gift hamper last week!" }}
                className="-translate-y-12"
              />
            </div>

            {/* Right Small Stack */}
            <div className="absolute right-[5%] lg:right-[10%] flex flex-col gap-8 translate-y-8">
              <AvatarCircle
                emoji="👩‍🎨"
                gradient="from-purple-400 to-fuchsia-500"
                size="h-24 w-24 sm:h-32 sm:w-32"
                testimonial={{ name: "Emily R.", text: "Quality handmade cards that actually mean something." }}
              />
              <AvatarCircle
                emoji="🧑‍💼"
                gradient="from-sky-400 to-blue-500"
                size="h-24 w-24 sm:h-32 sm:w-32"
                testimonial={{ name: "Michael T.", text: "Support team was so helpful with my custom order." }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA SECTION (Banner Style) ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl py-16 sm:py-24"
            style={{
              background: 'linear-gradient(120deg, #c471ed 0%, #a855c8 20%, #d9468f 45%, #f87171 65%, #a855c8 85%, #c471ed 100%)',
            }}
          >
            {/* Sheen/Silky effects */}
            <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-[120%] rounded-full bg-pink-300/10 blur-[100px]" />

            <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-6 text-center">
              {/* Badge pill */}
              <div className="rounded-full border border-white/60 bg-white/10 backdrop-blur-sm px-5 py-1.5 text-xs font-semibold text-white tracking-widest uppercase">
                Shop Now
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl uppercase drop-shadow-lg">
                Exclusive Gift Offers <br /> Await For Your Selection
              </h2>

              <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base font-medium">
                Every gift tells a story — find the perfect one for your loved ones today.
              </p>

              {/* CTA Pill */}
              <Link
                href="/products"
                className="mt-4 inline-flex items-center gap-3 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-foreground hover:bg-white/90 transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0"
              >
                CHECK IT NOW
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
