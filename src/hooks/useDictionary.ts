import { useState, useCallback } from 'react';
import { DictionaryResponse, RelatedWord } from '../types';
import { DictionaryService } from '../services/DictionaryService';
import { RelatedWordsService } from '../services/RelatedWordsService';

export function useDictionary() {
  const [definitions, setDefinitions] = useState<DictionaryResponse[]>([]);
  const [relatedWords, setRelatedWords] = useState<RelatedWord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchDictionary = useCallback(async (word: string, wordNotFoundText: string) => {
    if (!word.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const [definitionsData, relatedWordsData] = await Promise.all([
        DictionaryService.fetchDefinition(word),
        RelatedWordsService.fetchRelatedWords(word)
      ]);

      setDefinitions(definitionsData);
      setRelatedWords(relatedWordsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage === 'Word not found' ? wordNotFoundText : errorMessage);
      setDefinitions([]);
      setRelatedWords([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    definitions,
    relatedWords,
    loading,
    error,
    searchDictionary,
    clearError
  };
}

