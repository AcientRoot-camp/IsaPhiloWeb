import { readFile, writeFile } from "node:fs/promises";
import { businessFacts, createSeoStructuredData } from "../src/seo-structured-data.js";
import { pageCopy } from "../src/page-copy.js";
import { productCategories, products } from "../src/products.js";
import { services } from "../src/services.js";

const siteUrl = "https://isaphiloenterprise.com";
const outputDirectory = new URL("../dist/", import.meta.url);
const pages = JSON.parse(
  await readFile(new URL("../seo-pages.json", import.meta.url), "utf8"),
);
const template = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceMeta(html, attribute, key, content) {
  const expression = new RegExp(
    `(<meta\\b(?=[^>]*\\b${attribute}="${escapeRegExp(key)}")[^>]*\\bcontent=")[^"]*(")`,
  );
  if (!expression.test(html)) {
    throw new Error(`Missing ${attribute} metadata for "${key}" in dist/index.html.`);
  }
  return html.replace(expression, (_match, prefix, suffix) => `${prefix}${escapeHtml(content)}${suffix}`);
}

function replaceCanonical(html, canonicalUrl) {
  const expression = /(<link\b(?=[^>]*\brel="canonical")[^>]*\bhref=")[^"]*(")/;
  if (!expression.test(html)) {
    throw new Error("Missing canonical link in dist/index.html.");
  }
  return html.replace(
    expression,
    (_match, prefix, suffix) => `${prefix}${canonicalUrl}${suffix}`,
  );
}

function replaceStructuredData(html, structuredData) {
  const expression = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;
  if (!expression.test(html)) {
    throw new Error("Missing JSON-LD script in dist/index.html.");
  }
  const json = JSON.stringify(structuredData, null, 2).replaceAll("<", "\\u003c");
  return html.replace(
    expression,
    `<script type="application/ld+json">\n${json}\n    </script>`,
  );
}

// ---------------------------------------------------------------------------
// Build-time pre-render: real page text inside <div id="root"> so crawlers that
// don't run JavaScript (most AI assistants) can read the page. React's
// createRoot replaces this markup on load, so visitors see the normal app.
// Everything here mirrors visible app content (shared modules) — no hidden
// or crawler-only copy.
// ---------------------------------------------------------------------------
const text = (value) => escapeHtml(String(value));

function renderNav() {
  return Object.entries(pages)
    .map(([page, { path }]) => `<a href="${path}">${text(page)}</a>`)
    .join("\n          ");
}

function renderIntro(page) {
  const copy = pageCopy[page];
  if (!copy) return "";
  const eyebrow = copy.eyebrow.replace("{count}", String(products.length));
  return `<p class="prerender-eyebrow">${text(eyebrow)}</p>
        <h1>${text(copy.title[0])}<span>${text(copy.title[1])}</span></h1>
        <p>${text(copy.description)}</p>`;
}

function renderCategoryList() {
  return `<ul>
          ${productCategories
            .map(({ category, count }) => `<li><a href="/products">${text(category)}</a> — ${count} products</li>`)
            .join("\n          ")}
        </ul>`;
}

function renderServiceList({ withText = false } = {}) {
  if (withText) {
    return services
      .map(({ title, text: body }) => `<h3>${text(title)}</h3>\n        <p>${text(body)}</p>`)
      .join("\n        ");
  }
  return `<ul>
          ${services.map(({ title }) => `<li><a href="/services">${text(title)}</a></li>`).join("\n          ")}
        </ul>`;
}

function renderProductsByCategory() {
  return productCategories
    .map(({ category }) => {
      const items = products.filter((product) => product.category === category);
      return `<h2>${text(category)}</h2>
        <ul>
          ${items.map((product) => `<li>${text(product.name)}</li>`).join("\n          ")}
        </ul>`;
    })
    .join("\n        ");
}

function renderContactBlock() {
  const f = businessFacts;
  return `<h2>Contact ${text(f.name)}</h2>
        <address>
          <p>${text(f.address)}</p>
          <p>Phone and WhatsApp: <a href="tel:${f.phone}">${text(f.phoneLabel)}</a></p>
          <p>Email: <a href="mailto:${f.email}">${text(f.email)}</a></p>
          <p>Hours: ${text(f.hours)}</p>
          <p>Serving the ${text(f.areaServed)}.</p>
        </address>
        <p><a href="${f.whatsapp}">Message us on WhatsApp</a> · <a href="/contact">Send an enquiry</a></p>`;
}

const pageBodies = {
  Home: () => `<h2>Building materials we supply</h2>
        ${renderCategoryList()}
        <h2>Services</h2>
        ${renderServiceList()}`,
  About: () => `<h2>What we offer</h2>
        ${renderCategoryList()}
        <h2>Services</h2>
        ${renderServiceList()}`,
  Products: () => renderProductsByCategory(),
  Services: () => renderServiceList({ withText: true }),
};

function renderStaticContent(page) {
  const body = pageBodies[page]?.() ?? "";
  return `<div id="root"><div class="prerender">
      <header class="prerender-header">
        <a href="/"><strong>${text(businessFacts.name)}</strong></a>
        <nav aria-label="Main">
          ${renderNav()}
        </nav>
      </header>
      <main class="prerender-main">
        ${renderIntro(page)}
        ${body}
        ${renderContactBlock()}
      </main>
    </div></div>`;
}

function injectStaticContent(html, page) {
  const expression = /<div id="root"><\/div>/;
  if (!expression.test(html)) {
    throw new Error('Missing <div id="root"></div> in dist/index.html.');
  }
  return html.replace(expression, () => renderStaticContent(page));
}

const seenPaths = new Set();
for (const [page, metadata] of Object.entries(pages)) {
  const isHome = page === "Home";
  const hasValidPath = isHome
    ? metadata.path === "/"
    : /^\/[a-z0-9-]+$/.test(metadata.path);
  if (
    typeof metadata.path !== "string" ||
    !hasValidPath ||
    typeof metadata.title !== "string" ||
    typeof metadata.description !== "string" ||
    seenPaths.has(metadata.path)
  ) {
    throw new Error(`Invalid SEO page path for "${page}": ${metadata.path}`);
  }
  seenPaths.add(metadata.path);

  const canonicalUrl = `${siteUrl}${metadata.path}`;
  let html = template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(metadata.title)}</title>`,
  );
  html = replaceMeta(html, "name", "description", metadata.description);
  html = replaceMeta(html, "property", "og:title", metadata.title);
  html = replaceMeta(html, "property", "og:description", metadata.description);
  html = replaceMeta(html, "property", "og:url", canonicalUrl);
  html = replaceMeta(html, "name", "twitter:title", metadata.title);
  html = replaceMeta(html, "name", "twitter:description", metadata.description);
  html = replaceCanonical(html, canonicalUrl);
  html = replaceStructuredData(html, createSeoStructuredData(page, metadata));
  html = injectStaticContent(html, page);

  if (isHome) {
    await writeFile(new URL("index.html", outputDirectory), html);
  } else {
    const fileName = `${metadata.path.slice(1)}.html`;
    await writeFile(new URL(fileName, outputDirectory), html);
  }
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...Object.values(pages).flatMap(({ path }) => [
    "  <url>",
    `    <loc>${escapeXml(`${siteUrl}${path === "/" ? "/" : path}`)}</loc>`,
    "  </url>",
  ]),
  "</urlset>",
  "",
].join("\n");

await Promise.all([
  writeFile(new URL("../public/sitemap.xml", import.meta.url), sitemap),
  writeFile(new URL("sitemap.xml", outputDirectory), sitemap),
]);
