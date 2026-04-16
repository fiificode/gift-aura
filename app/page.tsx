import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { products, testimonials } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { BirthdayBuddyBanner } from '@/components/birthday-buddy-banner';

export default function HomePage() {
  const featuredProducts = products.slice(0, 6);

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

      {/* ── CATEGORIES ── */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Candles', icon: '🕯️', desc: 'Scented & decorative', href: '/products?category=Candles' },
              { name: 'Cards', icon: '💌', desc: 'Handmade with love', href: '/products?category=Cards' },
              { name: 'Hampers', icon: '🎁', desc: 'Curated gift sets', href: '/products?category=Hampers' },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{category.name}</h3>
                <p className="text-muted-foreground">{category.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link href="/products" className="flex items-center gap-1 text-primary font-medium hover:underline">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
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
