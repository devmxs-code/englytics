import { DictionaryResponse } from '../types';

export class DictionaryService {
  private static readonly BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

  static async fetchDefinition(word: string): Promise<DictionaryResponse[]> {
    const response = await fetch(`${this.BASE_URL}/${encodeURIComponent(word)}`);
    
    if (!response.ok) {
      throw new Error(response.status === 404 ? 'Word not found' : 'Failed to fetch data');
    }
    
    return response.json();
  }
}

