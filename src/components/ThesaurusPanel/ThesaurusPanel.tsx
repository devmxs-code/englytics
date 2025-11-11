import { RelatedWord, TranslationKeys } from '../../types';

interface ThesaurusPanelProps {
  relatedWords: RelatedWord[];
  onWordClick: (word: string) => void;
  texts: TranslationKeys;
}

export function ThesaurusPanel({ relatedWords, onWordClick, texts }: ThesaurusPanelProps) {
  const getStrength = (score: number): number => {
    return Math.min(3, Math.floor(score / 200));
  };

  const getSizeClass = (strength: number): string => {
    const classes = ['text-sm', 'text-base', 'text-lg', 'text-xl'];
    return classes[strength] || classes[0];
  };

  const getColorClass = (strength: number): string => {
    if (strength === 0) {
      return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
    if (strength === 1) {
      return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200';
    }
    if (strength === 2) {
      return 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100';
    }
    return 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-slate-100';
  };

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{texts.wordNetwork}</h3>

      <div className="flex flex-wrap gap-3">
        {relatedWords.slice(0, 50).map((word, i) => {
          const strength = getStrength(word.score);
          return (
            <button
              key={i}
              className={`px-3 py-1 rounded-full transition-all hover:scale-105 ${getSizeClass(strength)} ${getColorClass(strength)}`}
              onClick={() => onWordClick(word.word)}
              aria-label={`Search for ${word.word}`}
              title={`Score: ${word.score}`}
            >
              <span className="text-xs mr-1 px-1 py-0.5 bg-gray-200 dark:bg-gray-600 rounded">
                EN
              </span>
              {word.word}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {texts.semanticSimilarity}
        </h4>
        <div className="space-y-3">
          {relatedWords.slice(0, 10).map((word, i) => (
            <div key={i} className="flex items-center">
              <button
                className="w-32 text-left text-sm text-gray-700 dark:text-gray-300 hover:underline truncate"
                onClick={() => onWordClick(word.word)}
                title={`Search for ${word.word}`}
              >
                <span className="text-xs mr-1 px-1 py-0.5 bg-gray-100 dark:bg-gray-600 rounded">
                  EN
                </span>
                {word.word}
              </button>
              <div className="flex-1 mx-2 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-500"
                  style={{ width: `${Math.min(100, word.score / 10)}%` }}
                />
              </div>
              <div className="w-12 text-right text-sm font-medium text-slate-700 dark:text-slate-300">
                {Math.round(word.score)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

