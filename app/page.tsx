import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { products, testimonials } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { BirthdayBuddyBanner } from '@/components/birthday-buddy-banner';

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
              className="group relative overflow-hidden rounded-2xl"
              style={{ height: '220px', background: 'linear-gradient(135deg, #fdf6f0 0%, #fde8d8 100%)' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2 group-hover:scale-110 transition-transform duration-500">
                  <div className="text-7xl">💌</div>
                  <div className="flex gap-1 justify-center">
                    {['🌸','⭐','💛'].map((e, i) => (
                      <span key={i} className="text-2xl opacity-60">{e}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
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
              href="/products"
              className="group relative overflow-hidden rounded-2xl"
              style={{ height: '220px', background: 'linear-gradient(135deg, #fce8f0 0%, #fff0f9 100%)' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2 group-hover:scale-110 transition-transform duration-500">
                  <div className="text-7xl">🎁</div>
                  <div className="flex gap-1 justify-center">
                    {['✨','🎀','🎉'].map((e, i) => (
                      <span key={i} className="text-2xl opacity-60">{e}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
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

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-foreground mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                <p className="font-medium text-foreground">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-linear-to-r from-primary to-accent p-8 sm:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Find the Perfect Gift?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Browse our curated collection of candles, cards, and hampers. Every gift
              tells a story — let&apos;s make yours magical.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-primary hover:bg-white/90 transition-colors"
            >
              Start Shopping
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
