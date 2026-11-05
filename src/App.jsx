import { useEffect, useMemo, useRef, useState } from "react";
import { productCategories, products } from "./products.js";
import seoPages from "../seo-pages.json";

const CONTACT = {
  address:
    "IsaPhilo Enterprise, Mfuom Last Stop, Cemetery Road, Mfuom, Dunkwa-On-Offin, Central Region, Ghana",
  email: "info@isaphiloenterprise.com",
  phone: "+233201928965",
  whatsapp: "https://wa.me/233201928965",
};
const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/${CONTACT.email}`;
const FORM_SUBMIT_AJAX_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT.email}`;

const navigation = [
  "Home",
  "About",
  "Products",
  "Projects",
  "Portfolio",
  "Services",
  "Careers",
  "Contact",
];

const siteUrl = "https://isaphiloenterprise.com";
const pagePaths = Object.fromEntries(
  Object.entries(seoPages).map(([page, metadata]) => [page, metadata.path]),
);
const pageFromPath = Object.fromEntries(
  Object.entries(pagePaths).map(([page, path]) => [path, page]),
);
const pageMetadata = seoPages;

function updateMetaContent(selector, content) {
  document.querySelector(selector)?.setAttribute("content", content);
}

const projectPhotos = {
  accraConstruction: {
    src: "/projects/accra-construction.jpg",
    location: "Accra, Greater Accra",
    alt: "Modern building under construction in Accra, Ghana",
  },
  tamaleConstruction: {
    src: "/projects/ghana-house-construction.jpg",
    location: "Gbanyemini, near Tamale",
    alt: "House under construction in Gbanyemini, near Tamale, Ghana",
  },
  accraCompleted: {
    src: "/projects/accra-house-finished.jpg",
    location: "Accra, Greater Accra",
    alt: "Finished two-storey residence in Accra, Ghana",
  },
};

const ongoingSitePhotos = [
  {
    src: "/projects/ongoing-site-1.jpg",
    location: "Compound, Central Region",
    alt: "Multi-storey building under construction in Compound, Central Region, Ghana",
  },
  {
    src: "/projects/ongoing-site-2.jpg",
    location: "Twifo Praso, Central Region",
    alt: "Masonry buildings under construction along a road in Twifo Praso, Central Region, Ghana",
  },
  {
    src: "/projects/ongoing-site-3.jpg",
    location: "Dunkwa-On-Offin, Central Region",
    alt: "Construction workers laying concrete blocks at a site in Dunkwa-On-Offin, Central Region, Ghana",
  },
  {
    src: "/projects/ongoing-site-4.jpg",
    location: "Dunkwa-On-Offin, Central Region",
    alt: "Block walls and reinforcement at a residential building under construction in Dunkwa-On-Offin, Central Region, Ghana",
  },
];

const projects = [
  {
    name: "Community Housing",
    location: "Dunkwa-On-Offin",
    region: "Central Region",
    progress: 75,
    status: "Ongoing",
    photo: ongoingSitePhotos[0],
    description:
      "A residential build supported with structural supplies and coordinated construction.",
  },
  {
    name: "Residential Build",
    location: "Obuasi",
    region: "Ashanti Region",
    progress: 100,
    status: "Completed",
    photo: projectPhotos.accraCompleted,
    description:
      "A contemporary home brought together from foundation materials to finishing details.",
  },
  {
    name: "Western Region Residential Project",
    location: "Western Region, Ghana",
    region: "Western Region",
    progress: 60,
    status: "Ongoing",
    photo: ongoingSitePhotos[1],
    description:
      "Representative imagery for an ongoing residential build in the Western Region.",
  },
  {
    name: "Western Region Family Home",
    location: "Western Region, Ghana",
    region: "Western Region",
    progress: 100,
    status: "Completed",
    photo: projectPhotos.accraCompleted,
    description:
      "Representative imagery for a completed family home in the Western Region.",
  },
  {
    name: "Ashanti Region Residential Build",
    location: "Ashanti Region, Ghana",
    region: "Ashanti Region",
    progress: 45,
    status: "Ongoing",
    photo: ongoingSitePhotos[2],
    description:
      "Representative imagery for an ongoing residential build in the Ashanti Region.",
  },
  {
    name: "Building Materials Hub",
    location: "Mfuom Last Stop",
    region: "Central Region",
    progress: 60,
    status: "Ongoing",
    photo: ongoingSitePhotos[3],
    description:
      "Expanding dependable supply and dispatch capacity from the Mfuom hub.",
  },
  {
    name: "Housing Development",
    location: "Ayanfuri",
    region: "Central Region",
    progress: 45,
    status: "Ongoing",
    photo: ongoingSitePhotos[0],
    description:
      "A developing residential project supplied with blocks, cement and reinforcement.",
  },
  {
    name: "Residential Extension",
    location: "Assin Foso",
    region: "Central Region",
    progress: 80,
    status: "Ongoing",
    photo: ongoingSitePhotos[1],
    description:
      "An extension project with building supplies coordinated to its construction schedule.",
  },
  {
    name: "Family Home",
    location: "Twifo Praso",
    region: "Central Region",
    progress: 100,
    status: "Completed",
    photo: projectPhotos.accraCompleted,
    description:
      "A completed home project delivered with a materials-first approach.",
  },
  {
    name: "Luxury Villas",
    location: "Diaso",
    region: "Central Region",
    progress: 35,
    status: "Ongoing",
    photo: ongoingSitePhotos[2],
    description:
      "A planned residential development. Project imagery is illustrative.",
  },
  {
    name: "Market Stores Redevelopment",
    location: "Ajumako",
    region: "Central Region",
    progress: 55,
    status: "Ongoing",
    photo: ongoingSitePhotos[3],
    description:
      "A local commercial redevelopment concept. Project imagery is illustrative.",
  },
  {
    name: "Completed Apartment Residence",
    location: "Cape Coast",
    region: "Central Region",
    progress: 100,
    status: "Completed",
    photo: {
      src: "/projects/completed-site-1.jpg",
      location: "Cape Coast, Central Region",
      alt: "Completed multi-storey apartment residence with balconies and landscaped grounds",
    },
    description:
      "A completed multi-storey residence with balconies, stone cladding and landscaped grounds.",
    photoNote:
      "This completed-project photo was supplied by IsaPhilo. Its location and association with a specific project have not been independently verified.",
  },
  {
    name: "Completed Contemporary Residence",
    location: "Wassa Akropong",
    region: "Western Region",
    progress: 100,
    status: "Completed",
    photo: {
      src: "/projects/completed-site-2.jpg",
      location: "Wassa Akropong, Western Region",
      alt: "Completed contemporary multi-storey home with a dark tiled roof, stone columns and landscaped grounds",
    },
    description:
      "A completed contemporary home with a dark tiled roof, stone-clad columns and a landscaped entrance.",
    photoNote:
      "This completed-project photo was supplied by IsaPhilo. Its location and association with a specific project have not been independently verified.",
  },
  {
    name: "Completed Family Home",
    location: "Bibiani",
    region: "Western Region",
    progress: 100,
    status: "Completed",
    photo: {
      src: "/projects/completed-site-3.jpg",
      location: "Bibiani, Western Region",
      alt: "Completed single-storey family home with a dark tiled roof, covered porch and landscaped grounds",
    },
    description:
      "A completed single-storey home with a covered porch, stone accents and landscaped grounds.",
    photoNote:
      "This completed-project photo was supplied by IsaPhilo. Its location and association with a specific project have not been independently verified.",
  },
  {
    name: "Completed Residential Building",
    location: "Mfuom, Dunkwa-On-Offin",
    region: "Central Region",
    progress: 100,
    status: "Completed",
    photo: {
      src: "/projects/completed-mfuom.jpg",
      location: "Mfuom, Dunkwa-On-Offin, Central Region",
      alt: "Completed two-storey residential building in Mfuom, Dunkwa-On-Offin, Central Region",
    },
    description:
      "A completed residential building in Mfuom, Dunkwa-On-Offin.",
    photoNote:
      "This completed-project photo and location were supplied by IsaPhilo. The project's association with IsaPhilo has not been independently verified.",
  },
];

