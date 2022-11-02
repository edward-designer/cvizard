import { stopwords } from '@/constant/stopWords';

type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  logo?: string;
};
export function openGraph({
  siteName,
  templateTitle,
  description,
  logo = 'https://cvizard.vercel.app/favicon/android-chrome-512x512.png',
}: OpenGraphType): string {
  const ogLogo = encodeURIComponent(logo);
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
  const ogDesc = encodeURIComponent(description.trim());

  return `https://og-theta.vercel.app/api/general?siteName=${ogSiteName}&description=${ogDesc}&logo=${ogLogo}${
    ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
  }`;
}

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

// keywords helpers

export function extractTextFromHTML(html: string): string {
  return html
    .replace(/<[a-z/][^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[\t\n\r]/gm, '')
    .trim();
}

export function extractKeywordsFromString(text: string): string[] {
  const keywordArray = text
    .toLocaleLowerCase()
    .replace(/[^a-zA-Z0-9'-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter(Boolean);
  return Array.from(new Set(keywordArray));
}

export function getFilteredKeywordList(
  keywords: string[],
  wordsToRemove = stopwords
): string[] {
  return keywords.filter((keyword) => !wordsToRemove.includes(keyword));
}

export function getMatchedKeywordList(
  keywords: string[],
  keywordsToMatch: string[]
): string[] {
  return keywords.filter((keyword) => keywordsToMatch.includes(keyword));
}

export function hightlightKeywords(
  text: string,
  keywordsToMatch: string[]
): string {
  const regex = new RegExp(
    `(?<!\\w)(${keywordsToMatch.join('|')})(?!\\w)`,
    'gi'
  );
  return text.replaceAll(regex, (match) => `==${match}==`);
}

export function removeKeywordHighlights(text: string): string {
  const regex = new RegExp(`==([\\w'-]+)==`, 'gi');
  return text.replaceAll(regex, (_, group) => group);
}

export function getKeywordScore(
  matchedKeywords: string[],
  keywordsToMatch: string[]
): number {
  return Math.round((matchedKeywords.length / keywordsToMatch.length) * 100);
}

/* simple pipe function */
type TFunc<T> = (x: T) => T;
export function pipe<T extends TFunc<K>, K>(...fns: Array<T>): (x: K) => K {
  return (x) => fns.reduce((v, f) => f(v), x);
}
