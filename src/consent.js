// Cookie / tracking consent store.
//
// Categories:
// - necessary: always on. Covers the consent choice itself, the install-prompt
//   "Not now" timestamp (localStorage) and the offline-page cache (service worker).
//   None of these track visitors, so they don't need permission.
// - marketing: Hostinger Reach — onsite tracking plus the footer "price updates"
//   sign-up form. Off until the visitor says yes.
//
// The choice is kept in localStorage (not a cookie) and is versioned: bump
// CONSENT_VERSION when a new tracker or category is added so everyone is asked again.
// Components listen for CONSENT_EVENT to react to changes (banner, Reach card,
// install prompt).

export const CONSENT_VERSION = 1;
export const CONSENT_EVENT = "isaphilo:consent-changed";
export const OPEN_SETTINGS_EVENT = "isaphilo:open-cookie-settings";

const STORAGE_KEY = "isaphilo-consent";
const REACH_SCRIPT_SRC = "https://cdn-reach.hostinger.com/js/embed.js";

// Returns { version, marketing, decidedAt } or null if the visitor hasn't chosen
// (or chose under an older policy version).
export function readConsent() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (!stored || stored.version !== CONSENT_VERSION) return null;
    return stored;
  } catch {
    return null; // storage blocked (private mode) or corrupt value: ask again
  }
}

export function hasDecided() {
  return readConsent() !== null;
}

export function hasMarketingConsent() {
  return readConsent()?.marketing === true;
}

// Saves the choice, loads/unloads trackers and notifies listeners.
export function saveConsent({ marketing }) {
  const previous = readConsent();
  const consent = { version: CONSENT_VERSION, marketing: Boolean(marketing), decidedAt: new Date().toISOString() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Can't persist: the choice still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));

  if (consent.marketing) {
    loadReach();
  } else if (previous?.marketing) {
    // A loaded third-party script can't be cleanly removed from a running page,
    // so reload to drop it. Reach's own cookies expire per Hostinger's settings.
    window.location.reload();
  }
}

// Called once at start-up (main.jsx): honours a choice made on an earlier visit.
export function applyStoredConsent() {
  if (hasMarketingConsent()) loadReach();
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

// Injects Hostinger Reach once. Its MutationObserver finds the footer
// [data-reach-form] element even if React renders it later.
function loadReach() {
  if (document.querySelector(`script[src="${REACH_SCRIPT_SRC}"]`)) return;
  const script = document.createElement("script");
  script.src = REACH_SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
}
