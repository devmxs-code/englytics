import { TranslationKeys } from '../../types';
import { SUGGESTED_WORDS } from '../../utils/constants';

interface WelcomeScreenProps {
  onWordClick: (word: string) => void;
  texts: TranslationKeys;
}

export function WelcomeScreen({ onWordClick, texts }: WelcomeScreenProps) {
  return (
    <div className="text-center py-8 md:py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4">
        {texts.welcome}
      </h2>
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
        {texts.welcomeDesc}
      </p>
      <div className="max-w-md mx-auto">
        <p className="text-gray-700 dark:text-gray-400 mb-2 md:mb-3">{texts.tryWords}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {SUGGESTED_WORDS.map(word => (
            <button
              key={word}
              className="px-3 py-2 text-sm md:px-4 md:py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full transition-colors"
              onClick={() => onWordClick(word)}
            >
              <span className="text-xs px-1 py-0.5 md:px-1.5 md:py-0.5 bg-slate-200 dark:bg-slate-700 rounded mr-1">
                EN
              </span>
              {word}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

