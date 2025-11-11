import { RelatedWord } from '../types';
import { MAX_RELATED_WORDS } from '../utils/constants';

export class RelatedWordsService {
  private static readonly BASE_URL = 'https://api.datamuse.com/words';

  static async fetchRelatedWords(word: string): Promise<RelatedWord[]> {
    try {
      const [synonyms, triggers, adjectives] = await Promise.all([
        fetch(`${this.BASE_URL}?rel_syn=${word}`).then(res => res.json()),
        fetch(`${this.BASE_URL}?rel_trg=${word}`).then(res => res.json()),
        fetch(`${this.BASE_URL}?rel_jjb=${word}`).then(res => res.json())
      ]);

      const combined = [...synonyms, ...triggers, ...adjectives]
        .filter((v, i, a) => a.findIndex(t => t.word === v.word) === i)
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_RELATED_WORDS);

      return combined;
    } catch (error) {
      console.error('Failed to load related words:', error);
      return [];
    }
  }
}

