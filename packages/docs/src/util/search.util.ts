import { useMemo } from 'react';

import { isEmpty } from './string.util';

import type { DocsPageHeading, SearchablePage } from '../interface';

const PARTIAL_MATCH_WORD_LENGTH_THRESHOLD = 5;
const WHOLE_WORD_MATCH_FAVOR_WEIGHT = 2;
const TITLE_FAVOR_WEIGHT = 15;

export interface SearchScore {
  entry: SearchablePage;
  metaScore: number;
  score: number;
  isExactTitleMatch: boolean;
  matchedHeader: DocsPageHeading | undefined;
}

function getSearchScore(words: string[], entry: SearchablePage): SearchScore {
  let score = 0;
  let metaScore = 0;

  for (const word of words) {
    score +=
      (entry.title.match(new RegExp(`\\b${word}\\b`, 'gi')) ?? []).length *
      TITLE_FAVOR_WEIGHT *
      WHOLE_WORD_MATCH_FAVOR_WEIGHT;
    score +=
      (entry.textContent.match(new RegExp(`\\b${word}\\b`, 'gi')) ?? []).length *
      WHOLE_WORD_MATCH_FAVOR_WEIGHT;

    if (word.length >= PARTIAL_MATCH_WORD_LENGTH_THRESHOLD) {
      score += (entry.title.match(new RegExp(`${word}`, 'gi')) ?? []).length * TITLE_FAVOR_WEIGHT;
      score += (entry.textContent.match(new RegExp(`${word}`, 'gi')) ?? []).length;
    }
  }

  const exactMatchFavorWeight = words.length;
  const exactSearch = words.join(' ').toLowerCase();
  const isExactTitleMatch = entry.title.toLowerCase().includes(exactSearch);

  const exactTitleMatchScore =
    (isExactTitleMatch ? 1 : 0) *
    TITLE_FAVOR_WEIGHT *
    exactMatchFavorWeight *
    WHOLE_WORD_MATCH_FAVOR_WEIGHT;

  if (isExactTitleMatch) {
    metaScore += 1;
  }

  score += exactTitleMatchScore;
  score +=
    (entry.textContent.match(new RegExp(`\\b${exactSearch}\\b`, 'gi')) ?? []).length *
    exactMatchFavorWeight *
    WHOLE_WORD_MATCH_FAVOR_WEIGHT;

  return {
    score,
    metaScore,
    entry,
    isExactTitleMatch: exactTitleMatchScore > 0,
    matchedHeader: entry.headings.find(header => header.title.toLowerCase().includes(exactSearch)),
  };
}

export function useSearchScores(query: string | null, entries: SearchablePage[]): SearchScore[] {
  return useMemo(() => {
    if (!query || isEmpty(query.trim())) {
      return [];
    }

    const queryWords = query.split(' ').filter(word => word.trim().length > 0);

    const scores = entries
      .map(entry => getSearchScore(queryWords, entry))
      .filter(result => result.score > 0);

    scores.sort((a, b) => {
      if (a.metaScore !== b.metaScore) {
        return b.metaScore - a.metaScore;
      }

      return b.score - a.score;
    });

    return scores;
  }, [entries, query]);
}
