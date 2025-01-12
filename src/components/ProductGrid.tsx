'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { loadMoreProducts } from '@/actions/products/load';

interface ProductGridProps {
  initialProducts: Product[];
  category: string;
  hasMore: boolean;
  title: string;
}

const ITEMS_PER_VIEW = 6;

export function ProductGrid({ initialProducts, category, hasMore: initialHasMore, title }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (hasMore && products.length - currentIndex <= ITEMS_PER_VIEW) {
      loadMoreProducts(category, products.length)
        .then(result => {
          setProducts(prev => [...prev, ...result.products]);
          setHasMore(result.hasMore);
        })
        .catch(error => console.error('Failed to preload products:', error));
    }
  }, [currentIndex, products.length, category, hasMore]);

  const handleNavigation = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? Math.max(0, currentIndex - ITEMS_PER_VIEW)
      : currentIndex + ITEMS_PER_VIEW;
    setCurrentIndex(newIndex);
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="grid grid-cols-6 gap-6">
              {products.slice(currentIndex, currentIndex + ITEMS_PER_VIEW).map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleNavigation('prev')}
              disabled={currentIndex === 0}
              className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100 disabled:opacity-50"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => handleNavigation('next')}
              disabled={!hasMore && currentIndex + ITEMS_PER_VIEW >= products.length}
              className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100 disabled:opacity-50"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 