# IsaPhilo Enterprise

A responsive React, Vite, and Tailwind CSS website for IsaPhilo Trading
Enterprise, a Ghana-based supplier of quality building materials for
construction projects.

The site includes Home, About, Products, Projects, Portfolio, Services, Careers,
and Contact pages. The catalog contains 104 items across 12 categories, product
detail dialogs, and an enquiry flow. Product pricing and photography are
illustrative where noted; confirm current stock, pricing, and specifications
with the business before ordering.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Search engine setup

The site uses `https://isaphiloenterprise.com` as its canonical domain. Page
navigation uses crawlable URLs for Home, About, Products, Projects, Portfolio,
Services, Careers and Contact. Titles, descriptions and canonical links update
with the current page, and the build generates route-specific HTML metadata so
crawlers and social previews receive the right page details without running
JavaScript. Each route also has JSON-LD for the business, website, and page;
the same structured data updates during in-app navigation. The build generates
the sitemap from `seo-pages.json` and writes it to both `public/sitemap.xml` and
`dist/sitemap.xml`, keeping submitted URLs aligned with the canonical routes.
`public/robots.txt` is copied into the production build. The Apache rules in
`public/.htaccess` serve those pages and
let Hostinger load the React app when a page URL is opened directly.

After connecting the domain and HTTPS certificate in Hostinger, build with
`npm run build` and upload the contents of `dist/` to the domain's document
root, including `.htaccess`. Then add the verified domain property in Google
Search Console and submit `https://isaphiloenterprise.com/sitemap.xml`.
Search indexing and ranking depend on external crawlers and are not immediate
or guaranteed.

The site displays a connection warning if it loses access to its host. After a
first successful online visit in a production build, a service worker also
caches a simple offline page for later reloads without a connection.

Contact enquiries are sent through FormSubmit's AJAX endpoint to
`info@isaphiloenterprise.com`, with a visible success or error response.
Career applications use FormSubmit's standard form endpoint. The recipient
must complete FormSubmit's email activation before submissions can be delivered
to the inbox; this activation must be completed by someone with access to that
mailbox.

