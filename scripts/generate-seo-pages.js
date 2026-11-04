import { readFile, writeFile } from "node:fs/promises";

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

for (const [page, metadata] of Object.entries(pages)) {
  if (page === "Home") continue;
  if (
    typeof metadata.path !== "string" ||
    !/^\/[a-z0-9-]+$/.test(metadata.path) ||
    typeof metadata.title !== "string" ||
    typeof metadata.description !== "string"
  ) {
    throw new Error(`Invalid SEO page path for "${page}": ${metadata.path}`);
  }

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

  const fileName = `${metadata.path.slice(1)}.html`;
  await writeFile(new URL(fileName, outputDirectory), html);
}