const services = [
  {
    number: "01",
    title: "GPS-tracked delivery",
    text: "Coordinate building material dispatch from Mfuom across Central Region, Western Region and Obuasi in Ashanti Region. Typical dispatch is 24–48 hours, subject to stock and destination.",
    label: "60+ TRUCKS",
    image: "/projects/ongoing-site-1.jpg",
    imageAlt: "Building under construction in Compound, Central Region; representative project image",
  },
  {
    number: "02",
    title: "Mfuom block factory",
    text: "Source solid and hollow blocks, interlocking blocks, and paving for residential and commercial projects.",
    label: "BLOCKS & PAVING",
    image: "/products/blocks.jpg",
    imageAlt: "Concrete blocks stacked at a manufacturing yard",
  },
  {
    number: "03",
    title: "Ghana paints & tinting",
    text:     "Explore Azar, Coral, Dulux, De-Luxy, Fine Nest and Leyland paint options, with colour tinting enquiries welcome.",
    label: "GHANA BRANDS",
    image: "/products/azar-tex.png",
    imageAlt: "AzarTex matt-finish emulsion paint pail, a Ghana-market product reference",
    imageFit: "contain",
  },
  {
    number: "04",
    title: "Steel cut & bend",
    text: "Discuss TMT reinforcement, pre-bent stirrups, BRC mesh and steel preparation for your build.",
    label: "REINFORCEMENT",
    image: "/products/rebar.jpg",
    imageAlt: "Close-up of ribbed steel reinforcement bars",
  },
  {
    number: "05",
    title: "POP & Knauf installation",
    text: "Ask about POP ceiling work and Knauf moisture-resistant board installation with experienced tradespeople.",
    label: "CEILINGS & DRYWALL",
    image: "/products/plasterboard.jpg",
    imageAlt: "Sheets of drywall stacked at a building-materials yard",
  },
  {
    number: "06",
    title: "Security door installation",
    text: "Choose from Turkish and China security door options, including selected smart-lock models and installation enquiries.",
    label: "DOORS & FITTING",
    image: "/products/zonle-doors/simple-steel-entry.jpg",
    imageAlt: "Steel entrance door product reference from the Zonle catalog",
    imageFit: "contain",
  },
];

const careerGroups = [
  {
    group: "Sales",
    roles: [
      ["Sales Executive", "Full-time", "Mfuom", "Support customer enquiries and product sales."],
      ["Paint Tinting Specialist", "Full-time", "Mfuom", "Help customers select and match paint colours."],
    ],
  },
  {
    group: "Contracting & Site Operations",
    roles: [
      ["Construction Site Supervisor", "Full-time", "Central Region", "Oversee daily site activities, coordinate workers and trades, and monitor project progress and safety."],
      ["Block Factory Supervisor", "Full-time", "Mfuom", "Coordinate daily block production and quality."],
      ["POP / Knauf Installer", "Contract", "Central Region", "Install POP ceilings and plasterboard systems."],
      ["Security Door Installer", "Contract", "Central Region", "Fit security doors and related hardware."],
    ],
  },
  {
    group: "Logistics, Warehouse & Supply Chain",
    roles: [
      ["GPS Truck Driver", "Full-time", "Mfuom", "Support safe, timely material deliveries."],
      ["Storekeeper", "Full-time", "Mfuom", "Track incoming stock, orders and warehouse records."],
    ],
  },
  {
    group: "Corporate Support",
    roles: [
      ["Accounts Officer", "Full-time", "Mfuom", "Maintain day-to-day accounts and business records."],
      ["Project Sales Coordinator", "Full-time", "Mfuom", "Coordinate contractor and project supply enquiries."],
    ],
  },
];

