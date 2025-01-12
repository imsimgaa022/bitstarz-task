'use server';

import { getComments } from '@/lib/api';

export async function loadComments(productId: string) {
  const comments = await getComments(productId);
  return comments;
} 