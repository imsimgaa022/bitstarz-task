export interface Product {
  id: string;
  title: string;
  image: string;
  category: 'top' | 'exclusive' | 'recent';
}

export type Comment = string;

export interface ApiResponse<T> {
  data: T;
  error?: string;
} 