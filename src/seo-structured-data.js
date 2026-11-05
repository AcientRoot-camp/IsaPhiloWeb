const siteUrl = "https://isaphiloenterprise.com";
const businessId = `${siteUrl}/#business`;
const websiteId = `${siteUrl}/#website`;

const pageTypes = {
  About: "AboutPage",
  Contact: "ContactPage",
  Portfolio: "CollectionPage",
  Products: "CollectionPage",
  Projects: "CollectionPage",
};

const business = {
  "@type": "HomeAndConstructionBusiness",
  "@id": businessId,
  name: "IsaPhilo Enterprise",
  description:
    "Building materials supplier and construction partner based at Mfuom Last Stop, Dunkwa-On-Offin, Ghana.",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/isaphilo-logo.jpg`,
  image: `${siteUrl}/isaphilo-logo.jpg`,
  email: "info@isaphiloenterprise.com",
  telephone: "+233201928965",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mfuom Last Stop, Cemetery Road",
    addressLocality: "Dunkwa-On-Offin",
    addressRegion: "Central Region",
    addressCountry: "GH",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Central Region, Ghana" },
    { "@type": "AdministrativeArea", name: "Western Region, Ghana" },
    { "@type": "AdministrativeArea", name: "Ashanti Region, Ghana" },
  ],
};

export function createSeoStructuredData(page, metadata) {
  const url = `${siteUrl}${metadata.path}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      business,
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${siteUrl}/`,
        name: "IsaPhilo Enterprise",
        inLanguage: "en-GH",
        publisher: { "@id": businessId },
      },
      {
        "@type": pageTypes[page] ?? "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: metadata.title,
        description: metadata.description,
        inLanguage: "en-GH",
        isPartOf: { "@id": websiteId },
        about: { "@id": businessId },
      },
    ],
  };
}
