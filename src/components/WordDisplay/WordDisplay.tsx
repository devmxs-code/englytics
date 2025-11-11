import { DictionaryResponse, Translation, TranslationKeys } from '../../types';
import { Star, Volume2, Mic } from 'lucide-react';

interface WordDisplayProps {
  definition: DictionaryResponse;
  translation: Translation | null;
  isFavorite: boolean;
  audioUrl?: string;
  audioPlaying: boolean;
  speaking: boolean;
  onToggleFavorite: () => void;
  onPlayAudio: (url: string) => void;
  onSpeak: (text: string) => void;
  texts: TranslationKeys;
}

export function WordDisplay({
  definition,
  translation,
  isFavorite,
  audioUrl,
  audioPlaying,
  speaking,
  onToggleFavorite,
  onPlayAudio,
  onSpeak,
  texts
}: WordDisplayProps) {
  const phonetic = definition.phonetics?.find(p => p.audio && p.text) ||
    definition.phonetics?.find(p => p.text);

  return (
    <section className="mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white flex items-center">
            {definition.word}
            <span className="ml-2 text-sm px-2 py-1 bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200 rounded">
              English
            </span>
          </h2>
          {phonetic?.text && (
            <div className="mt-1 text-gray-600 dark:text-gray-400">
              <span className="font-medium">{texts.pronunciation}:</span>
              <span className="ml-2 font-mono">/{phonetic.text}/</span>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            className={`p-2 rounded-full ${
              isFavorite
                ? 'text-yellow-500 hover:text-yellow-600'
                : 'text-gray-400 hover:text-yellow-500'
            }`}
            onClick={onToggleFavorite}
            aria-label={isFavorite ? texts.removeFromFavorites : texts.addToFavorites}
            title={isFavorite ? texts.removeFromFavorites : texts.addToFavorites}
          >
            <Star 
              className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
              fill={isFavorite ? 'currentColor' : 'none'}
            />
          </button>

          {audioUrl && (
            <button
              className={`p-2 rounded-full text-gray-700 dark:text-gray-300 ${
                audioPlaying
                  ? 'bg-slate-100 dark:bg-slate-800'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => onPlayAudio(audioUrl)}
              disabled={audioPlaying}
              aria-label={texts.playPronunciation}
              title={texts.playPronunciation}
            >
              {audioPlaying ? (
                <span className="flex items-center">
                  <span className="w-4 h-4 mr-1 bg-slate-500 dark:bg-slate-400 rounded-full animate-pulse"></span>
                  <Volume2 className="w-5 h-5" />
                </span>
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          )}

          <button
            className={`p-2 rounded-full text-gray-700 dark:text-gray-300 ${
              speaking
                ? 'bg-slate-100 dark:bg-slate-800'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => onSpeak(definition.word)}
            disabled={speaking}
            aria-label={texts.speakWord}
            title={texts.speakWord}
          >
            {speaking ? (
              <span className="flex items-center">
                <span className="w-4 h-4 mr-1 bg-slate-500 dark:bg-slate-400 rounded-full animate-pulse"></span>
                <Mic className="w-5 h-5" />
              </span>
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {translation && (
        <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="flex items-center mb-1">
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {texts.translation}:
            </span>
            <span className="ml-2 text-xs px-2 py-1 bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200 rounded">
              {translation.source}
            </span>
          </div>
          <span className="text-slate-700 dark:text-slate-200">{translation.text}</span>
        </div>
      )}

      {definition.origin && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">{texts.origin}</h4>
          <p className="text-gray-700 dark:text-gray-300">{definition.origin}</p>
        </div>
      )}
    </section>
  );
}

