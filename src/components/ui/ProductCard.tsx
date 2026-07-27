"use client"
import React from 'react';
import Link from 'next/link';
import { Product, formatPrice } from '@/data/products';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      const event = new CustomEvent('add-to-cart', { detail: product });
      window.dispatchEvent(event);
    }
  };

  const initial = product.brand ? product.brand.charAt(0).toUpperCase() : product.name.charAt(0).toUpperCase();

  return (
    <Link href={`/products/${product.slug}`} className="block group">
      <div className="bg-white text-slate-900 rounded-xl overflow-hidden border border-slate-200 card-glow transition-all duration-300 h-full flex flex-col shadow-sm">
        {/* Image Area */}
        <div className="relative aspect-[4/3] bg-dark-700 overflow-hidden">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-dark-600 to-dark-800 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
               <span className="text-4xl font-bold text-dark-500">{initial}</span>
            </div>
          )}
          
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant={product.badge}>
                {product.badge}
              </Badge>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5 flex-1 flex flex-col">
          <span className="text-xs text-dark-300 uppercase tracking-wider mb-1">
            {product.category}
          </span>
          <h3 className="text-lg font-semibold text-dark-50 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-dark-300 line-clamp-2 mt-1 mb-3 flex-1">
            {product.description || `Premium ${product.category} from ${product.brand || 'our collection'}.`}
          </p>

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-bold text-gold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-dark-300 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1 mb-4">
              <span className="text-gold text-sm">★</span>
              <span className="text-sm text-dark-50 font-medium">{product.rating?.toFixed(1) || "5.0"}</span>
              <span className="text-sm text-dark-400">({product.reviewCount || 0})</span>
            </div>

            <div className="flex justify-between items-center mt-4">
              <Button 
                variant="primary" 
                size="sm" 
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="pointer-events-none"
              >
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
