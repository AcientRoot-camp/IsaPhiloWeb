// Legal pages: Privacy Policy, Cookie Policy and Terms of Use.
//
// Shared by the React app (LegalPage in App.jsx) and the build-time
// pre-renderer (scripts/generate-seo-pages.js) so crawlers and visitors read
// the same text. Keys match seo-pages.json and page-copy.js.
//
// MAINTENANCE
// - Written to reflect what the site actually does (see src/consent.js,
//   src/InstallPrompt.jsx, public/sw.js and the FormSubmit forms in App.jsx).
//   If you add a tracker, form or third-party service, update these pages AND
//   bump CONSENT_VERSION in consent.js.
// - Update LEGAL_LAST_UPDATED whenever the wording changes.
// - Body blocks: a string is a paragraph; { list: [...] } is a bullet list;
//   { table: { head: [...], rows: [[...]] } } is a table.
// - This is a plain-language starting point, not legal advice. Have a
//   Ghanaian lawyer review it, especially retention periods and liability.

export const LEGAL_LAST_UPDATED = "17 November 2026";

const BUSINESS = "IsaPhilo Enterprise";
const ADDRESS = "Mfuom Last Stop, Cemetery Road, Mfuom, Dunkwa-On-Offin, Central Region, Ghana";
const EMAIL = "info@isaphiloenterprise.com";
const PHONE = "+233 20 192 8965";

