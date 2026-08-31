// app.js — integrator: wires DOM <-> pure logic modules <-> service worker.
// Renders the topic list from data.js, handles search + detail, registers SW.

import { topics, getCategories, emergencyNumber } from './data.js';
import { searchTopics } from './search.js';

const $ = (id) => document.getElementById(id);

const listEl = $('topic-list');
const searchInput = $('search-input');
const searchClear = $('search-clear');
const noResults = $('no-results');
const detailOverlay = $('detail-overlay');
const detailTitle = $('detail-title');
const detailBody = $('detail-body');
const detailClose = $('detail-close');
const statusEl = $('status');

const SEVERITY_LABEL = { critical: 'Call 911', serious: 'Urgent', minor: 'Self-care' };

let currentQuery = '';

function announce(msg) {
  if (statusEl) statusEl.textContent = msg;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// Map a step's text to one of the reusable action icons in assets/steps/.
// Returns an icon filename; defaults to 'check' when nothing matches.
function stepIcon(text) {
  const s = text.toLowerCase();
  const rules = [
    [/(call|911|ems|dial)/, 'call'],
    [/(check|responsive|breathing|look|observe|monitor|watch|note|time|symptom)/, 'check'],
    [/(compression|press|push|chest|thrust|abdominal|back blow|slap|squeeze)/, 'press'],
    [/(breath|breathe|rescue|airway|mouth|inflate|ventilat)/, 'breathe'],
    [/(cool|water|rinse|cold|ice|wet|lukewarm|shower|bath)/, 'cool'],
    [/(clear|roll|side|recover|turn)/, 'airway'],
    [/(tilt|chin|head)/, 'tilt'],
    [/(elevate|raise|legs|flat|lay|lie)/, 'elevate'],
    [/(inject|epipen|epinephrine|syringe|auto-inject)/, 'inject'],
    [/(cover|bandage|cloth|film|dressing|wrap|splint|sling)/, 'cover'],
    [/(remove|take off|loosen|jewelry|clothing|tight|strip)/, 'remove'],
    [/(comfort|reassure|calm|warm|rest|reassuran)/, 'comfort'],
    [/(move|transport|get|carry|away|fresh air|out of)/, 'move'],
  ];
  for (const [re, name] of rules) if (re.test(s)) return name;
  return 'check';
}

/** Build a topic card button from a topic object. */
function cardHtml(t) {
  const sevClass = 'sev-' + t.severity;
  const badge = t.call911
    ? `<span class="topic-badge topic-badge-911">911</span>`
    : '';
  return `
    <li>
      <button class="topic-card ${sevClass}" type="button" data-topic="${t.id}" aria-label="${escapeHtml(t.title)}">
        <span class="topic-text">
          <span class="topic-title">${escapeHtml(t.title)}</span>
          <span class="topic-desc">${escapeHtml(t.summary)}</span>
        </span>
        ${badge}
      </button>
    </li>`;
}

function renderList(list) {
  if (!list.length) {
    listEl.innerHTML = '';
    noResults.hidden = false;
    announce('No guides match your search.');
    return;
  }
  noResults.hidden = true;
  listEl.innerHTML = list.map(cardHtml).join('');
}

function applyFilter() {
  const q = currentQuery.trim();
  const results = searchTopics(q);
  renderList(results);
}

/** Open the detail overlay for a topic id. */
function openTopic(id) {
  const t = topics.find((x) => x.id === id);
  if (!t) return;
  detailTitle.textContent = t.title;

  const steps = t.steps.map((s) =>
    `<li><img class="step-icon" src="assets/steps/${stepIcon(s)}.svg" alt="" width="40" height="40" /><span class="step-text">${escapeHtml(s)}</span></li>`
  ).join('');

  const callNote = t.call911
    ? `<a class="detail-call" href="tel:${emergencyNumber}" role="button">Call ${emergencyNumber} now</a>`
    : '';

  // Procedure illustration (static diagram) shown above the step list when available.
  const illustration = t.illustration
    ? `<figure class="detail-illustration">
         <img src="assets/illustrations/${t.illustration}.svg" alt="Illustration showing how to perform ${escapeHtml(t.title)}" loading="lazy" decoding="async" />
         <figcaption class="detail-illustration-cap">Procedure</figcaption>
       </figure>`
    : '';

  // Animated demonstration ("flash animation") when available.
  const animation = t.animation
    ? `<figure class="detail-animation">
         <img src="assets/illustrations/${t.animation}.svg" alt="Animated demonstration of ${escapeHtml(t.title)}" loading="lazy" decoding="async" />
         <figcaption class="detail-animation-cap"><span class="live-dot" aria-hidden="true"></span> Animated demonstration</figcaption>
       </figure>`
    : '';

  detailBody.innerHTML = `
    <p class="detail-sev sev-${t.severity}">${SEVERITY_LABEL[t.severity] || t.severity}</p>
    <p class="detail-summary">${escapeHtml(t.summary)}</p>
    ${callNote}
    ${illustration}
    ${animation}
    <h3 class="detail-steps-heading">What to do</h3>
    <ol class="detail-steps">${steps}</ol>
    <p class="detail-disclaimer">Quick reference only — not a substitute for certified training or professional care. When in doubt, call ${emergencyNumber}.</p>
  `;
  detailOverlay.hidden = false;
  detailClose.focus();
  announce('Opened guide: ' + t.title);
}

function closeTopic() {
  detailOverlay.hidden = true;
  detailBody.innerHTML = '<p class="detail-empty">Select a topic to see step-by-step guidance.</p>';
  announce('Closed guide.');
}

// --- Wiring ---
searchInput.addEventListener('input', (e) => {
  currentQuery = e.target.value;
  applyFilter();
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  currentQuery = '';
  applyFilter();
  searchInput.focus();
});

listEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.topic-card');
  if (btn && btn.dataset.topic) openTopic(btn.dataset.topic);
});

detailClose.addEventListener('click', closeTopic);
detailOverlay.addEventListener('click', (e) => {
  if (e.target === detailOverlay) closeTopic();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !detailOverlay.hidden) closeTopic();
});

// --- Support (donation) footer button: injected because the markup has none ---
const support = document.createElement('a');
support.id = 'support-btn';
support.className = 'support-btn';
support.href = 'https://buymeacoffee.com/'; // <-- set your username here
support.target = '_blank';
support.rel = 'noopener';
support.textContent = '☕ Support this app';
document.body.appendChild(support);

// --- Initial render ---
renderList(topics);

// --- Service worker (only over a secure context: https or localhost) ---
if ('serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => { /* offline optional */ });
  });
}
