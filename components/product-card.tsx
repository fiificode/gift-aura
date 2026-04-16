'use client';

import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCartStore } from '@/stores/cart-store';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  className?: string;
  /** When true the image area is taller (for the featured wide card) */
  tall?: boolean;
}

const categoryEmoji: Record<string, string> = {
  Candles: '🕯️',
  Cards: '💌',
  Hampers: '🎁',
};

const categoryGradient: Record<string, string> = {
  Candles: 'linear-gradient(135deg,#fff8f0 0%,#fde8c8 100%)',
  Cards:   'linear-gradient(135deg,#fdf6f0 0%,#fce4e4 100%)',
  Hampers: 'linear-gradient(135deg,#fce8f0 0%,#f8d7e8 100%)',
};

export function ProductCard({ product, className, tall }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [wished, setWished] = useState(false);

  return (
    <div className={cn('group flex flex-col', className)}>
      {/* Image area */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          height: tall ? '320px' : '220px',
          background: categoryGradient[product.category] ?? '#f5f5f5',
        }}
      >
        {/* Emoji placeholder (replaces real photo until images exist) */}
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
          <span className="text-8xl select-none">
            {categoryEmoji[product.category]}
          </span>
        </div>

        {/* Wishlist button — top right */}
        <button
          onClick={() => setWished((w) => !w)}
          aria-label="Wishlist"
          className={cn(
            'absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border transition-colors shadow-sm',
            wished
              ? 'bg-primary border-primary text-white'
              : 'bg-white border-white/80 text-muted-foreground hover:text-primary'
          )}
        >
          <Heart className={cn('h-4 w-4', wished && 'fill-current')} />
        </button>

        {/* Add to cart — appears on hover, bottom */}
        <button
          onClick={() => addItem(product)}
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 bg-foreground/90 text-white text-xs font-semibold py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Add to Cart
        </button>
      </div>

      {/* Text below — outside the image */}
      <div className="mt-2.5 px-0.5">
        <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-0.5 text-sm font-medium text-muted-foreground">
          ${product.price}
        </p>
      </div>
    </div>
  );
}
