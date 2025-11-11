import { Language } from '../../types';
import { Languages } from 'lucide-react';

interface LanguageSwitcherProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageSwitcher({ language, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="flex space-x-2">
      <button
        className={`px-3 py-1 rounded-md text-sm font-medium flex items-center ${
          language === 'en'
            ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
        }`}
        onClick={() => onLanguageChange('en')}
        title="English"
        aria-label="Switch to English"
      >
        <Languages className="w-4 h-4 mr-1" />
        <span>EN</span>
      </button>
      <button
        className={`px-3 py-1 rounded-md text-sm font-medium flex items-center ${
          language === 'pt-BR'
            ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
        }`}
        onClick={() => onLanguageChange('pt-BR')}
        title="Português"
        aria-label="Switch to Portuguese"
      >
        <Languages className="w-4 h-4 mr-1" />
        <span>PT-BR</span>
      </button>
    </div>
  );
}

