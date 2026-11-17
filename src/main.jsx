import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// Self-hosted Inter (variable weights). Replaces the Google Fonts link so the
// font loads from our own domain with no third-party request.
import "@fontsource-variable/inter";
import "./index.css";
import { applyStoredConsent } from "./consent.js";

// Load any third-party scripts the visitor already agreed to on a previous visit.
applyStoredConsent();

// Chrome/Edge can fire this before React mounts; keep it for <InstallPrompt />.
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  window.__isaphiloInstallPrompt = event;
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Service worker (public/sw.js): serves offline.html when there's no connection
// and is required for the "Install the app" prompt. Production builds only, so
// the dev server never serves stale cached files.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js", { updateViaCache: "none" })
    .catch((error) => console.error("Offline fallback registration failed.", error));
}
