"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getProductsByCategory, formatPrice, Product } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/components/cart/CartProvider';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-[70vh] bg-dark-900 flex flex-col items-center justify-center px-4">
        <h1 className="text-6xl font-bold text-dark-700 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-dark-50 mb-6">Product not found</h2>
        <p className="text-dark-300 mb-8 max-w-md text-center">
          The product you are looking for doesn't exist or has been removed.
        </p>
        <Link href="/products">
          <Button variant="primary">Back to Products</Button>
        </Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.category);
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  const handleAddToCart = () => {
    // Assuming addToCart can take quantity, if not it will just add one, 
    // but the prompt suggests passing quantity.
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-dark-900 pb-16">
      {/* Breadcrumb */}
      <div className="border-b border-dark-700 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm flex items-center gap-2 overflow-x-auto whitespace-nowrap custom-scrollbar pb-1 sm:pb-0">
            <Link href="/" className="text-dark-400 hover:text-gold transition-colors">Home</Link>
            <span className="text-dark-600">&gt;</span>
            <Link href="/products" className="text-dark-400 hover:text-gold transition-colors">Products</Link>
            <span className="text-dark-600">&gt;</span>
            <Link href={`/products?category=${product.category}`} className="text-dark-400 hover:text-gold transition-colors">
              {category?.name || 'Category'}
            </Link>
            <span className="text-dark-600">&gt;</span>
            <span className="text-gold font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Product Image */}
          <div className="animate-fade-in relative aspect-square bg-dark-800 rounded-2xl overflow-hidden border border-dark-700 flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-900 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <span className="text-8xl font-bold text-dark-600 z-10 select-none transform group-hover:scale-110 transition-transform duration-500">
              {product.brand.charAt(0)}
            </span>
            {product.badge && (
              <div className="absolute top-4 left-4 z-20">
                <Badge variant={product.badge}>
                  {product.badge}
                </Badge>
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="animate-slide-in-right flex flex-col justify-center">
            <span className="text-sm text-gold font-semibold uppercase tracking-wider mb-2 block">
              {product.brand}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-dark-50 leading-tight">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-dark-600'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-dark-400">({product.reviewCount || 0} reviews)</span>
            </div>

            {/* Price Block */}
            <div className="mt-6 flex items-end gap-3">
              <span className="text-4xl font-bold text-gold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-dark-400 line-through mb-1">{formatPrice(product.originalPrice)}</span>
                  <Badge variant="sale" className="mb-2">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mt-4 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'}`}></span>
              <span className={`text-sm font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                {product.inStock ? 'In Stock & Ready to Ship' : 'Out of Stock'}
              </span>
            </div>

            <p className="mt-6 text-dark-300 leading-relaxed">
              {product.description}
            </p>

            {/* Actions */}
            <div className="mt-8 border-t border-dark-700 pt-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-dark-400 mr-2">Quantity</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={decrementQuantity}
                      disabled={quantity <= 1 || !product.inStock}
                      className="w-10 h-10 rounded-lg bg-dark-800 border border-dark-600 flex items-center justify-center text-dark-100 hover:border-gold hover:text-gold transition-colors disabled:opacity-50 disabled:hover:border-dark-600 disabled:hover:text-dark-100"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <div className="w-12 text-center text-lg font-semibold text-dark-50">
                      {quantity}
                    </div>
                    <button 
                      onClick={incrementQuantity}
                      disabled={!product.inStock}
                      className="w-10 h-10 rounded-lg bg-dark-800 border border-dark-600 flex items-center justify-center text-dark-100 hover:border-gold hover:text-gold transition-colors disabled:opacity-50 disabled:hover:border-dark-600 disabled:hover:text-dark-100"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  size="lg"
                  className="w-full sm:flex-1 h-12 shadow-[0_0_20px_rgba(218,160,23,0.2)]"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Bottom Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Specifications */}
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl font-semibold text-dark-50 flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Specifications
            </h2>
            <div className="w-full mt-6 rounded-xl border border-dark-700 overflow-hidden glass">
              <table className="w-full">
                <tbody>
                  {product.specs && product.specs.map((spec, index) => (
                    <tr key={spec.label} className={index % 2 === 0 ? 'bg-dark-800/50' : 'bg-transparent'}>
                      <td className="px-6 py-4 text-sm text-dark-300 font-medium w-1/3 border-r border-dark-700/50">{spec.label}</td>
                      <td className="px-6 py-4 text-sm text-dark-100">{spec.value}</td>
                    </tr>
                  ))}
                  {(!product.specs || product.specs.length === 0) && (
                    <tr>
                      <td className="px-6 py-8 text-center text-dark-400" colSpan={2}>
                        Detailed specifications are currently unavailable for this product.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Features */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-semibold text-dark-50 flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Key Features
            </h2>
            <ul className="mt-6 space-y-4">
              {product.features && product.features.length > 0 ? (
                product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 glass p-4 rounded-xl border border-dark-700/50 hover:border-gold/30 transition-colors">
                    <svg className="w-5 h-5 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-dark-300 leading-relaxed">{feature}</span>
                  </li>
                ))
              ) : (
                <div className="glass p-6 rounded-xl border border-dark-700/50 text-center text-dark-400 text-sm">
                  Feature highlights coming soon.
                </div>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-16 border-t border-dark-700 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark-50 mb-8 flex items-center gap-2">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard 
                key={relatedProduct.id} 
                product={relatedProduct} 
                onAddToCart={() => addToCart(relatedProduct, 1)} 
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
