"use client";

import { useState, useMemo, useEffect, Suspense } from 'react';
import { products as staticProducts, formatPrice, Product } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/components/cart/CartProvider';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ProductsCatalog() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const { addToCart } = useCart();
  
  // Live products state from Railway PostgreSQL
  const [productsList, setProductsList] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(true);

  // State
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState('All');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('Featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch live products from API
  useEffect(() => {
    async function fetchLiveProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (res.ok && data.products && data.products.length > 0) {
          setProductsList(data.products);
        }
      } catch (err) {
        console.error("Error loading live products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveProducts();
  }, []);

  // Derived data
  const uniqueBrands = useMemo(() => {
    const brands = productsList.map(p => p.brand);
    return Array.from(new Set(brands)).sort();
  }, [productsList]);

  const priceRanges = [
    'All',
    'Under KSh 25,000',
    'KSh 25,000 - 50,000',
    'KSh 50,000 - 100,000',
    'Over KSh 100,000'
  ];

  const sortOptions = [
    'Featured',
    'Price: Low to High',
    'Price: High to Low',
    'Newest',
    'Name A-Z'
  ];

  // Filtering
  const filteredProducts = useMemo(() => {
    return productsList.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
      
      // Stock filter
      if (inStockOnly && !product.inStock) return false;
      
      // Price filter
      if (priceRange !== 'All') {
        if (priceRange === 'Under KSh 25,000' && product.price >= 25000) return false;
        if (priceRange === 'KSh 25,000 - 50,000' && (product.price < 25000 || product.price > 50000)) return false;
        if (priceRange === 'KSh 50,000 - 100,000' && (product.price < 50000 || product.price > 100000)) return false;
        if (priceRange === 'Over KSh 100,000' && product.price <= 100000) return false;
      }

      return true;
    });
  }, [productsList, selectedCategory, selectedBrands, inStockOnly, priceRange]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];
    
    switch (sortBy) {
      case 'Price: Low to High':
        return result.sort((a, b) => a.price - b.price);
      case 'Price: High to Low':
        return result.sort((a, b) => b.price - a.price);
      case 'Newest':
        return result;
      case 'Name A-Z':
        return result.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return result;
    }
  }, [filteredProducts, sortBy]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setPriceRange('All');
    setSelectedBrands([]);
    setInStockOnly(false);
    setSortBy('Featured');
  };

  const activeFilterCount = (selectedCategory !== 'all' ? 1 : 0) + 
                            (priceRange !== 'All' ? 1 : 0) + 
                            selectedBrands.length + 
                            (inStockOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 pb-20">
      {/* Header Banner */}
      <div className="bg-[#0B0F19] border-b border-slate-800/80 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider">
                Tech Bazaar Storefront
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
                Laptops & Tech Catalog
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Showing live inventory updated from Railway PostgreSQL database ({sortedProducts.length} items).
              </p>
            </div>

            {/* Quick Category Switcher */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-gold text-slate-950 shadow-md shadow-gold/20'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                All Gear ({productsList.length})
              </button>
              <button
                onClick={() => setSelectedCategory('laptops')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'laptops'
                    ? 'bg-gold text-slate-950 shadow-md shadow-gold/20'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                Laptops
              </button>
              <button
                onClick={() => setSelectedCategory('desktops')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'desktops'
                    ? 'bg-gold text-slate-950 shadow-md shadow-gold/20'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                Desktops
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-[#0B0F19] border border-slate-800/90 rounded-3xl p-6 space-y-6 shadow-xl sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <h3 className="text-base font-bold text-white">Refine Catalog</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-mono font-bold text-gold hover:underline"
                  >
                    Reset ({activeFilterCount})
                  </button>
                )}
              </div>

              {/* Brands Filter */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Brand Manufacturer
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {uniqueBrands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="rounded border-slate-700 bg-slate-950 text-gold focus:ring-gold"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Ranges */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Price Budget
                </label>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label
                      key={range}
                      className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="priceRange"
                        checked={priceRange === range}
                        onChange={() => setPriceRange(range)}
                        className="border-slate-700 bg-slate-950 text-gold focus:ring-gold"
                      />
                      <span>{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock Toggle */}
              <div className="pt-4 border-t border-slate-800/80">
                <label className="flex items-center gap-2.5 text-xs font-bold text-slate-300 hover:text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-gold focus:ring-gold"
                  />
                  <span>Show In-Stock Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Products Grid */}
          <div className="lg:col-span-9 space-y-6">
            {/* Sorting Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B0F19] border border-slate-800/90 rounded-2xl p-4">
              <span className="text-xs font-mono text-slate-400">
                Showing <strong className="text-white">{sortedProducts.length}</strong> laptops
              </span>

              <div className="flex items-center gap-3">
                <label className="text-xs font-mono text-slate-400">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-gold font-medium"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="bg-[#0B0F19] border border-slate-800/90 rounded-3xl p-16 text-center text-slate-500 space-y-4">
                <h3 className="text-lg font-bold text-white">No Products Found</h3>
                <p className="text-xs text-slate-400">
                  Try adjusting your filters or price range to find available laptops.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-gold text-slate-950 font-bold text-xs rounded-xl shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(p) => addToCart(p, 1)}
                  />
                ))}
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
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-gold font-mono">
        Loading Live Catalog...
      </div>
    }>
      <ProductsCatalog />
    </Suspense>
  );
}
