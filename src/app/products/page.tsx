"use client";

import { useState, useMemo, Suspense } from 'react';
import { products, formatPrice, Product } from '@/data/products';
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
  
  // State
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState('All');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('Featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Derived data
  const uniqueBrands = useMemo(() => {
    const brands = products.map(p => p.brand);
    return Array.from(new Set(brands)).sort();
  }, []);

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
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
      
      // Stock filter
      if (inStockOnly && !product.inStock) return false;
      
      // Price filter
      if (priceRange !== 'All') {
        const price = product.price;
        if (priceRange === 'Under KSh 25,000' && price >= 25000) return false;
        if (priceRange === 'KSh 25,000 - 50,000' && (price < 25000 || price > 50000)) return false;
        if (priceRange === 'KSh 50,000 - 100,000' && (price < 50000 || price > 100000)) return false;
        if (priceRange === 'Over KSh 100,000' && price <= 100000) return false;
      }
      
      return true;
    });
  }, [selectedCategory, selectedBrands, inStockOnly, priceRange]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'Price: Low to High':
        return sorted.sort((a, b) => a.price - b.price);
      case 'Price: High to Low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'Newest':
        return sorted.sort((a, b) => {
          const isNewA = a.badge === 'new';
          const isNewB = b.badge === 'new';
          return isNewB === isNewA ? 0 : isNewB ? 1 : -1;
        });
      case 'Name A-Z':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'Featured':
      default:
        return sorted.sort((a, b) => {
          const isFeaturedA = a.badge === 'bestseller';
          const isFeaturedB = b.badge === 'bestseller';
          return isFeaturedB === isFeaturedA ? 0 : isFeaturedB ? 1 : -1;
        });
    }
  }, [filteredProducts, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange('All');
    setSelectedBrands([]);
    setInStockOnly(false);
  };

  const FilterSidebar = () => (
    <div className="space-y-8 animate-fade-in">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">Categories</h3>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-gold/10 text-gold font-medium' 
                : 'text-dark-300 hover:bg-dark-700'
            }`}
          >
            All Products
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-gold/10 text-gold font-medium' 
                  : 'text-dark-300 hover:bg-dark-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">Price Range</h3>
        <div className="space-y-1">
          {priceRanges.map(range => (
            <button
              key={range}
              onClick={() => setPriceRange(range)}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                priceRange === range 
                  ? 'bg-gold/10 text-gold font-medium' 
                  : 'text-dark-300 hover:bg-dark-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">Brand</h3>
        <div className="space-y-2">
          {uniqueBrands.map(brand => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                selectedBrands.includes(brand)
                  ? 'bg-gold border-gold'
                  : 'border-dark-600 group-hover:border-gold'
              }`}>
                {selectedBrands.includes(brand) && (
                  <svg className="w-3.5 h-3.5 text-dark-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-dark-300 group-hover:text-dark-100">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div>
        <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">Availability</h3>
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm text-dark-300 group-hover:text-dark-100">In Stock Only</span>
          <div className={`w-11 h-6 rounded-full relative transition-colors ${
            inStockOnly ? 'bg-gold' : 'bg-dark-700'
          }`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
              inStockOnly ? 'left-6 bg-dark-900' : 'left-1 bg-dark-400'
            }`} />
          </div>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Page Title Section */}
      <section className="py-12 bg-dark-800/50 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-dark-400 mb-4 flex items-center gap-2">
            <Link href="/" className="text-dark-300 hover:text-gold transition-colors">Home</Link>
            <span>&gt;</span>
            <span className="text-gold">Products</span>
          </nav>
          <h1 className="text-4xl font-bold text-dark-50 mb-2">Our Products</h1>
          <p className="text-dark-300">{products.length} premium tech products</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Desktop */}
          <aside className="w-64 shrink-0 hidden lg:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-4 custom-scrollbar">
            <FilterSidebar />
          </aside>

          {/* Main Grid Area */}
          <div className="flex-1 animate-slide-up">
            
            {/* Top Bar (Mobile Filters Toggle & Sort) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Button 
                  variant="secondary" 
                  className="lg:hidden flex-1 sm:flex-none"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Filters
                </Button>
                <p className="text-sm text-dark-300 whitespace-nowrap">
                  Showing <span className="text-gold font-medium">{sortedProducts.length}</span> products
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-sm text-dark-400 hidden sm:inline">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto bg-dark-800 border border-dark-600 rounded-lg px-4 py-2 text-sm text-dark-100 focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={() => addToCart(product, 1)} 
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center glass rounded-2xl border border-dark-700">
                <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark-50 mb-2">No products found</h3>
                <p className="text-dark-300 mb-6 max-w-md">Try adjusting your filters or search criteria to find what you're looking for.</p>
                <Button onClick={clearFilters} variant="primary">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-slate-400 hover:text-slate-900">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
              <FilterSidebar />
            </div>
            <div className="p-6 border-t border-slate-200 bg-white">
              <div className="flex gap-4">
                <Button variant="secondary" onClick={clearFilters} className="flex-1">Clear</Button>
                <Button variant="primary" onClick={() => setMobileFiltersOpen(false)} className="flex-1">Apply</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-gold rounded-full animate-spin"></div>
      </div>
    }>
      <ProductsCatalog />
    </Suspense>
  );
}
