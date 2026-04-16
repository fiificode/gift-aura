import Link from 'next/link';
import { ArrowRight, Star, Gift, Sparkles } from 'lucide-react';
import { products, testimonials } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { BirthdayBuddyBanner } from '@/components/birthday-buddy-banner';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-white to-accent/5 py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  New Collection Available
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Make Every Gift{' '}
                <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                  Magical
                </span>{' '}
                🎁
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Discover premium candles, heartfelt cards, and curated hampers for
                every special occasion. Thoughtful gifts, delivered with love.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary to-accent px-8 py-4 text-base font-medium text-white hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                >
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/products?category=Hampers"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border bg-white px-8 py-4 text-base font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <Gift className="h-5 w-5" />
                  View Hampers
                </Link>
              </div>
              <div className="flex items-center gap-4 justify-center lg:justify-start text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full bg-linear-to-br from-primary to-accent border-2 border-white flex items-center justify-center text-[10px] text-white font-medium"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p>Trusted by 10,000+ happy customers</p>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square rounded-3xl bg-linear-to-br from-primary/20 to-accent/20 p-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[200px] animate-bounce">🎁</div>
                </div>
                {/* Floating elements */}
                <div className="absolute top-4 left-4 rounded-2xl bg-white p-4 shadow-lg animate-pulse">
                  <div className="text-3xl">🕯️</div>
                </div>
                <div className="absolute bottom-8 right-4 rounded-2xl bg-white p-4 shadow-lg animate-pulse delay-75">
                  <div className="text-3xl">💌</div>
                </div>
                <div className="absolute top-1/2 -right-4 rounded-2xl bg-white p-4 shadow-lg animate-pulse delay-150">
                  <div className="text-3xl">✨</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">Shop by Category</h2>
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

      {/* Featured Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link
              href="/products"
              className="flex items-center gap-1 text-primary font-medium hover:underline"
            >
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

      {/* Birthday Buddy Bonus Banner */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BirthdayBuddyBanner />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
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

      {/* CTA Section */}
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

