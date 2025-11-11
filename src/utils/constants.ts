export const STORAGE_KEYS = {
  FAVORITES: 'dictionaryFavorites',
  HISTORY: 'dictionaryHistory',
  THEME: 'dictionaryTheme',
  LANGUAGE: 'dictionaryLanguage',
  TRANSLATION_CACHE: 'translationCache'
} as const;

export const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const MAX_HISTORY_ITEMS = 15;

export const MAX_RELATED_WORDS = 30;

export const SUGGESTED_WORDS = ['hello', 'beautiful', 'dictionary', 'learn', 'language'];

