export type DictionaryResponse = {
  word: string;
  phonetic?: string;
  phonetics: {
    text?: string;
    audio?: string;
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms?: string[];
      antonyms?: string[];
    }[];
    synonyms: string[];
    antonyms: string[];
  }[];
  sourceUrls?: string[];
  license?: {
    name: string;
    url: string;
  };
  origin?: string;
};

export type RelatedWord = {
  word: string;
  score: number;
};

export type Language = 'en' | 'pt-BR';

export type Theme = 'light' | 'dark';

export type Tab = 'definitions' | 'thesaurus' | 'examples';

export type TranslationCache = {
  [key: string]: {
    text: string;
    timestamp: number;
  };
};

export type Translation = {
  text: string;
  source: string;
};

export type Translations = {
  [key: string]: string;
};

export type { TranslationKeys } from './translations';

