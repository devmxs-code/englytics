import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>(STORAGE_KEYS.FAVORITES, []);

  const toggleFavorite = useCallback((word: string) => {
    setFavorites(prev => 
      prev.includes(word)
        ? prev.filter(w => w !== word)
        : [...prev, word]
    );
  }, [setFavorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, [setFavorites]);

  const isFavorite = useCallback((word: string) => {
    return favorites.includes(word);
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    clearFavorites,
    isFavorite
  };
}

