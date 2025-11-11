import { Language } from '../../types';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold flex items-center text-gray-900 dark:text-white">
          <img
            src="/gitbook.svg"
            alt="Logo"
            className="mr-2 w-6 h-6 dark:filter dark:invert"
          />
          <span>Englytics</span>
        </h1>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} />
        </div>
      </div>
    </header>
  );
}

