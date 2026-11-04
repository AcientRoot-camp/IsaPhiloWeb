# IsaPhilo Enterprise

A responsive React, Vite, and Tailwind CSS website for IsaPhilo Enterprise,
the Ghana-based building materials supplier and construction partner.

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
JavaScript. `public/robots.txt` and `public/sitemap.xml` are copied into the
production build. The Apache rules in `public/.htaccess` serve those pages and
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

The company logo was supplied for this project. The GHACEM and Diamond Cement
bag photos are from Ghanaian product listings; the Dzata Cement bag is cropped
from the [manufacturer's product flyer](https://www.dzatacement.com/). Confirm
image-use permissions before publishing. Dangote cement bag images and product
names are references from the
[manufacturer's products page](https://cement.dangote.com/our-products/);
manufacturer specifications do not confirm Ghana availability or IsaPhilo
stock. Paint packaging images are product
references from [Azar Chemical Industries](https://www.azarchemicalindustries.com/product/azar-tex/),
[Coral & Dulux Ghana](https://www.coraldulux.com.gh/en/products/coralatex-super-spreading),
[the Coral & Dulux Ghana product catalog](https://www.coraldulux.com.gh/en/products),
[De-Luxy Paint](https://de-luxy.com/),
[Fine Nest Paints](https://www.finenestpaints.com/), and
[CETECH Ghana](https://cetechbpa.com/gh/buy/leyland_emulsion_paint_matt_finish_-_all_colours__sizes/).
They identify product examples, not confirmed IsaPhilo stock; confirm current
packaging and image-use permissions before publishing. Other material-category
photos are representative, not photographs of IsaPhilo stock:
reinforcement bars by [W.carter (CC BY-SA 4.0)](https://commons.wikimedia.org/wiki/File:A_bunch_of_rebar_up_close.jpg),
concrete blocks by [Jonathan Billinger (CC BY-SA 2.0)](https://www.geograph.org.uk/photo/592212),
and drywall by [Amaxson (public domain)](https://commons.wikimedia.org/wiki/File:Drywall.jpg).

Block product types, AMJ-listed dimensions and applications are references from
[AMJ Block Factory](https://amjblockfactory.com/#products), including solid and
hollow sandcrete blocks, interlocking blocks, hourdis slabs, curbstones, and
heavy-duty and decorative pavers. Ventilation blocks, walkway slabs and
landscaping stones are product-range references from
[Jobadee Block Works](https://jobadee.com/block-factory-in-tema-ghana/).
These manufacturers are information sources, not confirmed IsaPhilo suppliers;
availability, specifications and delivery must be confirmed before ordering.
Confirm dimensions and paver loading suitability with the manufacturer.
Structural suitability requires verified product data and project-specific
professional approval.

Plywood product names, specifications and product-reference images are from
[OKorder's Ghana plywood listings](https://www.okorder.com/gl_Ghana/Plywood/).
The listings include international supplier products and do not establish
current Ghana availability or IsaPhilo stock. Confirm dimensions, glue/bond
class, core, certifications, fire ratings, load ratings, intended use and
delivery with the supplier before ordering or using these products in a
project. The LVL scaffolding plank and capped pine scaffold plank are access
equipment, not plywood sheathing; confirm their certification and safe working
loads before use. Image reuse permission was confirmed by the project owner.

Iron-rod product types, diameters and listed lengths are references from
[Rod World](https://rodworld.store/products); the 40 ft high-tensile and 30 ft
mild-steel listings are not confirmation of IsaPhilo stock. The wider steel
product range and BRC mesh reference B5 Plus's
[iron and steel catalog](https://www.b5plusgroup.com/iron-and-steel/).
Representative product images are sourced from those product pages; image-use
permissions should be confirmed before publication. [Ferro Fabrik](https://www.ferrofabrikltd.com/)
and [BM Ghana](https://bmghana.com/) are additional Ghana steel-market
references, but their linked pages do not provide the item-specific
specifications shown in the Rod World product variants. All suppliers, stock,
dimensions, grades, lengths, weights, standards, test certificates and
deliveries must be confirmed before ordering or structural use.

Six roofing-sheet variants (aluminium, IBR Aluzinc, plain Aluzinc and
galvanized) are references from
[Warehouse Ghana's roofing-sheet category](https://www.warehouseghana.com/product-category/roofing-sheet/).
The supplier's listed thickness for its 0.37 mm aluminium sheets conflicts
with the 0.3–0.4 mm range in its specification table; confirm exact gauges,
materials, profiles, dimensions, finishes, bundle quantities and availability
with the supplier. These listings do not confirm IsaPhilo stock. The catalog
uses the existing representative roofing image; confirm image-use permission
before publication.

Security-door styles and product images are manufacturer references from the
[Zonle metal door catalog](https://www.zonledoors.com/product-metal-door-39.html).
They are not confirmation of IsaPhilo stock or availability in Ghana. Confirm
dimensions, materials, hardware, tested ratings, supply, installation and
image-use permission with the relevant suppliers before publishing or ordering.

Ghana project-reference photos, resized from the originals:
[A modern building under construction](https://commons.wikimedia.org/wiki/File:A_modern_building_under_construction.jpg)
by Kwameghana (CC BY-SA 4.0),
[House, Gbanyemini](https://commons.wikimedia.org/wiki/File:House,_Gbanyemini_(P1100304).jpg)
by Matti Blume (CC BY-SA 4.0), and
[Two Storey House in Accra 2](https://commons.wikimedia.org/wiki/File:Two_Storey_House_in_Accra_2.jpg)
by Gkbediako (CC BY-SA 4.0). These are Ghana reference images from Accra and
Gbanyemini near Tamale, not photos of the listed projects. Three previously user-provided
completed-project photos are used at
`public/projects/completed-site-1.jpg` through `completed-site-3.jpg`; their
location labels (Cape Coast, Central Region; Wassa Akropong, Western Region;
and Bibiani, Western Region, respectively) were provided by IsaPhilo. Their
association with specific projects has not been independently verified.
An additional user-provided completed-project photo,
`public/projects/completed-mfuom.jpg`, is labeled Mfuom, Dunkwa-On-Offin,
Central Region, as provided by IsaPhilo. Its association with IsaPhilo has not
been independently verified.
Project names, statuses and progress are illustrative, not verified IsaPhilo
references. Confirm project details before representing examples as IsaPhilo
work.

Four user-provided site photos are used for ongoing-project examples:
`public/projects/ongoing-site-1.jpg` through `ongoing-site-4.jpg`. Their
location labels were provided by IsaPhilo: Compound, Twifo Praso, and
Dunkwa-On-Offin in the Central Region. The photo-to-project details and
progress are illustrative and have not been independently verified.
