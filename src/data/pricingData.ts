/**
 * pricingData.ts
 * All RAVENTECH service packages and pricing
 * USD / PKR dual-currency (≈ 280 PKR = 1 USD)
 */

export type Currency = 'USD' | 'PKR';
export type CategoryKey = 'BRAND_DESIGN' | 'GROWTH_ADS' | 'SEO' | 'ECOMMERCE' | 'WEB_DEV';

export interface PriceValue {
  usd: string;
  pkr: string;
}

export interface SubOption {
  label: string;
  usd: string;
  pkr: string;
  suffix?: string;
}

export interface PricingCard {
  id: string;
  category: CategoryKey;
  name: string;
  tagline: string;
  pricePrimary: PriceValue;
  pricePrefix: string;       // "Starting at" | "From"
  priceSuffix: string;       // "(one-time)" | "/mo" | "(per listing)" | ""
  priceNote?: string;        // "+ ad spend"
  deliverables: string[];
  altPriceLabel?: string;
  altPrice?: PriceValue;
  subOptions?: SubOption[];
  subNote?: string;
  isMostPopular?: boolean;
  accentColor: string;
}

export interface Category {
  key: CategoryKey;
  label: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { key: 'BRAND_DESIGN', label: 'Brand & Design', color: '#7C3AED' },
  { key: 'GROWTH_ADS',   label: 'Growth & Ads',   color: '#22D3EE' },
  { key: 'SEO',          label: 'SEO',             color: '#F5C518' },
  { key: 'ECOMMERCE',    label: 'E-Commerce',      color: '#22D3EE' },
  { key: 'WEB_DEV',      label: 'Web & Dev',       color: '#7C3AED' },
];

