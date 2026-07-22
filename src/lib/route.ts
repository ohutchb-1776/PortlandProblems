import servicesData from "@data/services.json";
import type { Service } from "./types";

export const services = servicesData as Service[];

/** Small stop-word list so common filler doesn't skew matches. */
const STOP_WORDS = new Set([
  "the", "and", "for", "you", "your", "with", "how", "what", "where", "who",
  "can", "get", "need", "want", "have", "there", "this", "that", "does", "did",
  "about", "near", "from", "into", "out", "was", "are", "his", "her",
]);

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));
}

/**
 * A keyword matches a token only at the word level, so "car" does not match
 * the keyword "cart". Prefix matches are allowed only for tokens of 4+
 * characters, which lets "plowing" hit "plow" without false positives.
 */
function keywordHit(keywords: string[], token: string): boolean {
  for (const keyword of keywords) {
    for (const word of keyword.split(/\s+/)) {
      if (word === token) return true;
      if (token.length >= 4 && word.startsWith(token)) return true;
      if (token.length >= 4 && word.length >= 4 && token.startsWith(word)) return true;
    }
  }
  return false;
}

export interface RouteResult {
  service: Service;
  score: number;
}

/**
 * Match a resident's plain-language query to services.
 * A keyword hit is worth more than an incidental match in title/explanation.
 */
export function routeQuery(query: string): RouteResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const results: RouteResult[] = [];

  for (const service of services) {
    const keywords = service.keywords.map((k) => k.toLowerCase());
    const haystack = [service.title, service.explanation, service.department]
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const token of tokens) {
      if (keywordHit(keywords, token)) {
        score += 3;
      } else if (new RegExp(`\\b${token}\\b`).test(haystack)) {
        score += 1;
      }
    }

    if (score > 0) results.push({ service, score });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 3);
}
