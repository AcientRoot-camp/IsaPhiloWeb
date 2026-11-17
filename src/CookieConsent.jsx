import { useEffect, useState } from "react";
import { OPEN_SETTINGS_EVENT, hasDecided, hasMarketingConsent, saveConsent } from "./consent.js";

// Cookie banner + settings panel.
//
// - First visit (no saved choice): banner at the bottom with Accept all /
//   Reject all / Settings. "Reject all" is as prominent as "Accept all" so
//   refusing is as easy as agreeing.
// - Settings view: necessary cookies (always on, switch disabled) and a
//   marketing switch for Hostinger Reach.
// - "Cookie settings" in the footer reopens it via OPEN_SETTINGS_EVENT.
// Nothing marketing-related loads until saveConsent({ marketing: true }).
//
// `onNavigate(page)` opens the Cookie Policy inside the SPA.

export default function CookieConsent({ onNavigate }) {
  const [open, setOpen] = useState(() => !hasDecided());
  const [view, setView] = useState("banner"); // "banner" | "settings"
  const [marketing, setMarketing] = useState(() => hasMarketingConsent());

  // Footer "Cookie settings" link opens straight into the settings view.
  useEffect(() => {
    function openSettings() {
      setMarketing(hasMarketingConsent());
      setView("settings");
      setOpen(true);
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, []);

  if (!open) return null;

  function decide(choice) {
    saveConsent({ marketing: choice });
    setOpen(false);
    setView("banner");
  }

  function openPolicy(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate("Cookies");
    if (view === "banner") setOpen(true); // keep the banner up until they choose
  }

  return (
    <section className="cookie-consent" role="dialog" aria-modal="false" aria-labelledby="cookie-consent-title">
      <h2 id="cookie-consent-title">{view === "settings" ? "Cookie settings" : "Your privacy choices"}</h2>

      {view === "banner" ? (
        <p>
          We use necessary storage to run this site. With your permission we also use Hostinger Reach for price-update
          sign-ups and onsite tracking. You can change your mind at any time in Cookie settings.{" "}
          <a href="/cookie-policy" onClick={openPolicy}>Cookie Policy</a>
        </p>
      ) : (
        <div className="cookie-options">
          <label className="cookie-option">
            <span>
              <strong>Strictly necessary</strong>
              Remembers your cookie choice, the install-prompt setting and the offline page. Always on.
            </span>
            <input type="checkbox" checked disabled aria-describedby="cookie-necessary-note" />
            <span id="cookie-necessary-note" className="sr-only">Always on</span>
          </label>
          <label className="cookie-option">
            <span>
              <strong>Marketing</strong>
              Hostinger Reach: the price-update sign-up form and onsite tracking for our mailing list.
            </span>
            <input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} />
          </label>
          <p className="cookie-policy-link"><a href="/cookie-policy" onClick={openPolicy}>Read the Cookie Policy</a></p>
        </div>
      )}

      <div className="cookie-actions">
        {view === "banner" ? (
          <>
            <button type="button" className="cookie-btn cookie-btn-primary" onClick={() => decide(true)}>Accept all</button>
            <button type="button" className="cookie-btn cookie-btn-primary" onClick={() => decide(false)}>Reject all</button>
            <button type="button" className="cookie-btn cookie-btn-ghost" onClick={() => setView("settings")}>Settings</button>
          </>
        ) : (
          <>
            <button type="button" className="cookie-btn cookie-btn-primary" onClick={() => decide(marketing)}>Save choices</button>
            <button type="button" className="cookie-btn cookie-btn-ghost" onClick={() => decide(false)}>Reject all</button>
          </>
        )}
      </div>
    </section>
  );
}