export const PRICING_CARDS: PricingCard[] = [
  // ── BRAND & DESIGN ────────────────────────────────────────────────────
  {
    id: 'logo-creation',
    category: 'BRAND_DESIGN',
    name: 'Logo Creation',
    tagline: 'A mark that owns your space.',
    pricePrimary: { usd: '$149', pkr: '₨42,000' },
    pricePrefix: 'Starting at',
    priceSuffix: '(one-time)',
    deliverables: [
      '3 custom concepts, 3 revision rounds',
      'Full file pack (AI, SVG, PNG, PDF)',
      'Color + mono + favicon variants',
    ],
    accentColor: '#7C3AED',
  },
  {
    id: 'embroidery-logo',
    category: 'BRAND_DESIGN',
    name: 'Embroidery Digitizing',
    tagline: 'Stitch-ready, machine-perfect.',
    pricePrimary: { usd: '$39', pkr: '₨11,000' },
    pricePrefix: 'Starting at',
    priceSuffix: '(per design)',
    deliverables: [
      '.DST / .PES / .EMB embroidery files',
      'Up to 12 thread colors, density-optimized',
      'Free test-stitch adjustment',
    ],
    accentColor: '#22D3EE',
  },
  {
    id: 'full-branding',
    category: 'BRAND_DESIGN',
    name: 'Full Brand Identity',
    tagline: 'Identity with intent.',
    pricePrimary: { usd: '$599', pkr: '₨168,000' },
    pricePrefix: 'Starting at',
    priceSuffix: '(one-time)',
    deliverables: [
      'Logo suite + color + typography system',
      'Brand guidelines PDF',
      'Social + stationery templates',
    ],
    accentColor: '#F5C518',
  },
  {
    id: 'aplus-content',
    category: 'BRAND_DESIGN',
    name: 'A+ Content (Amazon EBC)',
    tagline: 'Pages that convert, not just describe.',
    pricePrimary: { usd: '$179', pkr: '₨50,000' },
    pricePrefix: 'Starting at',
    priceSuffix: '(per listing)',
    deliverables: [
      '5–7 enhanced modules (basic A+)',
      'Brand story + comparison + FAQ modules',
      'Mobile-optimized, Rufus-AI ready copy',
    ],
    altPriceLabel: 'Premium A+',
    altPrice: { usd: '$349', pkr: '₨98,000' },
    accentColor: '#22D3EE',
  },

  // ── GROWTH & ADS ──────────────────────────────────────────────────────
  {
    id: 'smm-management',
    category: 'GROWTH_ADS',
    name: 'Social Media Management',
    tagline: 'Conversations that convert.',
    pricePrimary: { usd: '$499', pkr: '₨140,000' },
    pricePrefix: 'From',
    priceSuffix: '/mo',
    priceNote: '+ ad spend',
    deliverables: [
      'Strategy, content calendar, community mgmt',
      'Choose your platforms:',
    ],
    subOptions: [
      { label: 'META ADS (FB/IG)',         usd: '$399/mo', pkr: '₨112,000', suffix: '+ ad spend' },
      { label: 'TIKTOK ADS',               usd: '$449/mo', pkr: '₨126,000', suffix: '+ ad spend' },
      { label: 'YOUTUBE ADS',              usd: '$449/mo', pkr: '₨126,000', suffix: '+ ad spend' },
      { label: 'GOOGLE ADS (Search/PMax)', usd: '$499/mo', pkr: '₨140,000', suffix: '+ ad spend' },
    ],
    subNote: '2 platforms 10% off · 3+ platforms 15% off',
    accentColor: '#7C3AED',
  },

  // ── SEO ───────────────────────────────────────────────────────────────
  {
    id: 'seo-growth',
    category: 'SEO',
    name: 'SEO Growth Retainer',
    tagline: 'Rank where it matters.',
    pricePrimary: { usd: '$599', pkr: '₨168,000' },
    pricePrefix: 'From',
    priceSuffix: '/mo',
    deliverables: [
      'Technical + on-page + content optimization',
      'Link building & monthly reporting',
      'AI-search (GEO) optimization included',
    ],
    subOptions: [
      { label: 'Starter SEO',       usd: '$349/mo', pkr: '₨98,000' },
      { label: 'One-time SEO Audit', usd: '$299',    pkr: '₨84,000' },
    ],
    isMostPopular: true,
    accentColor: '#F5C518',
  },

  // ── E-COMMERCE & MARKETPLACES ─────────────────────────────────────────
  {
    id: 'shopify-setup',
    category: 'ECOMMERCE',
    name: 'Shopify Store Setup',
    tagline: 'Launch-ready in days, built to scale.',
    pricePrimary: { usd: '$899', pkr: '₨252,000' },
    pricePrefix: 'Starting at',
    priceSuffix: '(one-time)',
    deliverables: [
      'Theme setup + brand customization',
      'Up to 20 products, payment + shipping config',
      'Core apps, speed + mobile optimization',
    ],
    altPriceLabel: 'Custom builds',
    altPrice: { usd: '$2,499', pkr: '₨700,000' },
    isMostPopular: true,
    accentColor: '#22D3EE',
  },
  {
    id: 'marketplace-setup',
    category: 'ECOMMERCE',
    name: 'Amazon / eBay / Etsy Setup',
    tagline: 'Marketplace-ready from day one.',
    pricePrimary: { usd: '$349', pkr: '₨98,000' },
    pricePrefix: 'Starting at',
    priceSuffix: '(per marketplace)',
    deliverables: [
      'Account + storefront/brand setup',
      'Category, policy & compliance config',
      'Up to 10 listings created',
    ],
    accentColor: '#7C3AED',
  },
  {
    id: 'product-listing',
    category: 'ECOMMERCE',
    name: 'Product Listing Creation',
    tagline: 'Listings that sell themselves.',
    pricePrimary: { usd: '$25', pkr: '₨7,000' },
    pricePrefix: 'Starting at',
    priceSuffix: '(per listing)',
    deliverables: [
      'Title, bullets, description, backend keywords',
      'Image-spec guidance',
      'Marketplace-compliant formatting',
    ],
    subNote: 'Bulk: 10+ listings 20% off',
    accentColor: '#22D3EE',
  },
  {
    id: 'listing-optimization',
    category: 'ECOMMERCE',
    name: 'Listing Optimization',
    tagline: 'Turn views into add-to-carts.',
    pricePrimary: { usd: '$49', pkr: '₨14,000' },
    pricePrefix: 'Starting at',
    priceSuffix: '(per ASIN/listing)',
    deliverables: [
      'Keyword + competitor research',
      'Conversion-focused copy rewrite',
      'A10/A+ & image-stack recommendations',
    ],
    subNote: 'Catalog rates on request',
    accentColor: '#F5C518',
  },

  // ── WEB & DEV ─────────────────────────────────────────────────────────
  {
    id: 'website-design',
    category: 'WEB_DEV',
    name: 'Website Designing (UI/UX)',
    tagline: 'Design that performs, not just appears.',
    pricePrimary: { usd: '$449', pkr: '₨126,000' },
    pricePrefix: 'Starting at',
    priceSuffix: '(one-time)',
    deliverables: [
      'Custom UI/UX, responsive design',
      'Up to 5 pages, Figma prototype',
      '2 revision rounds',
    ],
    accentColor: '#7C3AED',
  },
  {
    id: 'website-dev',
    category: 'WEB_DEV',
    name: 'Website Development',
    tagline: 'Sites engineered to convert.',
    pricePrimary: { usd: '$999', pkr: '₨280,000' },
    pricePrefix: 'Starting at',
    priceSuffix: '(one-time)',
    deliverables: [
      'Custom front-end build (Next.js/React)',
      'CMS, forms, SEO-ready, fast & responsive',
      'Deployment + 30-day support',
    ],
    altPriceLabel: 'Web app / SaaS',
    altPrice: { usd: 'Custom Quote', pkr: 'Custom Quote' },
    accentColor: '#22D3EE',
  },
];
