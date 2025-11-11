import { useState, useCallback, useMemo } from 'react';
import './index.css';

import { Tab, Language } from './types';
import { translations } from './types/translations';

import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { useDictionary } from './hooks/useDictionary';
import { useTranslation } from './hooks/useTranslation';
import { useFavorites } from './hooks/useFavorites';
import { useHistory } from './hooks/useHistory';
import { useAudio } from './hooks/useAudio';

import { Header } from './components/Header/Header';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import { SearchForm } from './components/SearchForm/SearchForm';
import { WordDisplay } from './components/WordDisplay/WordDisplay';
import { MeaningCard } from './components/MeaningCard/MeaningCard';
import { ThesaurusPanel } from './components/ThesaurusPanel/ThesaurusPanel';
import { ExamplesPanel } from './components/ExamplesPanel/ExamplesPanel';
import { HistoryPanel } from './components/HistoryPanel/HistoryPanel';
import { FavoritesPanel } from './components/FavoritesPanel/FavoritesPanel';
import { LoadingIndicator } from './components/LoadingIndicator/LoadingIndicator';
import { ErrorDisplay } from './components/ErrorDisplay/ErrorDisplay';
import { WelcomeScreen } from './components/WelcomeScreen/WelcomeScreen';
import { Tabs } from './components/Tabs/Tabs';

export default function DictionaryApp() {
  const [word, setWord] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('definitions');

  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { definitions, relatedWords, loading, error, searchDictionary } = useDictionary();
  const {
    wordTranslation,
    definitionTranslations,
    exampleTranslations,
    translateWord,
    clearTranslations
  } = useTranslation(language, definitions);
  const { favorites, toggleFavorite, clearFavorites, isFavorite } = useFavorites();
  const { history, addToHistory, clearHistory } = useHistory();
  const { audioPlaying, speaking, playAudio, speakWord } = useAudio();

  const texts = translations[language];

  const handleSearch = useCallback(
    async (searchWord: string) => {
      if (!searchWord.trim()) return;

      setWord(searchWord);
      addToHistory(searchWord);
      await searchDictionary(searchWord, texts.wordNotFound);
      await translateWord(searchWord);
    },
    [searchDictionary, addToHistory, translateWord, texts.wordNotFound]
  );

  const handleLanguageChange = useCallback(
    (newLanguage: Language) => {
      setLanguage(newLanguage);
      clearTranslations();
      if (word) {
        translateWord(word);
      }
    },
    [setLanguage, clearTranslations, word, translateWord]
  );

  const handlePlayAudio = useCallback(
    (url: string) => {
      playAudio(url, errorMessage => {
        // Error handling is done in useAudio hook
      });
    },
    [playAudio]
  );

  const audioUrl = useMemo((): string | undefined => {
    if (definitions.length === 0) return undefined;
    return definitions[0].phonetics?.find(p => p.audio)?.audio;
  }, [definitions]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>  
      <div className="dark:bg-gray-900 min-h-screen">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col-reverse lg:flex-row gap-6 md:gap-8">
            <div className="w-full lg:w-1/4 flex-shrink-0">
              <div className="sticky top-4 md:top-6 space-y-4 md:space-y-6">
                <HistoryPanel
                  history={history}
                  currentWord={word}
                  onWordClick={handleSearch}
                  onClear={clearHistory}
                  texts={texts}
                />
                <FavoritesPanel
                  favorites={favorites}
                  currentWord={word}
                  onWordClick={handleSearch}
                  onRemove={toggleFavorite}
                  onClear={clearFavorites}
                  texts={texts}
                />
              </div>
            </div>

            <main className="w-full lg:w-3/4">
              <div className="mb-6">
                <SearchForm placeholder={texts.searchPlaceholder} loading={loading} onSearch={handleSearch} />
              </div>

              {loading && <LoadingIndicator text={texts.searching} />}

              {error ? (
                <ErrorDisplay error={error} onRetry={() => handleSearch(word)} texts={texts} />
              ) : definitions.length > 0 ? (
                <>
                  <WordDisplay
                    definition={definitions[0]}
                    translation={wordTranslation}
                    isFavorite={isFavorite(definitions[0].word)}
                    audioUrl={audioUrl}
                    audioPlaying={audioPlaying}
                    speaking={speaking}
                    onToggleFavorite={() => toggleFavorite(definitions[0].word)}
                    onPlayAudio={handlePlayAudio}
                    onSpeak={speakWord}
                    texts={texts}
                  />

                  <Tabs activeTab={activeTab} onTabChange={setActiveTab} texts={texts} />

                  <div className="tab-content">
                    {activeTab === 'definitions' && (
                      <div className="space-y-4 md:space-y-6">
                        {definitions[0].meanings.map((meaning, i) => (
                          <MeaningCard
                            key={i}
                            meaning={meaning}
                            word={definitions[0].word}
                            wordIndex={0}
                            definitionTranslations={definitionTranslations}
                            exampleTranslations={exampleTranslations}
                            language={language}
                            onWordClick={handleSearch}
                            texts={texts}
                          />
                        ))}
                      </div>
                    )}

                    {activeTab === 'thesaurus' && (
                      <ThesaurusPanel
                        relatedWords={relatedWords}
                        onWordClick={handleSearch}
                        texts={texts}
                      />
                    )}

                    {activeTab === 'examples' && (
                      <ExamplesPanel
                        definition={definitions[0]}
                        definitionTranslations={definitionTranslations}
                        exampleTranslations={exampleTranslations}
                        language={language}
                        texts={texts}
                      />
                    )}
                  </div>
                </>
              ) : (
                <WelcomeScreen onWordClick={handleSearch} texts={texts} />
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
