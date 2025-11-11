import { FormEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  placeholder: string;
  loading: boolean;
  onSearch: (word: string) => void;
}

export function SearchForm({ placeholder, loading, onSearch }: SearchFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('search') as HTMLInputElement;
    onSearch(input.value);
  };

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          name="search"
          type="text"
          placeholder={placeholder}
          disabled={loading}
          aria-label="Search input"
          className="w-full p-4 pl-6 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          disabled={loading}
          aria-label="Search"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-slate-300" />
          )}
        </button>
      </div>
    </form>
  );
}

