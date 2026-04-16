'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Clock,
  Package,
  Truck,
  Calendar,
  Star,
  Minus,
  Plus,
} from 'lucide-react';
import { products } from '@/lib/data';
import { useCartStore } from '@/stores/cart-store';
import { cn } from '@/lib/utils';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const product = products.find((p) => p.id === id);
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [descOpen, setDescOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-white hover:bg-foreground/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  // Calculate delivery countdown (next day delivery if ordered before 4 PM)
  const now = new Date();
  const cutoffTime = new Date(now);
  cutoffTime.setHours(16, 0, 0, 0);
  const timeRemaining = cutoffTime.getTime() - now.getTime();
  const hoursRemaining = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60)));
  const minutesRemaining = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)));

  // Related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Delivery date calculation
  const deliveryDate = new Date(now);
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const deliveryRange = `${deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(deliveryDate.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Thumbnails - using same image as placeholder, in real app would have multiple images */}
            <div className="grid grid-cols-4 gap-3">
              {[1].map((i) => (
                <button
                  key={i}
                  className={cn(
                    'relative aspect-square rounded-xl overflow-hidden bg-muted border-2 transition-all',
                    i === 1 ? 'border-foreground' : 'border-transparent hover:border-border'
                  )}
                >
                  <Image
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 25vw, 12vw"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Category Tag */}
            <span className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground">
              {product.category}
            </span>

            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">
                GH₵{product.price.toFixed(2)}
              </span>
              {product.category === 'Hampers' && (
                <span className="text-sm text-muted-foreground line-through">
                  GH₵{(product.price * 1.2).toFixed(2)}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-muted text-muted'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Delivery Countdown */}
            <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm">
                Order in{' '}
                <span className="font-semibold text-foreground">
                  {hoursRemaining}h {minutesRemaining}m
                </span>{' '}
                to get next day delivery
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-foreground">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-white transition-all hover:opacity-90',
                  addedToCart
                    ? 'bg-green-600'
                    : 'bg-linear-to-r from-primary to-accent'
                )}
              >
                {addedToCart ? (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={cn(
                  'flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all',
                  isWishlisted
                    ? 'border-primary bg-primary text-white'
                    : 'border-border hover:border-primary hover:text-primary'
                )}
              >
                <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
              </button>
            </div>

            {/* Description Accordion */}
            <div className="border-t border-border pt-4">
              <button
                onClick={() => setDescOpen(!descOpen)}
                className="flex w-full items-center justify-between py-2 text-left"
              >
                <span className="font-semibold text-foreground">Description & Details</span>
                {descOpen ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              {descOpen && (
                <div className="pb-4 pt-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Premium quality materials
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Handcrafted with care
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Gift-ready packaging
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Shipping Accordion */}
            <div className="border-t border-border">
              <button
                onClick={() => setShippingOpen(!shippingOpen)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="font-semibold text-foreground">Shipping & Delivery</span>
                {shippingOpen ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              {shippingOpen && (
                <div className="pb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Package</p>
                        <p className="text-sm font-medium">Gift Box</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Delivery Time</p>
                        <p className="text-sm font-medium">2-4 Working Days</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Est. Arrival</p>
                        <p className="text-sm font-medium">{deliveryRange}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <span className="text-sm font-bold text-muted-foreground">%</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Discount</p>
                        <p className="text-sm font-medium">
                          {product.category === 'Hampers' ? '20% Off' : '10% Off'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-border bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.id}`}
                  className="group rounded-2xl bg-white p-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-muted mb-3">
                    <Image
                      src={related.image}
                      alt={related.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="font-medium text-sm line-clamp-1">{related.name}</h3>
                  <p className="text-sm font-semibold mt-1">GH₵{related.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
