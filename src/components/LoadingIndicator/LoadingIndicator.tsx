import { TranslationKeys } from '../../types';

interface LoadingIndicatorProps {
  text: string;
}

export function LoadingIndicator({ text }: LoadingIndicatorProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center">
        <div className="w-12 h-12 border-4 border-slate-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-800 dark:text-gray-200">{text}</p>
      </div>
    </div>
  );
}

