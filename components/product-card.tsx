'use client';

import Image from 'next/image';
import { Star, ShoppingCart, Plus } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCartStore } from '@/stores/cart-store';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-2xl bg-white border border-border overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="text-6xl opacity-20">
            {product.category === 'Candles' && '🕯️'}
            {product.category === 'Cards' && '💌'}
            {product.category === 'Hampers' && '🎁'}
          </div>
        </div>
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-foreground shadow-sm">
            {product.category}
          </span>
        </div>
        {/* Quick Add Button */}
        <button
          onClick={() => addItem(product)}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-primary/90"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-foreground line-clamp-1 mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-gold text-gold" />
          <span className="text-sm font-medium text-foreground">
            {product.rating}
          </span>
          <span className="text-sm text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-foreground">
            ${product.price}
          </span>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
