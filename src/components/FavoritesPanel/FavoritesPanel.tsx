import { X } from 'lucide-react';
import { TranslationKeys } from '../../types';

interface FavoritesPanelProps {
  favorites: string[];
  currentWord: string;
  onWordClick: (word: string) => void;
  onRemove: (word: string) => void;
  onClear: () => void;
  texts: TranslationKeys;
}

export function FavoritesPanel({
  favorites,
  currentWord,
  onWordClick,
  onRemove,
  onClear,
  texts
}: FavoritesPanelProps) {
  return (
    <aside className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex justify-between items-center">
        {texts.savedWords}
        {favorites.length > 0 && (
          <button
            className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={onClear}
            aria-label="Clear favorites"
          >
            {texts.clear}
          </button>
        )}
      </h3>

      {favorites.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">{texts.noFavorites}</p>
      ) : (
        <ul className="space-y-1">
          {favorites.map((item, i) => (
            <li key={i} className="group relative">
              <button
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  item === currentWord
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium'
                    : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
                onClick={() => onWordClick(item)}
              >
                <span className="text-xs px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded mr-2 font-medium">
                  EN
                </span>
                <span className="font-medium">{item}</span>
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                onClick={e => {
                  e.stopPropagation();
                  onRemove(item);
                }}
                aria-label={`Remove ${item} from favorites`}
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

