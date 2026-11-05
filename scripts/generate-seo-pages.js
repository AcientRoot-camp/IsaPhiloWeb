import { readFile, writeFile } from "node:fs/promises";
import { createSeoStructuredData } from "../src/seo-structured-data.js";

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
