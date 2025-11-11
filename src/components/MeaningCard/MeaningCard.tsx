import { DictionaryResponse, TranslationKeys, Translations } from '../../types';

interface MeaningCardProps {
  meaning: DictionaryResponse['meanings'][0];
  word: string;
  wordIndex: number;
  definitionTranslations: Translations;
  exampleTranslations: Translations;
  language: 'en' | 'pt-BR';
  onWordClick: (word: string) => void;
  texts: TranslationKeys;
}

export function MeaningCard({
  meaning,
  word,
  wordIndex,
  definitionTranslations,
  exampleTranslations,
  language,
  onWordClick,
  texts
}: MeaningCardProps) {
  return (
    <article className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="mb-4 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-full inline-block text-sm font-medium">
        {meaning.partOfSpeech}
      </div>

      <div className="space-y-4">
        {meaning.definitions.slice(0, 5).map((def, i) => {
          const defKey = `${word}-${meaning.partOfSpeech}-${i}`;
          const exampleKey = `${word}-${meaning.partOfSpeech}-${i}-example`;

          return (
            <div key={i} className="pl-2 border-l-4 border-slate-300 dark:border-slate-600">
              <div className="mb-2">
                <div className="flex items-start">
                  <span className="mr-2 font-medium text-gray-500 dark:text-gray-400">
                    {i + 1}.
                  </span>
                  <div>
                    <div className="mb-2">
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {texts.definition}:
                        </span>
                        <span className="ml-2 text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-600 rounded">
                          English
                        </span>
                      </div>
                      <p className="text-gray-800 dark:text-gray-200">{def.definition}</p>
                    </div>

                    {language === 'pt-BR' && definitionTranslations[defKey] && (
                      <div className="mb-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-600 rounded mb-1 inline-block">
                          Português
                        </span>
                        <p className="text-gray-800 dark:text-gray-200">
                          {definitionTranslations[defKey]}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {def.example && (
                <div className="ml-6 mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {texts.example}:
                      </span>
                      <span className="ml-2 text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-600 rounded">
                        English
                      </span>
                    </div>
                    <p className="italic text-gray-800 dark:text-gray-200">"{def.example}"</p>
                  </div>

                  {language === 'pt-BR' && exampleTranslations[exampleKey] && (
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-600 rounded">
                      <span className="text-xs px-1.5 py-0.5 bg-gray-200 dark:bg-gray-500 rounded mb-1 inline-block">
                        Português
                      </span>
                      <p className="italic text-gray-800 dark:text-gray-200">
                        "{exampleTranslations[exampleKey]}"
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {(meaning.synonyms.length > 0 || meaning.antonyms.length > 0) && (
        <div className="mt-4 space-y-3">
          {meaning.synonyms.length > 0 && (
            <div>
              <strong className="text-gray-700 dark:text-gray-300">{texts.synonyms}: </strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {meaning.synonyms.slice(0, 5).map((syn, i) => (
                  <button
                    key={i}
                    className="px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full transition-colors"
                    onClick={() => onWordClick(syn)}
                    title={`Search for ${syn}`}
                  >
                    <span className="text-xs mr-1 px-1 py-0.5 bg-slate-200 dark:bg-slate-600 rounded">
                      EN
                    </span>
                    {syn}
                  </button>
                ))}
                {meaning.synonyms.length > 5 && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 self-center">
                    +{meaning.synonyms.length - 5} {texts.more}
                  </span>
                )}
              </div>
            </div>
          )}

          {meaning.antonyms.length > 0 && (
            <div>
              <strong className="text-gray-700 dark:text-gray-300">{texts.antonyms}: </strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {meaning.antonyms.slice(0, 5).map((ant, i) => (
                  <button
                    key={i}
                    className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-800 dark:text-red-200 rounded-full transition-colors"
                    onClick={() => onWordClick(ant)}
                    title={`Search for ${ant}`}
                  >
                    <span className="text-xs mr-1 px-1 py-0.5 bg-red-200 dark:bg-red-700 rounded">
                      EN
                    </span>
                    {ant}
                  </button>
                ))}
                {meaning.antonyms.length > 5 && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 self-center">
                    +{meaning.antonyms.length - 5} {texts.more}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

