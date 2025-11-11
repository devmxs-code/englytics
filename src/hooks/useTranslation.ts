import { useState, useCallback, useEffect, useRef } from 'react';
import { Language, DictionaryResponse, Translation, TranslationCache, Translations } from '../types';
import { TranslationService } from '../services/TranslationService';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';

export function useTranslation(language: Language, definitions: DictionaryResponse[]) {
  const [translationCache, setTranslationCache] = useLocalStorage<TranslationCache>(
    STORAGE_KEYS.TRANSLATION_CACHE,
    {}
  );
  const cacheRef = useRef(translationCache);
  const [wordTranslation, setWordTranslation] = useState<Translation | null>(null);
  const [definitionTranslations, setDefinitionTranslations] = useState<Translations>({});
  const [exampleTranslations, setExampleTranslations] = useState<Translations>({});
  
  // Keep ref in sync with state
  useEffect(() => {
    cacheRef.current = translationCache;
  }, [translationCache]);

  const translateWord = useCallback(async (word: string) => {
    if (language === 'en') {
      setWordTranslation(null);
      return;
    }

    try {
      const cacheKey = `main-word-${word}`;
      const translated = await TranslationService.translate(
        word,
        language,
        translationCache,
        cacheKey,
        (key, value) => {
          setTranslationCache(prev => ({
            ...prev,
            [key]: { text: value, timestamp: Date.now() }
          }));
        }
      );
      setWordTranslation({
        text: translated,
        source: 'Português'
      });
    } catch (error) {
      console.error('Translation failed:', error);
      setWordTranslation(null);
    }
  }, [language, translationCache, setTranslationCache]);

  const translateDefinitionsAndExamples = useCallback(async () => {
    if (language === 'en' || definitions.length === 0) {
      setDefinitionTranslations({});
      setExampleTranslations({});
      return;
    }

    const definitionsToTranslate: Record<string, string> = {};
    const examplesToTranslate: Record<string, string> = {};

    definitions.forEach(def => {
      def.meanings.forEach(meaning => {
        meaning.definitions.forEach((definition, defIndex) => {
          const defKey = `${def.word}-${meaning.partOfSpeech}-${defIndex}`;
          definitionsToTranslate[defKey] = definition.definition;
          
          if (definition.example) {
            const exampleKey = `${def.word}-${meaning.partOfSpeech}-${defIndex}-example`;
            examplesToTranslate[exampleKey] = definition.example;
          }
        });
      });
    });

    const updateCache = (key: string, value: string) => {
      setTranslationCache(prev => {
        const newCache = {
          ...prev,
          [key]: { text: value, timestamp: Date.now() }
        };
        // Update ref immediately so other translations see the update
        cacheRef.current = newCache;
        return newCache;
      });
    };

    // Get fresh cache function - always returns latest cache state from ref
    const getCache = () => cacheRef.current;

    try {
      const [defResults, exampleResults] = await Promise.all([
        TranslationService.translateBatch(definitionsToTranslate, language, getCache, updateCache),
        TranslationService.translateBatch(examplesToTranslate, language, getCache, updateCache)
      ]);

      setDefinitionTranslations(defResults);
      setExampleTranslations(exampleResults);
    } catch (error) {
      console.error('Error translating definitions and examples:', error);
      setDefinitionTranslations({});
      setExampleTranslations({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, definitions, setTranslationCache]);

  useEffect(() => {
    translateDefinitionsAndExamples();
  }, [translateDefinitionsAndExamples]);

  const clearTranslations = useCallback(() => {
    setDefinitionTranslations({});
    setExampleTranslations({});
    setWordTranslation(null);
  }, []);

  return {
    wordTranslation,
    definitionTranslations,
    exampleTranslations,
    translateWord,
    clearTranslations
  };
}