export const legalPages = {
  Privacy: {
    sections: [
      {
        heading: "Who we are",
        body: [
          `${BUSINESS} ("we", "us") supplies building materials and construction services from ${ADDRESS}. We are responsible for the personal data collected through isaphiloenterprise.com.`,
          `We handle personal data in line with Ghana's Data Protection Act, 2012 (Act 843). Questions about this policy can go to ${EMAIL} or ${PHONE}.`,
        ],
      },
      {
        heading: "What we collect",
        body: [
          "We only collect what we need to answer you, supply materials and run the website:",
          {
            list: [
              "Enquiry form: your name, phone/WhatsApp number, email address, project location, the product or service you're interested in, estimated quantity, your message and any products you added to the enquiry.",
              "Career application form: your name, email address, phone number, the role you're interested in, your CV and your introduction.",
              "Price-update sign-up (only if you accept marketing cookies and sign up): the details you enter in the form, usually your email address and name.",
              "When you call, WhatsApp or email us: your number or address and what you tell us.",
              "Orders and deliveries: delivery address, contact person and order details.",
              "Technical data: our hosting provider automatically records server logs (IP address, browser type, pages requested, date and time) to keep the site secure and working.",
            ],
          },
          "Please don't send sensitive information (such as health, financial account or national ID details) through the website forms.",
        ],
      },
      {
        heading: "Why we use it",
        body: [
          {
            list: [
              "To reply to enquiries and prepare quotations (steps you ask us to take before a contract).",
              "To supply, deliver and invoice orders (performing our contract with you).",
              "To review job applications and contact candidates (steps before a possible employment contract).",
              "To send price updates and stock alerts, only if you signed up (your consent, which you can withdraw at any time).",
              "To keep the website secure, prevent abuse and fix problems (our legitimate interests).",
              "To keep business, tax and accounting records the law requires (legal obligation).",
            ],
          },
          "We don't sell your personal data, and we don't use it for automated decisions that affect you.",
        ],
      },
      {
        heading: "Who we share it with",
        body: [
          "We share personal data only with service providers who help us run the business, and only what they need:",
          {
            list: [
              "Hostinger: website hosting, content delivery network and our Reach mailing list.",
              "FormSubmit (formsubmit.co): delivers website enquiry and application forms to our email inbox.",
              "Our email provider: stores the emails we send and receive.",
              "WhatsApp (Meta): if you choose to message us on WhatsApp, WhatsApp's own terms and privacy policy apply.",
              "Drivers and delivery partners: the name, phone number and address needed to complete a delivery.",
              "Professional advisers, authorities or courts: when the law requires it or to protect our legal rights.",
            ],
          },
        ],
      },
      {
        heading: "International transfers",
        body: [
          "Some of these providers store data outside Ghana (for example, FormSubmit in the United States and Hostinger in the European Union). When that happens we rely on providers that offer appropriate security and data protection safeguards.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          {
            list: [
              "Enquiries: as long as needed to answer you and handle any resulting order, then for as long as our business records require.",
              "Orders and invoices: for the period Ghana's tax and accounting rules require.",
              "Job applications: up to 12 months after the role is filled, unless you ask us to delete it sooner or we hire you.",
              "Price-update list: until you unsubscribe.",
              "Server logs: kept by our hosting provider for a limited period for security.",
            ],
          },
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You can ask us to:",
          {
            list: [
              "tell you what personal data we hold about you and give you a copy",
              "correct data that is wrong or incomplete",
              "delete data we no longer need or have no right to keep",
              "stop using your data for marketing, or object to other uses",
              "withdraw consent you gave (for example, to price updates or marketing cookies)",
            ],
          },
          `Contact ${EMAIL} or ${PHONE}. We may need to confirm your identity first. If you're unhappy with how we handle your data, you can complain to Ghana's Data Protection Commission (www.dataprotection.org.gh).`,
        ],
      },
      {
        heading: "Security",
        body: [
          "The website uses HTTPS encryption, and we limit access to personal data to people who need it for their work. No system is completely secure, so please contact us straight away if you think your data has been put at risk.",
        ],
      },
      {
        heading: "Children",
        body: [
          "Our website and services are meant for adults. We don't knowingly collect personal data from anyone under 18. If you think a child has sent us their details, contact us and we'll delete them.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "We'll update this page when our practices change. The date at the top shows the latest version.",
        ],
      },
    ],
  },

  Cookies: {
    sections: [
      {
        heading: "What cookies and similar technologies are",
        body: [
          "Cookies are small files a website stores on your device. Websites can also store information in your browser's local storage or cache. This policy covers all of these, and we call them \"cookies\" below.",
        ],
      },
      {
        heading: "Cookies we use",
        body: [
          "Strictly necessary: these make the site work, don't track you and are always on.",
          {
            table: {
              head: ["Name", "Type", "Purpose", "How long"],
              rows: [
                ["isaphilo-consent", "Local storage", "Remembers your cookie choices so we don't ask on every visit.", "Until you change your choice or clear your browser data"],
                ["isaphilo-install-dismissed-at", "Local storage", "Remembers that you closed the \"Install the app\" prompt.", "14 days"],
                ["isaphilo-offline-v2", "Service worker cache", "Stores the offline page and logo so the site can show a message when you lose connection.", "Until replaced by a newer version"],
              ],
            },
          },
          "Marketing: these are off unless you choose \"Accept all\" or switch them on in Cookie settings.",
          {
            table: {
              head: ["Provider", "Purpose", "More information"],
              rows: [
                ["Hostinger Reach (cdn-reach.hostinger.com)", "Onsite tracking for our mailing list, and the footer \"price updates\" sign-up form. It may set its own cookies or identifiers.", "Hostinger privacy policy: hostinger.com/legal/privacy-policy"],
              ],
            },
          },
        ],
      },
      {
        heading: "What we don't use",
        body: [
          "We don't use advertising cookies, social-media pixels or Google Analytics. Our fonts are hosted on our own server, so loading the site doesn't contact Google Fonts.",
          "Links to WhatsApp, phone or email open those apps, and their own policies apply there.",
        ],
      },
      {
        heading: "Managing your choices",
        body: [
          "You can change your choice at any time through \"Cookie settings\" at the bottom of every page. If you switch marketing cookies off after accepting them, the page reloads so the tracking script is removed.",
          "You can also delete cookies and site data in your browser settings. Blocking strictly necessary storage may stop some features (such as remembering your cookie choice) from working.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "If we add a new type of cookie, we'll update this page and ask for your choice again.",
        ],
      },
    ],
  },

  Terms: {
    sections: [
      {
        heading: "About these terms",
        body: [
          `These terms apply to your use of isaphiloenterprise.com, run by ${BUSINESS}, ${ADDRESS}. By using the website you agree to them. If you don't agree, please don't use the site.`,
        ],
      },
      {
        heading: "Product information and images",
        body: [
          "We try to keep product names, specifications, pack sizes and photos accurate, but manufacturers change packaging and specifications, and colours can look different on screen. Some project names, figures and photos on the site are illustrative examples. Please confirm the details that matter to you with our team before ordering.",
          "Brand names such as Ghacem, Dangote, Dzata, Diamond, Azar, Coral, Leyland, Knauf and others are trademarks of their owners. Showing them means we supply those products; it doesn't mean the manufacturer endorses this website.",
        ],
      },
      {
        heading: "Prices, quotations and availability",
        body: [
          {
            list: [
              "The website doesn't show binding prices. Building-material prices change often.",
              "A price is only confirmed in a written quotation or invoice from us, and only for the period stated on it.",
              "Stock depends on supplier deliveries. An item shown on the website may be temporarily unavailable.",
              "Sending an enquiry doesn't create an order or contract. An order is agreed only when we confirm it with you.",
            ],
          },
        ],
      },
      {
        heading: "Orders, payment and delivery",
        body: [
          "Payment terms, delivery dates, delivery charges and any return or exchange arrangements are those agreed in your quotation, invoice or order confirmation. Delivery times are estimates and can depend on the destination, road conditions and stock.",
          "Please check materials when they are delivered and tell us about any shortage, damage or wrong item as soon as possible, before the materials are used or installed.",
        ],
      },
      {
        heading: "Construction and installation services",
        body: [
          "Building, installation, plumbing, surveying and other services are carried out under a separate written agreement or quotation, which sets out the scope, price, timing and responsibilities. That agreement takes priority over these website terms.",
        ],
      },
      {
        heading: "Using the website",
        body: [
          "Please don't misuse the site, for example by sending spam or false enquiries, trying to break its security, overloading it, or copying large parts of it.",
          `The website's text, design, logo and photos belong to ${BUSINESS} or are used with permission. You may view and share pages for personal use, but not copy or republish them commercially without our written permission.`,
        ],
      },
      {
        heading: "Links and third-party services",
        body: [
          "The site links to services we don't control, such as WhatsApp and manufacturers' websites. We aren't responsible for their content or how they handle your data.",
        ],
      },
      {
        heading: "Our responsibility",
        body: [
          "We work to keep the website available and accurate, but it is provided \"as is\". We can't guarantee it will always be available or error-free.",
          "To the extent the law allows, we aren't liable for losses caused by relying on website information without confirming it with us, or for indirect losses such as lost profit or project delays. Nothing in these terms limits any rights you have under Ghanaian consumer protection law, or any liability that can't legally be limited.",
        ],
      },
      {
        heading: "Changes and governing law",
        body: [
          "We may update these terms from time to time. The date at the top shows the current version.",
          "These terms are governed by the laws of the Republic of Ghana, and the courts of Ghana will handle any dispute.",
        ],
      },
      {
        heading: "Contact",
        body: [
          `Questions about these terms: ${EMAIL} or ${PHONE}.`,
        ],
      },
    ],
  },
};
