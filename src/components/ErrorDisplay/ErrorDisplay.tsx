import { AlertTriangle } from 'lucide-react';
import { TranslationKeys } from '../../types';

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
  texts: TranslationKeys;
}

export function ErrorDisplay({ error, onRetry, texts }: ErrorDisplayProps) {
  return (
    <div className="p-6 bg-red-50 dark:bg-red-900 rounded-lg text-center">
      <div className="flex justify-center mb-3">
        <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-2">{texts.error}</h3>
      <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
      <button
        className="px-4 py-2 bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700 text-white rounded-md transition-colors"
        onClick={onRetry}
      >
        {texts.tryAgain}
      </button>
    </div>
  );
}

