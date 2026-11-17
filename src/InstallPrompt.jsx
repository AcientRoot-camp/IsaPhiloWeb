import { useEffect, useState } from "react";
import { CONSENT_EVENT, hasDecided } from "./consent.js";

// "Install the app" prompt for every platform that can install a web app:
// - Android, Windows, macOS, ChromeOS on Chrome / Edge / Samsung Internet / Opera:
//   native install dialog via the beforeinstallprompt event.
// - iPhone / iPad (any browser, iOS 16.4+): no install API exists, so we show
//   the Share → "Add to Home Screen" steps.
// - Safari on macOS 17+: File → "Add to Dock" steps.
// - Firefox on Android: browser menu → "Install" steps.
// Hidden when already running as an installed app, and for 14 days after "Not now".

const DISMISS_KEY = "isaphilo-install-dismissed-at";
const DISMISS_DAYS = 14;
const SHOW_DELAY_MS = 6000;

function readDismissed() {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY));
    return Boolean(at) && Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function rememberDismissed() {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {
    // storage unavailable (private mode): the prompt simply shows again next visit
  }
}

function isStandalone() {
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    window.matchMedia?.("(display-mode: minimal-ui)").matches ||
    window.navigator.standalone === true
  );
}

// Platforms where installing is a manual browser step rather than an API call.
function detectManualPlatform() {
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (isIOS) return "ios";
  if (/Android/i.test(ua) && /Firefox/i.test(ua)) return "firefox-android";
  const isMacSafari =
    /Macintosh/.test(ua) && /Safari/.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|Firefox/.test(ua);
  const safariVersion = Number(ua.match(/Version\/(\d+)/)?.[1] ?? 0);
  if (isMacSafari && safariVersion >= 17) return "mac-safari";
  return null;
}

function ShareIcon() {
  return (
    <svg className="install-inline-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v12M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const MANUAL_STEPS = {
  ios: (
    <>
      Tap <ShareIcon /> <strong>Share</strong>, then choose <strong>Add to Home Screen</strong>.
    </>
  ),
  "mac-safari": (
    <>
      In the menu bar choose <strong>File</strong> → <strong>Add to Dock</strong>.
    </>
  ),
  "firefox-android": (
    <>
      Open the browser menu <strong>⋮</strong>, then tap <strong>Install</strong>.
    </>
  ),
};

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [manualPlatform, setManualPlatform] = useState(null);
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (isStandalone() || readDismissed()) return undefined;

    setManualPlatform(detectManualPlatform());
    if (window.__isaphiloInstallPrompt) setDeferredPrompt(window.__isaphiloInstallPrompt);

    function onBeforeInstall(event) {
      event.preventDefault(); // keep the browser's mini-bar quiet; we show our own prompt
      setDeferredPrompt(event);
    }
    function onInstalled() {
      setDeferredPrompt(null);
      setHidden(true);
      rememberDismissed();
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    // Don't stack on top of the cookie banner: start the delay only once the
    // visitor has made a cookie choice (immediately, if they did on an earlier visit).
    let timer;
    function startTimer() {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setReady(true);
        setHidden(false);
      }, SHOW_DELAY_MS);
    }
    if (hasDecided()) startTimer();
    else window.addEventListener(CONSENT_EVENT, startTimer, { once: true });

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener(CONSENT_EVENT, startTimer);
      window.clearTimeout(timer);
    };
  }, []);

  const canInstallNatively = Boolean(deferredPrompt);
  if (!ready || hidden || (!canInstallNatively && !manualPlatform)) return null;

  function dismiss() {
    setHidden(true);
    rememberDismissed();
  }

  async function install() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    window.__isaphiloInstallPrompt = null; // a prompt event can only be used once
    setDeferredPrompt(null);
    setHidden(true);
    if (outcome !== "accepted") rememberDismissed();
  }

  return (
    <aside className="install-prompt" role="dialog" aria-labelledby="install-prompt-title" aria-live="polite">
      <img className="install-prompt-icon" src="/icons/icon-192.png" alt="" width="52" height="52" />
      <div className="install-prompt-copy">
        <p id="install-prompt-title">Install the IsaPhilo app</p>
        <span>
          {canInstallNatively
            ? "Quick access to products, prices and quotes, right from your home screen or desktop."
            : MANUAL_STEPS[manualPlatform]}
        </span>
      </div>
      <div className="install-prompt-actions">
        {canInstallNatively ? (
          <>
            <button className="install-prompt-primary" type="button" onClick={install}>Install</button>
            <button className="install-prompt-secondary" type="button" onClick={dismiss}>Not now</button>
          </>
        ) : (
          <button className="install-prompt-primary" type="button" onClick={dismiss}>Got it</button>
        )}
      </div>
      <button className="install-prompt-close" type="button" aria-label="Close install prompt" onClick={dismiss}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </aside>
  );
}
