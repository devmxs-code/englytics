import { Language } from './index';

export type TranslationKeys = {
  searchPlaceholder: string;
  welcome: string;
  welcomeDesc: string;
  tryWords: string;
  definitions: string;
  thesaurus: string;
  examples: string;
  wordNetwork: string;
  semanticSimilarity: string;
  usageExamples: string;
  recentSearches: string;
  savedWords: string;
  noHistory: string;
  noFavorites: string;
  clear: string;
  origin: string;
  definition: string;
  example: string;
  synonyms: string;
  antonyms: string;
  meaning: string;
  pronunciation: string;
  translation: string;
  audio: string;
  speak: string;
  addToFavorites: string;
  removeFromFavorites: string;
  playPronunciation: string;
  speakWord: string;
  wordNotFound: string;
  tryAgain: string;
  searching: string;
  error: string;
  audioUnavailable: string;
  more: string;
};

export const translations: Record<Language, TranslationKeys> = {
  en: {
    searchPlaceholder: 'Search for a word...',
    welcome: 'Welcome to Englytics',
    welcomeDesc: 'Search for any English word to get detailed definitions, examples, pronunciations, and translations.',
    tryWords: 'Try these words:',
    definitions: 'Definitions',
    thesaurus: 'Thesaurus',
    examples: 'Examples',
    wordNetwork: 'Word Network',
    semanticSimilarity: 'Semantic Similarity',
    usageExamples: 'Usage Examples',
    recentSearches: 'Recent Searches',
    savedWords: 'Saved Words',
    noHistory: 'No search history yet',
    noFavorites: 'No favorites yet',
    clear: 'Clear',
    origin: 'Origin',
    definition: 'Definition',
    example: 'Example',
    synonyms: 'Synonyms',
    antonyms: 'Antonyms',
    meaning: 'Meaning',
    pronunciation: 'Pronunciation',
    translation: 'Translation',
    audio: 'Audio',
    speak: 'Speak',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    playPronunciation: 'Play pronunciation',
    speakWord: 'Speak word',
    wordNotFound: 'Word not found',
    tryAgain: 'Try Again',
    searching: 'Searching dictionaries...',
    error: 'Oops! Something went wrong',
    audioUnavailable: 'Audio playback unavailable',
    more: 'more'
  },
  'pt-BR': {
    searchPlaceholder: 'Buscar uma palavra...',
    welcome: 'Bem-vindo ao Englytics',
    welcomeDesc: 'Pesquise qualquer palavra em inglês para obter definições detalhadas, exemplos, pronúncia e traduções.',
    tryWords: 'Experimente estas palavras:',
    definitions: 'Definições',
    thesaurus: 'Tesauro',
    examples: 'Exemplos',
    wordNetwork: 'Rede de Palavras',
    semanticSimilarity: 'Similaridade Semântica',
    usageExamples: 'Exemplos de Uso',
    recentSearches: 'Pesquisas Recentes',
    savedWords: 'Palavras Salvas',
    noHistory: 'Nenhum histórico de pesquisa ainda',
    noFavorites: 'Nenhum favorito ainda',
    clear: 'Limpar',
    origin: 'Origem',
    definition: 'Definição',
    example: 'Exemplo',
    synonyms: 'Sinônimos',
    antonyms: 'Antônimos',
    meaning: 'Significado',
    pronunciation: 'Pronúncia',
    translation: 'Tradução',
    audio: 'Áudio',
    speak: 'Falar',
    addToFavorites: 'Adicionar aos favoritos',
    removeFromFavorites: 'Remover dos favoritos',
    playPronunciation: 'Reproduzir pronúncia',
    speakWord: 'Falar palavra',
    wordNotFound: 'Palavra não encontrada',
    tryAgain: 'Tentar Novamente',
    searching: 'Pesquisando nos dicionários...',
    error: 'Ops! Algo deu errado',
    audioUnavailable: 'Reprodução de áudio indisponível',
    more: 'mais'
  }
};

