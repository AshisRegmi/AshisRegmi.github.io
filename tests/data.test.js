// tests/data.test.js
// Data-integrity tests for the first-aid content in src/data.js.
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  topics,
  SEVERITY_LEVELS,
  emergencyNumber,
  region,
  getCategories,
  getTopicById,
} from '../src/data.js';

test('emergency number is 911 for US/Canada', () => {
  assert.equal(emergencyNumber, '911');
  assert.equal(region, 'US/Canada');
});

test('topics is a non-empty array', () => {
  assert.ok(Array.isArray(topics));
  assert.ok(topics.length >= 10, 'expected a reasonable number of topics');
});

test('every topic has the required fields with correct types', () => {
  for (const t of topics) {
    assert.equal(typeof t.id, 'string', `id should be string (${t.id})`);
    assert.ok(t.id.length > 0, `id should be non-empty (${t.id})`);
    assert.equal(typeof t.title, 'string');
    assert.equal(typeof t.category, 'string');
    assert.equal(typeof t.severity, 'string');
    assert.equal(typeof t.call911, 'boolean');
    assert.equal(typeof t.summary, 'string');
    assert.ok(Array.isArray(t.keywords), `keywords should be array (${t.id})`);
    assert.ok(Array.isArray(t.steps), `steps should be array (${t.id})`);
  }
});

test('every topic id is unique', () => {
  const ids = topics.map((t) => t.id);
  const seen = new Set();
  for (const id of ids) {
    assert.ok(!seen.has(id), `duplicate topic id: ${id}`);
    seen.add(id);
  }
});

test('every topic severity is a known level', () => {
  for (const t of topics) {
    assert.ok(
      SEVERITY_LEVELS.includes(t.severity),
      `unknown severity "${t.severity}" for ${t.id}`
    );
  }
});

test('every topic has at least one keyword and at least one step', () => {
  for (const t of topics) {
    assert.ok(t.keywords.length > 0, `${t.id} should have keywords`);
    assert.ok(
      t.keywords.every((k) => typeof k === 'string' && k.length > 0),
      `${t.id} keywords must be non-empty strings`
    );
    assert.ok(t.steps.length > 0, `${t.id} should have steps`);
    assert.ok(
      t.steps.every((s) => typeof s === 'string' && s.trim().length > 0),
      `${t.id} steps must be non-empty strings`
    );
  }
});

test('critical topics all flag call911', () => {
  for (const t of topics) {
    if (t.severity === 'critical') {
      assert.equal(t.call911, true, `critical topic ${t.id} should call911`);
    }
  }
});

test('getCategories returns sorted unique categories that cover all topics', () => {
  const cats = getCategories();
  assert.ok(Array.isArray(cats));
  // unique
  assert.equal(cats.length, new Set(cats).size);
  // sorted
  const sorted = [...cats].sort();
  assert.deepEqual(cats, sorted);
  // covers every topic
  for (const t of topics) {
    assert.ok(cats.includes(t.category), `category "${t.category}" missing from getCategories`);
  }
});

test('getTopicById returns the matching topic and undefined otherwise', () => {
  const first = topics[0];
  assert.equal(getTopicById(first.id).id, first.id);
  assert.equal(getTopicById('does-not-exist'), undefined);
  assert.equal(getTopicById(), undefined);
});
