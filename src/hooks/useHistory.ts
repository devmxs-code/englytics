import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, MAX_HISTORY_ITEMS } from '../utils/constants';

export function useHistory() {
  const [history, setHistory] = useLocalStorage<string[]>(STORAGE_KEYS.HISTORY, []);

  const addToHistory = useCallback((word: string) => {
    setHistory(prev => [
      word.toLowerCase(),
      ...prev.filter(w => w.toLowerCase() !== word.toLowerCase())
    ].slice(0, MAX_HISTORY_ITEMS));
  }, [setHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return {
    history,
    addToHistory,
    clearHistory
  };
}

