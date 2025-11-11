import { DictionaryResponse, TranslationKeys, Translations } from '../../types';

interface ExamplesPanelProps {
  definition: DictionaryResponse;
  definitionTranslations: Translations;
  exampleTranslations: Translations;
  language: 'en' | 'pt-BR';
  texts: TranslationKeys;
}

export function ExamplesPanel({
  definition,
  definitionTranslations,
  exampleTranslations,
  language,
  texts
}: ExamplesPanelProps) {
  const examples = definition.meanings.flatMap((meaning, meaningIndex) =>
    meaning.definitions
      .filter(def => def.example)
      .map((def, i) => {
        const exampleKey = `${definition.word}-${meaning.partOfSpeech}-${i}-example`;
        const defKey = `${definition.word}-${meaning.partOfSpeech}-${i}`;

        return {
          example: def.example!,
          definition: def.definition,
          exampleKey,
          defKey,
          key: `${meaningIndex}-${i}`
        };
      })
  );

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{texts.usageExamples}</h3>

      <div className="grid md:grid-cols-2 gap-4">
        {examples.map(example => (
          <div key={example.key} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <div className="flex items-center mb-1">
                  <span className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-600 rounded mr-2">
                    English
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {texts.example}:
                  </span>
                </div>
                <p className="italic text-gray-800 dark:text-gray-200">"{example.example}"</p>
              </div>

              {language === 'pt-BR' && exampleTranslations[example.exampleKey] && (
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded">
                  <div className="flex items-center mb-1">
                    <span className="text-xs px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded mr-2">
                      Português
                    </span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {texts.example}:
                    </span>
                  </div>
                  <p className="italic text-slate-800 dark:text-slate-200">
                    "{exampleTranslations[example.exampleKey]}"
                  </p>
                </div>
              )}

              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <div className="flex items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {texts.meaning}:
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-600 rounded mr-2">
                    English
                  </span>
                  <p className="text-gray-800 dark:text-gray-200">{example.definition}</p>
                </div>

                {language === 'pt-BR' && definitionTranslations[example.defKey] && (
                  <div>
                    <span className="text-xs px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded mr-2">
                      Português
                    </span>
                    <p className="text-gray-800 dark:text-gray-200">
                      {definitionTranslations[example.defKey]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