function Arrow({ diagonal = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      {diagonal ? (
        <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.6" />
      ) : (
        <path
          d="M3.5 10h12m-5-5 5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function ArrowUp() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 16V4m-5 5 5-5 5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path
        d="m4 10 4 4 8-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Pin() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path
        d="M16 8.3c0 4.2-6 9.2-6 9.2S4 12.5 4 8.3a6 6 0 1 1 12 0Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Brand({ setPage }) {
  return (
    <a
      className="brand-lockup"
      href={pagePaths.Home}
      aria-label="IsaPhilo Enterprise home"
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        setPage("Home");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <img src="/isaphilo-logo.jpg" alt="" />
    </a>
  );
}

function Header({ page, setPage, search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  function navigate(nextPage) {
    setPage(nextPage);
    setMenuOpen(false);
    setMobileSearchOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function followPageLink(event, nextPage) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(nextPage);
  }

  function submitSearch(event) {
    event.preventDefault();
    navigate("Products");
  }

  useEffect(() => {
    if (mobileSearchOpen) searchInputRef.current?.focus();
  }, [mobileSearchOpen]);

  return (
    <header className="site-header">
      <div className="header-contact-band">
        <div className="wide-shell">
          <div className="header-contact-card" aria-label="IsaPhilo Enterprise contact information and business hours">
            <span className="header-contact-item">
              <strong>Working Days:</strong>
              <span className="header-contact-value">
                <span className="header-contact-value-full">Monday–Saturday, Sunday Closed</span>
                <span className="header-contact-value-mobile">Mon–Sat, Sun closed</span>
              </span>
            </span>
            <span className="header-contact-item">
              <strong>Working Hours:</strong> 7am–6pm
            </span>
            <a className="header-contact-item" href={`tel:${CONTACT.phone}`}>
              <strong>Phone:</strong> {CONTACT.phone}
            </a>
            <a className="header-contact-item" href={`mailto:${CONTACT.email}`}>
              <strong>Email:</strong> {CONTACT.email}
            </a>
          </div>
        </div>
      </div>
      <div className="header-main">
        <div className="wide-shell header-row">
          <Brand setPage={setPage} />
          <button
            className="mobile-search-toggle"
            type="button"
            aria-expanded={mobileSearchOpen}
            aria-controls="site-search"
            aria-label={mobileSearchOpen ? "Close product search" : "Open product search"}
            onClick={() => setMobileSearchOpen((open) => !open)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
              <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <nav className={`main-nav${menuOpen ? " is-open" : ""}`} id="primary-navigation" aria-label="Main navigation">
            {navigation.map((item) => (
              <a
                className={`nav-link${page === item ? " active" : ""}`}
                key={item}
                href={pagePaths[item]}
                aria-current={page === item ? "page" : undefined}
                onClick={(event) => followPageLink(event, item)}
              >
                {item}
              </a>
            ))}
          </nav>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <form
        className={`search-bar${mobileSearchOpen ? " is-mobile-open" : ""}`}
        id="site-search"
        onSubmit={submitSearch}
        role="search"
      >
        <span className="search-symbol" aria-hidden="true">⌕</span>
        <input
          ref={searchInputRef}
          aria-label="Search products"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search cement, paints, steel, blocks and more"
          value={search}
        />
        <button type="submit" aria-label="Search products">
          <Arrow diagonal />
        </button>
      </form>
    </header>
  );
}

function PageIntro({ eyebrow, title, description, children }) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {description && <p className="page-lede">{description}</p>}
      {children}
    </div>
  );
}

function ProductCard({ product, onOpen }) {
  const [showUses, setShowUses] = useState(false);
  return (
    <article className="product-card">
      <button
        className="product-media"
        onClick={() => onOpen(product)}
        type="button"
        aria-label={`View ${product.name} details`}
      >
        <img
          className={product.imageFit === "contain" ? "product-image-contain" : ""}
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
        />
        <span className="product-tag">{product.vendor}</span>
        <span className="grade-badge">{product.grade}</span>
      </button>
      <div className="product-card-content">
        <p className="product-category">{product.category}</p>
        <button className="product-name" onClick={() => onOpen(product)} type="button">
          {product.name}
        </button>
        <div className="product-spec-grid">
          <span><small>PACKAGING</small>{product.packaging}</span>
          <span><small>SUPPLY</small>{product.plant}</span>
        </div>
        <div className="product-uses">
          {(showUses ? product.uses : product.uses.slice(0, 2)).map((use) => (
            <span className="use-chip" key={use}>{use}</span>
          ))}
          {product.uses.length > 2 && (
            <button type="button" className="use-toggle" onClick={() => setShowUses(!showUses)}>
              {showUses ? "Show less" : `+${product.uses.length - 2} more`}
            </button>
          )}
        </div>
        <div className="product-card-bottom">
          <span className={`product-price${product.priceValue ? "" : " quote"}`}>
            {product.priceLabel}
          </span>
          <button
            className="round-arrow"
            onClick={() => onOpen(product)}
            type="button"
            aria-label={`Open ${product.name} inquiry`}
          >
            <Arrow diagonal />
          </button>
        </div>
        <p className="availability">{product.stock}</p>
      </div>
    </article>
  );
}

function ProductModal({ product, onClose, onOpenRelated, onAddToInquiry }) {
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("Details");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  const whatsappText = encodeURIComponent(
    `Hi IsaPhilo, I'd like to enquire about ${product.name} — ${quantity} unit(s) — ${product.priceLabel}.`,
  );
  const related = products
    .filter((item) => item.categoryKey === product.categoryKey && item.id !== product.id)
    .slice(0, 3);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
      >
        <button className="modal-close" onClick={onClose} type="button" aria-label="Close dialog">
          ×
        </button>
        <div className="modal-product-grid">
          <div className="modal-gallery">
            <img
              className={product.imageFit === "contain" ? "product-image-contain" : ""}
              src={product.image}
              alt={product.imageAlt}
            />
            <div className="gallery-label">
              <span>{product.vendor}</span>
              <span>Availability confirmed on enquiry</span>
            </div>
          </div>
          <div className="modal-details">
            <p className="product-category">{product.vendor} · {product.category}</p>
            <h2 id="modal-product-title">{product.name}</h2>
            <div className="rating-row" aria-label="Product information">
              <span aria-hidden="true">★★★★★</span>
              <span>Ask us for current specifications and stock</span>
            </div>
            <p className="modal-price">{product.priceLabel}</p>
            {product.priceValue && <p className="sample-note">Indicative sample price — confirm current supplier pricing.</p>}
            <div className="modal-tabs" role="tablist" aria-label="Product information">
              {["Details", "Specs", "Shipping"].map((item) => (
                <button
                  className={tab === item ? "selected" : ""}
                  key={item}
                  onClick={() => setTab(item)}
                  role="tab"
                  aria-selected={tab === item}
                  type="button"
                >
                  {item === "Shipping" ? "Shipping & Returns" : item}
                </button>
              ))}
            </div>
            {tab === "Details" && <p className="modal-description">{product.description}</p>}
            {tab === "Specs" && (
              <dl className="modal-spec-list">
                {product.specs.map((spec) => (
                  <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>
                ))}
              </dl>
            )}
            {tab === "Shipping" && (
              <div className="shipping-note">
                <strong>Mfuom Last Stop hub</strong>
                <span>Dispatch timing and delivery costs depend on product availability, destination and order size. Ask our team to confirm before ordering.</span>
                <span>GPS-tracked fleet · Batch traceability on applicable cement orders</span>
              </div>
            )}
            <div className="modal-uses">
              {product.uses.map((use) => <span className="use-chip" key={use}>{use}</span>)}
            </div>
            <div className="quantity-row">
              <span>Quantity</span>
              <div className="quantity-control">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">+</button>
              </div>
            </div>
            <div className="modal-actions">
              <button className="button button-black" type="button" onClick={() => { onAddToInquiry(product, quantity); setAdded(true); }}>
                {added ? "Added to enquiry" : "Add to enquiry"}
              </button>
              <a className="button button-whatsapp" href={`${CONTACT.whatsapp}?text=${whatsappText}`} target="_blank" rel="noreferrer">
                WhatsApp enquiry
              </a>
            </div>
            {added && (
              <p className="inline-success" role="status">
                Added to your enquiry. Continue on WhatsApp or contact our Mfuom team.
              </p>
            )}
          </div>
        </div>
        {related.length > 0 && (
          <div className="related-products">
            <h3>More in {product.category}</h3>
            <div>
              {related.map((item) => (
                <button type="button" key={item.id} onClick={() => onOpenRelated(item)}>
                  <img src={item.image} alt="" />
                  <span>{item.name}</span>
                  <span>{item.priceLabel}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function HomePage({ setPage, openProduct }) {
  const featured = [products[1], products[34], products[47]];
  return (
    <>
      <section className="home-hero">
        <div className="hero-main">
          <div className="hero-copy">
            <span className="hub-badge"><span /> MFUOM LAST STOP HUB · 60+ GPS TRUCKS</span>
            <p className="eyebrow">THE BUILDER&apos;S CHOICE PARTNER</p>
            <h1>Building Ghana with <span>Ghacem, Paints &amp; Steel.</span></h1>
            <p className="hero-description">
              Your Mfuom hub for cement, Ghana paints, plywood, POP, doors and complete house construction support — from first delivery to final finish.
            </p>
            <div className="hero-buttons">
              <button className="button button-green" onClick={() => setPage("Products")} type="button">Explore products <Arrow /></button>
              <button className="button button-outline" onClick={() => setPage("Contact")} type="button">Plan your project <Arrow diagonal /></button>
            </div>
            <div className="hero-stats">
              <div><strong>12k+</strong><span>Bags at Mfuom</span></div>
              <div><strong>60+</strong><span>GPS-tracked trucks</span></div>
              <div><strong>GSA</strong><span>Certified supply</span></div>
            </div>
          </div>
          <div className="hero-featured">
            <div className="featured-heading"><span>BUILDER&apos;S ESSENTIALS</span><button onClick={() => setPage("Products")} type="button">Shop all <Arrow /></button></div>
            {featured.map((product) => (
              <button className="featured-card" key={product.id} onClick={() => openProduct(product)} type="button">
                <img src={product.image} alt="" />
                <span><small>{product.category}</small><strong>{product.name}</strong><em>{product.priceLabel}</em></span>
                <span className="featured-arrow"><Arrow diagonal /></span>
              </button>
            ))}
          </div>
        </div>
        <div className="hero-info-strip">
          <span><Pin />{CONTACT.address}</span>
          <span><b>↗</b>60+ GPS-tracked trucks</span>
          <span><Check />Batch traceable cement supply</span>
        </div>
      </section>
      <section className="home-categories">
        <div className="section-title-row">
          <div><p className="eyebrow">ONE HUB, EVERYTHING TO BUILD</p><h2>Start with the <span>right materials.</span></h2></div>
          <button className="text-button" onClick={() => setPage("Products")} type="button">Browse all {products.length} products <Arrow /></button>
        </div>
        <div className="category-grid">
          {productCategories.map((item) => {
            const categoryProduct = products.find((product) => product.categoryKey === item.key);
            return (
              <button key={item.key} className="category-card" onClick={() => setPage("Products")} type="button">
                {categoryProduct && (
                  <img
                    className={`category-card-image${categoryProduct.imageFit === "contain" ? " contain" : ""}`}
                    src={categoryProduct.image}
                    alt=""
                    loading="lazy"
                  />
                )}
                <span><strong>{item.category}</strong><small>{item.count} product{item.count > 1 ? "s" : ""}</small></span>
                <Arrow diagonal />
              </button>
            );
          })}
        </div>
      </section>
      <section className="home-projects">
        <div className="section-title-row">
          <div><p className="eyebrow">CENTRAL · WESTERN · ASHANTI</p><h2>Building across <span>Ghana&apos;s regions.</span></h2></div>
          <button className="text-button" onClick={() => setPage("Projects")} type="button">Explore projects <Arrow /></button>
        </div>
        <div className="project-preview-grid">
          {projects.slice(0, 3).map((project) => <ProjectCard key={project.name} project={project} onOpen={() => setPage("Projects")} />)}
        </div>
      </section>
      <section className="home-cta">
        <div><p className="eyebrow">YOUR NEXT STEP STARTS HERE</p><h2>One partner for your <span>whole build.</span></h2></div>
        <button className="button button-black" onClick={() => setPage("Contact")} type="button">Talk to the Mfuom team <Arrow diagonal /></button>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="ABOUT ISAPHILO ENTERPRISE" title={<>The Mfuom partner behind <span>your next build.</span></>} description="IsaPhilo Enterprise is a Ghanaian building materials supplier and construction partner serving contractors, homeowners and project teams from Mfuom Last Stop." />
      <section className="about-feature-grid">
        <article className="about-feature"><span className="large-stat">12k+</span><h2>Building essentials, ready at the hub.</h2><p>Our Mfuom Last Stop operation is set up to support projects with a broad selection of building materials and dependable coordination.</p></article>
        <article className="about-feature about-dark"><span className="large-stat">60+</span><h2>Delivery support that keeps projects moving.</h2><p>Our GPS-tracked fleet supports dispatch planning across Central Region and other operating areas. Timing depends on destination and current availability.</p></article>
        <article className="about-feature about-image"><img src="/products/blocks.jpg" alt="Concrete blocks stacked at a building-materials yard" loading="lazy" /><div><span className="eyebrow">OUR APPROACH</span><h2>Traceable supply. Practical partnership.</h2></div></article>
      </section>
      <section className="inventory-strip" aria-label="Mfuom hub inventory">
        <div><strong>12k+</strong><span>cement bags</span></div>
        <div><strong>800</strong><span>plywood sheets</span></div>
        <div><strong>200</strong><span>Azar paint buckets</span></div>
        <div><strong>25</strong><span>security doors on display</span></div>
      </section>
      <section className="about-details">
        <div><p className="eyebrow">BUILT ON LOCAL KNOW-HOW</p><h2>From Mfuom to <span>projects across Ghana.</span></h2></div>
        <div className="about-copy"><p>With a focus on construction supply and project delivery, IsaPhilo Enterprise brings cement, steel, blocks, Ghana paints, plywood, POP, plasterboard and security doors together through one point of contact.</p><p>Our founder, Philo Isa, brings 12 years of experience in Ghana&apos;s construction supply sector. Talk with our team to confirm stock, pricing, delivery and project requirements.</p><p>IsaPhilo Enterprise is a Ghacem authorized distributor and supports batch-traceable cement supply. Ask our team about current product documentation, dispatch options and estimated 24–48 hour delivery windows.</p><div className="service-area-chips"><span>Dunkwa-On-Offin</span><span>Obuasi</span><span>Ayanfuri</span><span>Assin Foso</span><span>Twifo Praso</span><span>Diaso</span><span>Ajumako</span><span>Western Region</span></div><div className="address-card"><Pin /><span><strong>Visit the Mfuom hub</strong>{CONTACT.address}</span></div></div>
      </section>
    </>
  );
}

function ProductsPage({ search, openProduct }) {
  const [category, setCategory] = useState("all");
  const filtered = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "all" || product.categoryKey === category;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || `${product.name} ${product.category} ${product.vendor} ${product.uses.join(" ")}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  }), [category, search]);

  return (
    <>
      <PageIntro eyebrow={`PRODUCTS · ${products.length} BUILDING ESSENTIALS`} title={<>The materials to <span>move your build forward.</span></>} description="Explore cement, iron rods and steel sections, blocks, Ghana paints, plywood, ceiling systems, roofing and security doors through our Mfuom hub. Product names and images include Ghana-market references; they are not confirmation of IsaPhilo stock. Confirm availability, specifications and prices before ordering." />
      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <h2>Categories</h2>
          <button className={category === "all" ? "category-filter active" : "category-filter"} onClick={() => setCategory("all")} type="button"><span>All products</span><span>{products.length}</span></button>
          {productCategories.map((item) => (
            <button className={category === item.key ? "category-filter active" : "category-filter"} key={item.key} onClick={() => setCategory(item.key)} type="button">
              <span>{item.category}</span><span>{item.count}</span>
            </button>
          ))}
          <div className="catalog-help"><strong>Need a bulk quote?</strong><p>Tell us the product, project location and quantity.</p><a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">Ask on WhatsApp <Arrow diagonal /></a></div>
        </aside>
        <div className="catalog-content">
          <div className="catalog-toolbar"><span>{filtered.length} products</span><span>Indicative prices may change. Confirm before ordering.</span></div>
          {filtered.length ? (
            <div className="product-grid">
              {filtered.map((product) => <ProductCard key={product.id} product={product} onOpen={openProduct} />)}
            </div>
          ) : <div className="empty-results"><h2>No products found</h2><p>Try a different product name or category.</p></div>}
        </div>
      </div>
    </>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <button className="project-card" type="button" onClick={onOpen}>
      <span className="project-image">
        <img src={project.photo.src} alt="" loading="lazy" />
        <span className={`project-status ${project.status === "Completed" ? "complete" : ""}`}>
          {project.status === "Completed" ? "✓" : "◷"} {project.status}
        </span>
        <span className="project-image-note">{project.photo.location}</span>
      </span>
      <span className="project-card-body"><span className="project-type">CONSTRUCTION PROJECT</span><strong>{project.name}</strong><span className="project-location"><Pin /><span>{project.location}<small>{project.region}</small></span></span><span className="progress-track"><span style={{ width: `${project.progress}%` }} /></span><span className="progress-label">{project.photoNote ? "Completed · photo supplied by IsaPhilo" : `${project.progress}% ${project.status === "Completed" ? "complete" : "progress"} · illustrative`}</span><span className="project-view-details">View details <Arrow /></span></span>
    </button>
  );
}

function ProjectsPage() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <PageIntro eyebrow="PROJECTS · CENTRAL, WESTERN & ASHANTI" title={<>Building across <span>three Ghanaian regions.</span></>} description="Locations shown on the four ongoing-site photos were provided by IsaPhilo: Compound, Twifo Praso and Dunkwa-On-Offin in the Central Region. Three completed-project photos were also supplied by IsaPhilo; their locations and association with specific projects have not been independently verified. Other project names and progress remain illustrative." />
      <div className="projects-grid">
        {projects.map((project) => <ProjectCard key={project.name} project={project} onOpen={() => setSelected(project)} />)}
      </div>
      {selected && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title"><button className="modal-close" onClick={() => setSelected(null)} type="button" aria-label="Close dialog">×</button><img src={selected.photo.src} alt={selected.photo.alt} /><p className="eyebrow">{selected.photoNote ? "Completed project · photo supplied by IsaPhilo" : `${selected.status} · ${selected.progress}% illustrative`}</p><h2 id="project-title">{selected.name}</h2><p className="project-location"><Pin /><span>{selected.location}<small>{selected.region}</small></span></p><p>{selected.description}</p><p className="sample-note">{selected.photoNote ?? (selected.status === "Ongoing" ? `The photo location (${selected.photo.location}) was provided by IsaPhilo. The project name, project details, progress and association with this example are illustrative.` : `Project details and progress are illustrative. This Ghana reference photo is from ${selected.photo.location} and is not connected to this example or IsaPhilo work.`)}</p></section></div>}
    </>
  );
}

function PortfolioPage({ setPage }) {
  return (
    <section className="portfolio-panel">
      <PageIntro eyebrow="PORTFOLIO · SUPPLY & CONSTRUCTION" title={<>A look at builds <span>across Ghana.</span></>} description="From a dependable materials hub to construction support, we help build momentum across residential and commercial projects." />
      <div className="portfolio-stats"><div><strong>12k+</strong><span>Bag stock capacity*</span></div><div><strong>60+</strong><span>GPS-tracked trucks*</span></div><div><strong>{products.length}</strong><span>Catalog products</span></div><div><strong>{projects.length}</strong><span>Project examples</span></div></div>
      <div className="portfolio-image-grid">
        {projects.slice(0, 4).map((project, index) => <article className={`portfolio-tile tile-${index + 1}`} key={project.name}><img src={project.photo.src} alt="" loading="lazy" /><div><span>{project.photo.location}</span><h2>{project.name}</h2></div></article>)}
      </div>
      <p className="sample-note">*Operational figures and project details are illustrative. Ghana reference photos are credited in the README and are not confirmed IsaPhilo work.</p>
      <div className="portfolio-cta"><div><h2>Have a project in mind?</h2><p>Let&apos;s talk about what you need to make it happen.</p></div><button className="button button-black" onClick={() => setPage("Contact")} type="button">Contact our team <Arrow diagonal /></button></div>
    </section>
  );
}

function ServicesPage({ setPage }) {
  return (
    <>
      <PageIntro eyebrow="SERVICES · MFUOM HUB" title={<>More than supply. <span>Support to build.</span></>} description="Practical services that connect building materials, delivery and on-site expertise from the same partner. Images show representative product and project examples; confirm service availability and product details with our team." />
      <div className="services-grid">
        {services.map((service) => <article className="service-card" key={service.number}><img className={`service-image ${service.imageFit === "contain" ? "contain" : ""}`} src={service.image} alt={service.imageAlt} loading="lazy" /><span className="service-icon">{service.number}</span><span className="service-label">{service.label}</span><h2>{service.title}</h2><p>{service.text}</p><button className="text-button" onClick={() => setPage("Contact")} type="button">Enquire about this service <Arrow /></button></article>)}
      </div>
    </>
  );
}

function CareersPage() {
  const [selectedRole, setSelectedRole] = useState("");
  const [fileError, setFileError] = useState("");

  function validateFile(event) {
    const file = event.target.files?.[0];
    if (!file) return setFileError("");
    const allowed = /\.(pdf|doc|docx)$/i.test(file.name);
    if (!allowed) {
      event.target.value = "";
      return setFileError("Please choose a PDF, DOC or DOCX file.");
    }
    if (file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      return setFileError("Your CV must be 5 MB or smaller.");
    }
    setFileError("");
  }

  return (
    <>
      <PageIntro eyebrow="CAREERS · JOIN THE MFUOM TEAM" title={<>Help build Ghana, <span>one project at a time.</span></>} description="We welcome people who care about customers, practical building solutions and reliable delivery. Explore the roles below and send us your details." />
      <div className="careers-banner"><div><strong>IsaPhilo Enterprise · Mfuom Last Stop</strong><span>{CONTACT.address}</span></div><div><b>60+</b><span>trucks · building supplies · construction support</span></div></div>
      <div className="career-groups">
        {careerGroups.map((group) => <section className="career-group" key={group.group}><div className="career-group-title"><p className="eyebrow">CAREER OPPORTUNITIES</p><h2>{group.group}</h2></div><div className="role-grid">{group.roles.map(([title, type, location, description]) => <article className="role-card" key={title}><span className="role-meta">{type} · {location}</span><h3>{title}</h3><p>{description}</p><button className="button button-green small-button" onClick={() => { setSelectedRole(title); document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" }); }} type="button">Apply <Arrow diagonal /></button></article>)}</div></section>)}
      </div>
      <form className="application-form" id="application-form" action={FORM_SUBMIT_ENDPOINT} method="POST" encType="multipart/form-data">
        <input type="hidden" name="_subject" value="Career application - IsaPhilo Enterprise" />
        <input type="hidden" name="_template" value="table" />
        <div className="form-section-heading"><p className="eyebrow">CAREER APPLICATION</p><h2>Introduce yourself.</h2><p>We&apos;ll review your application and contact you if there&apos;s a fit.</p></div>
        <div className="form-grid"><label>Full name<input name="name" autoComplete="name" placeholder="Your name" required /></label><label>Email address<input name="email" autoComplete="email" type="email" placeholder="you@example.com" required /></label><label>Phone / WhatsApp<input name="phone" type="tel" placeholder="+233 ..." required /></label><label>Role of interest<select name="role" value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)} required><option value="">Select a role</option>{careerGroups.flatMap((group) => group.roles.map(([title]) => <option value={title} key={title}>{title}</option>))}<option value="General application">Other building-related role</option></select></label><label className="file-field">CV / Resume <span>PDF, DOC or DOCX · 5 MB max</span><input name="attachment" type="file" accept=".pdf,.doc,.docx" onChange={validateFile} required /></label><label className="wide-field">A short introduction<textarea name="message" rows="4" placeholder="Tell us about your experience and availability." required /></label></div>
        {fileError && <p className="form-error" role="alert">{fileError}</p>}
        <button className="button button-green" type="submit">Submit application <Arrow diagonal /></button>
        <p className="form-disclaimer">Applications are sent to {CONTACT.email} through FormSubmit. The recipient must activate this address with FormSubmit before email delivery begins.</p>
        <aside className="application-fallback">
          <strong>Having trouble with the application form?</strong>
          <p>Send your application by email or contact us on WhatsApp instead.</p>
          <div>
            <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Career application - IsaPhilo Enterprise")}&body=${encodeURIComponent("Hello IsaPhilo Enterprise,\n\nI would like to apply for a role. Please find my application details below. I have attached my CV/resume.\n\nName:\nPhone / WhatsApp:\nRole of interest:\n\nThank you.")}`}>Email us</a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">Message us on WhatsApp</a>
          </div>
        </aside>
      </form>
    </>
  );
}

function ContactPage({ inquiryItems }) {
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const submitInquiry = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const replyTo = formData.get("email");
    if (typeof replyTo === "string" && replyTo.trim()) {
      formData.set("_replyto", replyTo.trim());
    }

    setSubmissionStatus("submitting");
    setSubmissionMessage("");

    let response;
    try {
      response = await fetch(FORM_SUBMIT_AJAX_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
    } catch {
      setSubmissionStatus("error");
      setSubmissionMessage("We couldn’t reach the submission service. Check your connection and try again, or contact us by phone or WhatsApp.");
      return;
    }

    let result;
    try {
      result = await response.json();
    } catch {
      setSubmissionStatus("error");
      setSubmissionMessage("We couldn’t verify the submission. Please try again or contact us by phone or WhatsApp.");
      return;
    }

    const hasResult = result !== null && typeof result === "object";
    if (!response.ok || !hasResult || (result.success !== true && result.success !== "true")) {
      setSubmissionStatus("error");
      setSubmissionMessage(
        hasResult && typeof result.message === "string"
          ? result.message
          : "FormSubmit did not confirm delivery. Please try again or contact us by phone or WhatsApp.",
      );
      return;
    }

    form.reset();
    setSubmissionStatus("success");
    setSubmissionMessage(`FormSubmit accepted your inquiry for ${CONTACT.email}. We can reply to ${replyTo}.`);
  };

  return (
    <section className="contact-page">
      <div className="contact-info">
        <p className="eyebrow">CONTACT · MFUOM LAST STOP</p>
        <h1>Let&apos;s talk about <span>your build.</span></h1>
        <p>Tell us what you&apos;re working on. We can help with materials, delivery and house construction enquiries.</p>
        <div className="contact-item"><Pin /><span><small>VISIT THE HUB</small>{CONTACT.address}</span></div>
        <a className="contact-item" href={`mailto:${CONTACT.email}`}><span className="contact-icon">@</span><span><small>EMAIL</small>{CONTACT.email}</span></a>
        <a className="contact-item" href={`tel:${CONTACT.phone}`}><span className="contact-icon">↗</span><span><small>CALL / WHATSAPP</small>{CONTACT.phone}</span></a>
        <div className="contact-quick-actions"><a className="button button-whatsapp" href={CONTACT.whatsapp} target="_blank" rel="noreferrer">WhatsApp the Mfuom team <Arrow diagonal /></a><a className="button button-light" href={`tel:${CONTACT.phone}`}>Call the hub <Arrow diagonal /></a></div>
        <div className="contact-trust"><span><Check /> GPS-tracked delivery</span>        <span><Check /> GSA-certified supply</span>
        <span><Check /> Batch-traceable cement</span><span><Check /> Confirm current stock with our team</span></div>
        <aside className="contact-fallback">
          <strong>Having trouble with the inquiry form?</strong>
          <p>Send us an email or message us on WhatsApp instead.</p>
          <div>
            <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("IsaPhilo Enterprise enquiry")}&body=${encodeURIComponent("Hello IsaPhilo Enterprise,\n\nI would like to make an enquiry.\n\nName:\nPhone / WhatsApp:\nProject location:\nProduct or service:\n\nHow can you help?\n")}`}>Email us</a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">Message us on WhatsApp</a>
          </div>
        </aside>
      </div>
      <form className="contact-form" action={FORM_SUBMIT_AJAX_ENDPOINT} method="POST" onSubmit={submitInquiry}>
        <input type="hidden" name="_captcha" value="false" /><input type="hidden" name="_subject" value="IsaPhilo Enterprise Inquiry" /><input type="hidden" name="_template" value="table" /><input type="hidden" name="Products in enquiry" value={inquiryItems.map((item) => `${item.product.name} — ${item.quantity}`).join("; ")} />
        {inquiryItems.length > 0 && <div className="selected-inquiry"><strong>Products in your enquiry</strong>{inquiryItems.map((item, index) => <span key={`${item.product.id}-${index}`}>{item.quantity} × {item.product.name}</span>)}</div>}
        <div className="form-section-heading"><p className="eyebrow">PROJECT ENQUIRY</p><h2>What can we help with?</h2><p>Share a few details and our team will follow up.</p></div>
        <label>Full name<input name="name" autoComplete="name" placeholder="Your name" required /></label>
        <label>Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" placeholder="+233 ..." required /></label>
        <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
        <label>Project location<input name="location" placeholder="e.g. Mfuom, Dunkwa-On-Offin" required /></label>
        <label>Product or service<select name="category" defaultValue="" required><option value="" disabled>Select a category</option>{productCategories.map((item) => <option value={item.category} key={item.key}>{item.category}</option>)}<option value="Full house package">Full house package / construction</option><option value="Other">Other enquiry</option></select></label>
        <label>Estimated quantity<input name="quantity" placeholder="Quantity or project size" /></label>
        <label>Tell us about your build<textarea name="message" rows="4" placeholder="What are you building, and when do you need supplies?" required /></label>
        <button className="button button-green submit-button" type="submit" disabled={submissionStatus === "submitting"}>{submissionStatus === "submitting" ? "Sending..." : "Send Inquiry"} <Arrow diagonal /></button>
        {submissionMessage && <p className={`inquiry-status ${submissionStatus}`} role={submissionStatus === "error" ? "alert" : "status"}>{submissionMessage}</p>}
        <p className="form-disclaimer">Inquiries are sent to {CONTACT.email} through FormSubmit. The recipient must activate this address with FormSubmit before email delivery begins.</p>
      </form>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="site-footer">
      <div className="wide-shell footer-grid">
        <div className="footer-brand-column"><Brand setPage={setPage} /><p>The Builder&apos;s Choice Partner. Building Ghana, from Mfuom Last Stop.</p></div>
        <div className="footer-pages"><h2>PAGES</h2>{navigation.map((page) => <a key={page} href={pagePaths[page]} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); setPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}>{page}</a>)}</div>
        <div className="footer-contact"><h2 className="footer-accent-heading">LOCATE US</h2><p>{CONTACT.address}</p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a><span>60+ GPS trucks · 24–48h dispatch*</span></div>
        <div className="footer-stock"><h2 className="footer-accent-heading">ISAPHILO ENTERPRISE STOCK</h2><p>Azar · Coral · Leyland · Shield · Dolphin · Dominion</p><p>Marine plywood · POP &amp; Knauf · Security doors</p><a className="footer-whatsapp-link" href={CONTACT.whatsapp} target="_blank" rel="noreferrer">Message us on WhatsApp <Arrow diagonal /></a></div>
      </div>
      <div className="wide-shell footer-bottom"><span>© {new Date().getFullYear()} IsaPhilo Enterprise</span><span>*Delivery timing and availability vary by destination and stock.</span></div>
    </footer>
  );
}

function LoadingSkeleton({ isOffline }) {
  return (
    <div className={`loading-screen${isOffline ? " is-offline" : ""}`} aria-busy="true">
      {isOffline && (
        <div className="offline-notice" role="status" aria-live="polite">
          No internet connection detected. Check your connection to use online features.
        </div>
      )}
      <span className="sr-only" role="status">Loading IsaPhilo Enterprise website.</span>
      <header className="loading-header" aria-hidden="true">
        <span className="skeleton-shape loading-brand" />
        <div className="loading-nav">
          <span className="skeleton-shape" />
          <span className="skeleton-shape" />
          <span className="skeleton-shape" />
          <span className="skeleton-shape" />
          <span className="skeleton-shape" />
        </div>
      </header>
      <main className="wide-shell loading-content" aria-hidden="true">
        <section className="loading-hero">
          <div className="loading-hero-copy">
            <span className="skeleton-shape loading-badge" />
            <span className="skeleton-shape loading-eyebrow" />
            <div className="loading-title">
              <span className="skeleton-shape" />
              <span className="skeleton-shape" />
            </div>
            <div className="loading-lines">
              <span className="skeleton-shape" />
              <span className="skeleton-shape" />
              <span className="skeleton-shape" />
            </div>
            <div className="loading-actions">
              <span className="skeleton-shape" />
              <span className="skeleton-shape" />
            </div>
            <div className="loading-stats">
              <span className="skeleton-shape" />
              <span className="skeleton-shape" />
              <span className="skeleton-shape" />
            </div>
          </div>
          <div className="loading-featured">
            <span className="skeleton-shape loading-featured-title" />
            {[0, 1, 2].map((item) => (
              <div className="loading-featured-card" key={item}>
                <span className="skeleton-shape loading-product-image" />
                <span className="loading-product-copy">
                  <span className="skeleton-shape" />
                  <span className="skeleton-shape" />
                  <span className="skeleton-shape" />
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="loading-categories">
          <div className="loading-section-heading">
            <span className="skeleton-shape" />
            <span className="skeleton-shape" />
          </div>
          <div className="loading-categories-grid">
            {[0, 1, 2, 3].map((item) => (
              <span className="skeleton-shape loading-category-card" key={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  const [page, setCurrentPage] = useState(
    () => pageFromPath[window.location.pathname.replace(/\/+$/, "") || "/"] ?? "Home",
  );
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inquiryItems, setInquiryItems] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOffline, setIsOffline] = useState(() => !navigator.onLine);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const setPage = (nextPage) => {
    const nextPath = pagePaths[nextPage];
    if (!nextPath) {
      throw new Error(`Unknown page: ${nextPage}`);
    }
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ page: nextPage }, "", nextPath);
    }
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    const syncPageWithLocation = () => {
      const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
      const currentPage = pageFromPath[currentPath];
      if (currentPage) {
        setCurrentPage(currentPage);
        return;
      }

      window.history.replaceState({ page: "Home" }, "", pagePaths.Home);
      setCurrentPage("Home");
    };

    window.addEventListener("popstate", syncPageWithLocation);
    syncPageWithLocation();
    return () => window.removeEventListener("popstate", syncPageWithLocation);
  }, []);

  useEffect(() => {
    const metadata = pageMetadata[page] ?? pageMetadata.Home;
    const canonicalUrl = `${siteUrl}${pagePaths[page] ?? pagePaths.Home}`;
    document.title = metadata.title;
    updateMetaContent('meta[name="description"]', metadata.description);
    updateMetaContent('meta[property="og:title"]', metadata.title);
    updateMetaContent('meta[property="og:description"]', metadata.description);
    updateMetaContent('meta[property="og:url"]', canonicalUrl);
    updateMetaContent('meta[name="twitter:title"]', metadata.title);
    updateMetaContent('meta[name="twitter:description"]', metadata.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
  }, [page]);

  useEffect(() => {
    const loadingTimeout = window.setTimeout(() => setIsInitialLoading(false), 2000);
    return () => window.clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    const updateScrollTopVisibility = () => setShowScrollTop(window.scrollY > 320);
    window.addEventListener("scroll", updateScrollTopVisibility, { passive: true });
    updateScrollTopVisibility();
    return () => window.removeEventListener("scroll", updateScrollTopVisibility);
  }, []);

  useEffect(() => {
    let isActive = true;
    let isChecking = false;
    let requestController;
    let requestTimeout;

    const checkConnection = async () => {
      if (!navigator.onLine) {
        setIsOffline(true);
        return;
      }
      if (isChecking) return;

      isChecking = true;
      requestController = new AbortController();
      requestTimeout = window.setTimeout(() => requestController.abort(), 5000);

      try {
        const response = await fetch(
          `${window.location.origin}/favicon.svg?connection-check=${Date.now()}`,
          { method: "HEAD", cache: "no-store", signal: requestController.signal },
        );
        if (isActive) setIsOffline(!response.ok);
      } catch {
        if (isActive) setIsOffline(true);
      } finally {
        window.clearTimeout(requestTimeout);
        isChecking = false;
      }
    };

    const checkWhenVisible = () => {
      if (document.visibilityState === "visible") void checkConnection();
    };
    const handleOnline = () => void checkConnection();
    const handleOffline = () => setIsOffline(true);
    const intervalId = window.setInterval(checkConnection, 30_000);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    document.addEventListener("visibilitychange", checkWhenVisible);
    void checkConnection();

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
      window.clearTimeout(requestTimeout);
      requestController?.abort();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      document.removeEventListener("visibilitychange", checkWhenVisible);
    };
  }, []);

  const addToInquiry = (product, quantity) => {
    setInquiryItems((items) => [...items, { product, quantity }]);
    setSelectedProduct(null);
    setPage("Contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageComponents = {
    Home: <HomePage setPage={setPage} openProduct={setSelectedProduct} />,
    About: <AboutPage />,
    Products: <ProductsPage search={search} openProduct={setSelectedProduct} />,
    Projects: <ProjectsPage />,
    Portfolio: <PortfolioPage setPage={setPage} />,
    Services: <ServicesPage setPage={setPage} />,
    Careers: <CareersPage />,
    Contact: <ContactPage inquiryItems={inquiryItems} />,
  };

  if (isInitialLoading) return <LoadingSkeleton isOffline={isOffline} />;

  return (
    <div className={`app-shell${isOffline ? " is-offline" : ""}`}>
      {isOffline && (
        <div className="offline-notice" role="status" aria-live="polite">
          No internet connection detected. Check your connection to use online features.
        </div>
      )}
      <Header page={page} setPage={setPage} search={search} setSearch={setSearch} />
      <main className="page-content wide-shell">{pageComponents[page]}</main>
      <Footer setPage={setPage} />
      {showScrollTop && <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} type="button" aria-label="Scroll to top"><ArrowUp /></button>}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onOpenRelated={setSelectedProduct} onAddToInquiry={addToInquiry} />}
    </div>
  );
}
