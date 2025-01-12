'use server';

import { getProducts } from '@/lib/api';

export async function loadMoreProducts(category: string, offset: number) {
  const limit = 6;
  const products = await getProducts(category, offset, limit);
  return {
    products,
    hasMore: products.length === limit
  };
} 