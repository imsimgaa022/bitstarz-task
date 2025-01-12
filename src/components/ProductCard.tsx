'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { FavoriteButton } from './FavoriteButton';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group relative block">
        <h3 className="mt-2 text-lg font-medium text-gray-900">{product.title}</h3>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className="object-cover w-200px transition-transform duration-300 group-hover:scale-105"
        />
        <FavoriteButton productId={product.id} />
      </div>
    </Link>
  );
} 