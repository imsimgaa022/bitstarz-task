import { Product, Comment } from '@/types';

const BASE_URL = 'https://job-application.bitstarz.workers.dev';
const API_KEY = `secret-key-${process.env.NEXT_PUBLIC_API_USER || 'default'}`;

async function fetchWithError<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

export async function getProducts(category: string, offset: number = 0, limit: number = 10): Promise<Product[]> {
  return fetchWithError<Product[]>(
    `${BASE_URL}/products/${category}?offset=${offset}&limit=${limit}`
  );
}

export async function getProduct(id: string): Promise<Product> {
  return fetchWithError<Product>(`${BASE_URL}/product?id=${id}`);
}

export async function getFavorites(): Promise<string[]> {
  return fetchWithError<string[]>(`${BASE_URL}/favorites`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
}

export async function addToFavorites(id: string): Promise<void> {
  await fetchWithError(`${BASE_URL}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify({ id }),
  });
}

export async function removeFromFavorites(id: string): Promise<void> {
  await fetchWithError(`${BASE_URL}/favorites`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify({ id }),
  });
}

export async function getComments(productId: string): Promise<Comment[]> {
  return fetchWithError<Comment[]>(`${BASE_URL}/comments?id=${productId}`);
} 