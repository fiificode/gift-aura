'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { products, Product } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { BirthdayBuddyBanner } from '@/components/birthday-buddy-banner';
import { cn } from '@/lib/utils';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating';
type CategoryFilter = 'All' | 'Candles' | 'Cards' | 'Hampers';
type PriceRange = 'all' | 'under-25' | '25-50' | '50-100' | 'over-100';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as CategoryFilter | null;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(initialCategory || 'All');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    if (priceRange !== 'all') {
      result = result.filter((p) => {
        switch (priceRange) {
          case 'under-25':
            return p.price < 25;
          case '25-50':
            return p.price >= 25 && p.price <= 50;
          case '50-100':
            return p.price > 50 && p.price <= 100;
          case 'over-100':
            return p.price > 100;
          default:
            return true;
        }
      });
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured - keep original order
        break;
    }

    return result;
  }, [selectedCategory, priceRange, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'All' || priceRange !== 'all' || searchQuery;

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-4">Shop All Gifts</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search gifts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-input bg-white pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="sm:hidden flex items-center justify-center gap-2 rounded-full border border-input bg-white px-4 py-3 text-sm font-medium"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 rounded-full bg-primary text-white text-xs px-2 py-0.5">
                  !
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Birthday Buddy Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <BirthdayBuddyBanner variant="compact" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex-1">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={cn(
              'w-64 flex-shrink-0 space-y-6',
              'hidden sm:block',
              showMobileFilters && 'block fixed inset-0 z-50 bg-white p-4 sm:static sm:p-0'
            )}
          >
            {showMobileFilters && (
              <div className="flex items-center justify-between mb-4 sm:hidden">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-muted rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Category Filter */}
            <div>
              <h3 className="font-semibold mb-3">Category</h3>
              <div className="space-y-2">
                {(['All', 'Candles', 'Cards', 'Hampers'] as CategoryFilter[]).map(
                  (category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="h-4 w-4 accent-primary"
                      />
                      <span className="text-sm">
                        {category === 'All' ? 'All Categories' : category}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All Prices' },
                  { value: 'under-25', label: 'Under GH₵25' },
                  { value: '25-50', label: 'GH₵25 - GH₵50' },
                  { value: '50-100', label: 'GH₵50 - GH₵100' },
                  { value: 'over-100', label: 'Over GH₵100' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                  >
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === option.value}
                      onChange={() => setPriceRange(option.value as PriceRange)}
                      className="h-4 w-4 accent-primary"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full rounded-full border border-border py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                Clear all filters
              </button>
            )}

            {showMobileFilters && (
              <button
                onClick={() => setShowMobileFilters(false)}
                className="sm:hidden w-full rounded-full bg-primary py-3 text-sm font-medium text-white"
              >
                Apply Filters
              </button>
            )}
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Sort & Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-lg border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={clearFilters}
                  className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
