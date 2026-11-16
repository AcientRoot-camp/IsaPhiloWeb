// Generates branded, self-contained HTTP error pages into public/errors/.
// Apache/LiteSpeed serves them via the ErrorDocument rules in public/.htaccess.
// Pages use only inline CSS, system fonts and the site logo so they still
// render when the app bundle, CDN or fonts are unavailable.
import { mkdir, writeFile } from "node:fs/promises";

const CONTACT = {
  phone: "+233201928965",
  phoneLabel: "+233 20 192 8965",
  whatsapp: "https://wa.me/233201928965",
};

// retry: true shows "Try again" (reload) as the main action instead of "Go to homepage".
const ERRORS = {
  400: {
    title: "Bad request",
    message: "We couldn’t understand that request. The link may be incomplete or mistyped.",
  },
  401: {
    title: "Sign-in required",
    message: "This page needs you to sign in before you can view it.",
  },
  403: {
    title: "Access denied",
    message: "You don’t have permission to view this page. If you think this is a mistake, contact our team.",
  },
  404: {
    title: "Page not found",
    message: "The page you’re looking for doesn’t exist or has moved. Try our products or get in touch with the Mfuom team.",
  },
  405: {
    title: "Action not allowed",
    message: "That action isn’t supported on this page. Go back and try again.",
  },
  408: {
    title: "Request timed out",
    message: "The connection took too long. This can happen on slow mobile data — please try again.",
    retry: true,
  },
  410: {
    title: "Page removed",
    message: "This page has been permanently removed. Browse our current products instead.",
  },
  429: {
    title: "Too many requests",
    message: "You’ve made a lot of requests in a short time. Please wait a minute, then try again.",
    retry: true,
  },
  500: {
    title: "Something went wrong",
    message: "We hit a problem on our side. Please try again in a moment, or call or WhatsApp us for help right away.",
    retry: true,
  },
  502: {
    title: "Bad gateway",
    message: "Our server got an invalid response. Please try again shortly.",
    retry: true,
  },
  503: {
    title: "Temporarily unavailable",
    message: "The website is down for maintenance or under heavy load. We’ll be back shortly — you can still reach us by phone or WhatsApp.",
    retry: true,
  },
  504: {
    title: "Server took too long",
    message: "Our server didn’t respond in time. Please try again in a moment.",
    retry: true,
  },
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function renderPage(code, { title, message, retry = false }) {
  const primary = retry
    ? `<button class="btn btn-primary" type="button" onclick="location.reload()">Try again</button>
        <a class="btn btn-secondary" href="/">Go to homepage</a>`
    : `<a class="btn btn-primary" href="/">Go to homepage</a>
        <a class="btn btn-secondary" href="/products">Browse products</a>`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="theme-color" content="#000000" />
    <title>${code} ${escapeHtml(title)} | IsaPhilo Enterprise</title>
    <link rel="icon" href="/isaphilo-favicon.png" type="image/png" />
    <style>
      :root {
        --ink: #1d1d1f;
        --muted: #5b5b61;
        --line: #e2e2e5;
        --bg: #f5f5f7;
        --green: #15803d;
        --green-dark: #166534;
        color: var(--ink);
        background: var(--bg);
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      * { box-sizing: border-box; }
      body {
        display: grid;
        min-width: 320px;
        min-height: 100vh;
        min-height: 100dvh;
        margin: 0;
        padding: 24px 16px;
        place-items: center;
      }
      main {
        width: min(100%, 560px);
        padding: clamp(24px, 6vw, 44px);
        border: 1px solid var(--line);
        border-radius: 24px;
        background: #fff;
        box-shadow: 0 1px 2px rgb(16 24 16 / 4%), 0 18px 40px -20px rgb(16 24 16 / 18%);
      }
      .brand {
        display: block;
        width: min(200px, 64%);
        height: auto;
        margin-bottom: 28px;
        /* Same recolour the site header applies to the logo file */
        filter: hue-rotate(280deg) saturate(1.1) brightness(1.25);
      }
      .code {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin: 0 0 14px;
        padding: 6px 12px;
        border-radius: 999px;
        background: #edfbf1;
        color: var(--green-dark);
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.06em;
      }
      h1 {
        margin: 0 0 12px;
        font-size: clamp(28px, 7vw, 40px);
        letter-spacing: -0.03em;
        line-height: 1.1;
      }
      p { margin: 0 0 26px; color: var(--muted); font-size: 16px; line-height: 1.6; }
      .actions { display: flex; flex-wrap: wrap; gap: 10px; }
      .btn {
        display: inline-flex;
        min-height: 48px;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        border: 1px solid transparent;
        border-radius: 999px;
        font: inherit;
        font-size: 15px;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
        transition: background-color 180ms ease, border-color 180ms ease;
      }
      .btn-primary { background: var(--green); color: #fff; }
      .btn-primary:hover { background: var(--green-dark); }
      .btn-secondary { border-color: var(--line); background: #fff; color: var(--ink); }
      .btn-secondary:hover { background: var(--bg); }
      .help {
        margin-top: 28px;
        padding-top: 20px;
        border-top: 1px solid var(--line);
        color: var(--muted);
        font-size: 14px;
      }
      .help a { color: var(--green-dark); font-weight: 700; text-underline-offset: 3px; }
      a:focus-visible, button:focus-visible { outline: 2px solid var(--green); outline-offset: 3px; }
      @media (max-width: 420px) { .btn { flex: 1 1 100%; } }
      @media (prefers-reduced-motion: reduce) { .btn { transition: none; } }
    </style>
  </head>
  <body>
    <main aria-labelledby="error-title">
      <a href="/" aria-label="IsaPhilo Enterprise home"><img class="brand" src="/isaphilo-logo.jpg" alt="IsaPhilo Enterprise" width="200" height="86" /></a>
      <p class="code">ERROR ${code}</p>
      <h1 id="error-title">${escapeHtml(title)}</h1>
      <p>${escapeHtml(message)}</p>
      <div class="actions">
        ${primary}
      </div>
      <div class="help">
        Need materials now? Call <a href="tel:${CONTACT.phone}">${CONTACT.phoneLabel}</a>
        or <a href="${CONTACT.whatsapp}" target="_blank" rel="noreferrer">message us on WhatsApp</a>.
      </div>
    </main>
  </body>
</html>
`;
}

const outputDirectory = new URL("../public/errors/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });
await Promise.all(
  Object.entries(ERRORS).map(([code, details]) =>
    writeFile(new URL(`${code}.html`, outputDirectory), renderPage(code, details)),
  ),
);
console.log(`Generated ${Object.keys(ERRORS).length} error pages in public/errors/`);
