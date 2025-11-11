import { STORAGE_KEYS } from './constants';

export class LocalStorageService {
  static get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }

  static getFavorites(): string[] {
    return this.get<string[]>(STORAGE_KEYS.FAVORITES, []);
  }

  static setFavorites(favorites: string[]): void {
    this.set(STORAGE_KEYS.FAVORITES, favorites);
  }

  static getHistory(): string[] {
    return this.get<string[]>(STORAGE_KEYS.HISTORY, []);
  }

  static setHistory(history: string[]): void {
    this.set(STORAGE_KEYS.HISTORY, history);
  }

  static getTheme(): 'light' | 'dark' {
    return this.get<'light' | 'dark'>(STORAGE_KEYS.THEME, 'light');
  }

  static setTheme(theme: 'light' | 'dark'): void {
    this.set(STORAGE_KEYS.THEME, theme);
  }

  static getLanguage(): 'en' | 'pt-BR' {
    return this.get<'en' | 'pt-BR'>(STORAGE_KEYS.LANGUAGE, 'en');
  }

  static setLanguage(language: 'en' | 'pt-BR'): void {
    this.set(STORAGE_KEYS.LANGUAGE, language);
  }

  static getTranslationCache() {
    return this.get(STORAGE_KEYS.TRANSLATION_CACHE, {});
  }

  static setTranslationCache(cache: unknown): void {
    this.set(STORAGE_KEYS.TRANSLATION_CACHE, cache);
  }
}

