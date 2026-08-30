// src/search.js
// Search and filtering for the first-aid reference.
// Pure functions over the topic data — easy to unit test, no DOM.

import {
  topics,
  getCategories as dataGetCategories,
  getTopicById,
  emergencyNumber,
} from './data.js';

/** Tokenize a query into lowercase, non-empty words. */
function tokenize(query) {
  if (!query || typeof query !== 'string') return [];
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter((tok) => tok.length > 0);
}

/**
 * Score how well a topic matches a single token.
 *   title match    -> 3
 *   keyword match   -> 2
 *   summary/category-> 1
 *   no match        -> 0
 * Substring matching, so "bleed" hits "bleeding".
 */
function scoreToken(topic, token) {
  const title = topic.title.toLowerCase();
  const summary = topic.summary.toLowerCase();
  const category = topic.category.toLowerCase();
  const keywords = topic.keywords.map((k) => k.toLowerCase());

  if (title.includes(token)) return 3;
  if (keywords.some((k) => k.includes(token))) return 2;
  if (summary.includes(token) || category.includes(token)) return 1;
  return 0;
}

/**
 * Search topics.
 * @param {string} query  free-text query (title/keywords/summary/category)
 * @param {object} [opts]
 * @param {string|null} [opts.category]  restrict to a category (case-insensitive)
 * @param {string|null} [opts.severity]  restrict to a severity level
 * @returns {Array} matching topic objects, best match first.
 *
 * Behavior:
 *  - Empty/whitespace query -> all topics (subject to category/severity filters).
 *  - Every token must match somewhere (AND). Tokens with no match exclude the topic.
 *  - Results sorted by total relevance score (desc), then title (asc).
 */
export function searchTopics(query, { category = null, severity = null } = {}) {
  let pool = topics;

  if (category) {
    const cat = category.toLowerCase();
    pool = pool.filter((t) => t.category.toLowerCase() === cat);
  }
  if (severity) {
    const sev = severity.toLowerCase();
    pool = pool.filter((t) => t.severity.toLowerCase() === sev);
  }

  const tokens = tokenize(query);
  if (tokens.length === 0) {
    return [...pool];
  }

  const scored = [];
  for (const topic of pool) {
    let total = 0;
    let matchedAll = true;
    for (const tok of tokens) {
      const s = scoreToken(topic, tok);
      if (s === 0) {
        matchedAll = false;
        break;
      }
      total += s;
    }
    if (matchedAll) {
      scored.push({ topic, total });
    }
  }

  scored.sort((a, b) => b.total - a.total || a.topic.title.localeCompare(b.topic.title));
  return scored.map((s) => s.topic);
}

/** Filter topics by exact category (case-insensitive). Returns a new array. */
export function filterByCategory(category) {
  if (!category) return [...topics];
  const cat = category.toLowerCase();
  return topics.filter((t) => t.category.toLowerCase() === cat);
}

/** Filter topics by severity level (case-insensitive). Returns a new array. */
export function filterBySeverity(severity) {
  if (!severity) return [...topics];
  const sev = severity.toLowerCase();
  return topics.filter((t) => t.severity.toLowerCase() === sev);
}

/** Topics for which you should dial emergency services immediately. */
export function getEmergencies() {
  return topics.filter((t) => t.call911 === true);
}

/** Sorted unique category names. */
export function getCategories() {
  return dataGetCategories();
}

/** Single topic by id (re-exported for convenience). */
export function findTopic(id) {
  return getTopicById(id);
}

export { emergencyNumber };
