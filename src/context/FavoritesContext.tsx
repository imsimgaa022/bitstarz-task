'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getFavorites, addToFavorites, removeFromFavorites } from '@/lib/api';

interface FavoritesContextType {
  favorites: string[];
  isLoading: boolean;
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (error) {
        console.error('Failed to load favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFavorites();
  }, []);

  const addFavorite = async (id: string) => {
    try {
      await addToFavorites(id);
      const updatedFavorites = await getFavorites();
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Failed to add favorite:', error);
      throw error;
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      await removeFromFavorites(id);
      const updatedFavorites = await getFavorites();
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      throw error;
    }
  };

  const isFavorite = (id: string) => favorites.some(productId => productId === id);

  return (
    <FavoritesContext.Provider value={{ favorites, isLoading, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
} 