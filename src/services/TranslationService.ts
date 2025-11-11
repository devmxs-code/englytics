import { Language, TranslationCache } from '../types';
import { CACHE_DURATION } from '../utils/constants';

export class TranslationService {
  private static readonly BASE_URL = 'https://api.mymemory.translated.net/get';

  static async translate(
    text: string,
    targetLanguage: Language,
    cache: TranslationCache,
    cacheKey?: string,
    onCacheUpdate?: (key: string, value: string) => void
  ): Promise<string> {
    if (targetLanguage === 'en') return text;
    
    const key = cacheKey || text;
    const cached = cache[key];
    
    // Cache valid for 24 hours
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.text;
    }

    try {
      const targetLang = targetLanguage === 'pt-BR' ? 'pt' : targetLanguage;
      const url = new URL(this.BASE_URL);
      url.searchParams.append('q', text);
      url.searchParams.append('langpair', `en|${targetLang}`);

      const response = await fetch(url.toString(), {
        headers: { 'Accept': 'application/json' },
      });
      
      const data = await response.json();

      if (data.responseStatus === 200 && data.responseData && data.responseData.translatedText) {
        const translatedText = data.responseData.translatedText;
        
        // Update cache
        onCacheUpdate?.(key, translatedText);
        
        return translatedText;
      } else {
        console.warn('Translation API non-200 response:', data.responseStatus, data.responseDetails);
      }
    } catch (error) {
      console.error('Translation failed:', error);
    }
    
    return text; // Return original text if translation fails
  }

  static async translateBatch(
    texts: Record<string, string>,
    targetLanguage: Language,
    getCache: () => TranslationCache,
    onCacheUpdate?: (key: string, value: string) => void
  ): Promise<Record<string, string>> {
    if (targetLanguage === 'en') return {};

    const translations: Record<string, string> = {};
    
    // Translate all in parallel (like original)
    // Each translation gets fresh cache via getCache()
    const promises = Object.entries(texts).map(async ([key, text]) => {
      const translated = await this.translate(text, targetLanguage, getCache(), key, onCacheUpdate);
      return [key, translated] as [string, string];
    });

    const results = await Promise.all(promises);
    
    results.forEach(([key, translation]) => {
      translations[key] = translation;
    });

    return translations;
  }
}

