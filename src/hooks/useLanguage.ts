import { Language } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';

export function useLanguage() {
  const [language, setLanguage] = useLocalStorage<Language>(STORAGE_KEYS.LANGUAGE, 'en');

  return { language, setLanguage };
}

