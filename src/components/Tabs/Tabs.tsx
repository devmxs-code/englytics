import { Tab, TranslationKeys } from '../../types';

interface TabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  texts: TranslationKeys;
}

export function Tabs({ activeTab, onTabChange, texts }: TabsProps) {
  const tabs: { key: Tab; label: string }[] = [
    { key: 'definitions', label: texts.definitions },
    { key: 'thesaurus', label: texts.thesaurus },
    { key: 'examples', label: texts.examples }
  ];

  return (
    <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700 mb-4 md:mb-6 no-scrollbar">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`flex-1 min-w-[120px] px-2 py-2 text-sm md:text-base font-medium whitespace-nowrap ${
            activeTab === tab.key
              ? 'text-slate-700 dark:text-slate-300 border-b-2 border-slate-700 dark:border-slate-300'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

