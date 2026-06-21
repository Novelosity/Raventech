// ─────────────────────────────────────────────────────────────────────────────
// RAVENTECH — Service Data Configuration
// Single source of truth for all 16 service pages.
// All portfolio projects are clearly marked "Sample / Concept" — not real clients.
// ─────────────────────────────────────────────────────────────────────────────

export interface Capability {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  motifProgress: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string; // Always "Sample / Concept — [Industry]"
  niche: string;
  filter: string;
  metric: string;
  thumbnailGradient: string; // Tailwind gradient e.g. "from-violet-600 to-cyan-500"
  challenge: string;
  approach: string;
  result: string;
  metrics: { label: string; value: string; unit?: string }[];
  tools: string[];
  hasBeforeAfter: boolean;
  beforeLabel?: string;
  afterLabel?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServicePricing {
  usd: string;
  pkr: string;
  period: string;
  note?: string;
  tiers?: { name: string; usd: string; pkr: string }[];
}

export interface ServiceData {
  slug: string;
  name: string;
  headline: string;
  subheadline: string;
  motifKey: string;
  accent: 'violet' | 'cyan' | 'gold';
  capabilities: Capability[];
  process: ProcessStep[];
  portfolio: PortfolioProject[];
  filters: string[];
  faq: FAQ[];
  relatedSlugs: string[];
  pricing: ServicePricing;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. LOGO CREATION
// ─────────────────────────────────────────────────────────────────────────────
const logoCreation: ServiceData = {
  slug: 'logo-creation',
  name: 'Logo Creation',
  headline: 'Logos that own the space.',
  subheadline: 'Marks engineered to be remembered.',
  motifKey: 'LogoCreationMotif',
  accent: 'violet',
  capabilities: [
    { icon: '⬡', title: 'Strategic Identity Design', description: 'Every mark begins with competitive positioning research, ensuring your logo occupies a distinct visual territory.' },
    { icon: '✦', title: 'Vector Precision', description: 'Infinitely scalable SVG masters delivered in every format — from favicon to billboard without a single pixel lost.' },
    { icon: '◈', title: 'Brand System Thinking', description: 'Logos designed to anchor a full identity system: color, type, motion, and sub-brand extensions baked in from day one.' },
  ],
  process: [
    { number: '01', title: 'Discovery', description: 'Brand audit, competitor landscape analysis, and positioning workshop to define the visual territory your mark will own.', motifProgress: 0 },
    { number: '02', title: 'Concept Sketching', description: 'Three divergent directions explored in rough form — explorative, not prescriptive. Quantity drives quality.', motifProgress: 0.25 },
    { number: '03', title: 'Digital Refinement', description: 'Selected direction evolved in vector with precision spacing, weight, and proportion.', motifProgress: 0.5 },
    { number: '04', title: 'Brand Testing', description: 'Logo tested across real contexts: mockups, dark/light, small sizes, embroidery, and print.', motifProgress: 0.75 },
    { number: '05', title: 'Final Delivery', description: 'Master files in SVG, PNG, PDF, and EPS. Full usage guide included.', motifProgress: 1 },
  ],
  filters: ['All', 'Wordmark', 'Lettermark', 'Mascot', 'Abstract', 'Combination Mark'],
  portfolio: [
    { id: 'lc-1', title: 'Geometric Wordmark for FinTech Startup', client: 'Sample / Concept — Financial Technology', niche: 'FinTech', filter: 'Wordmark', metric: '3 concepts, 48hr', thumbnailGradient: 'from-violet-700 to-indigo-900', challenge: 'The client needed a wordmark that conveyed both digital innovation and financial trust — two attributes that often pull visual identity in opposite directions.', approach: 'We explored type-weight contrast and a custom ligature between the brand initials to create a mark that reads as both precise and progressive.', result: 'Delivered three distinct directions within 48 hours; the chosen mark earned a 96% stakeholder approval score across 12 reviewers.', metrics: [{ label: 'Concepts Delivered', value: '3' }, { label: 'Approval Rate', value: '96', unit: '%' }, { label: 'Turnaround', value: '48', unit: 'hrs' }], tools: ['Illustrator', 'Figma', 'Fontlab'], hasBeforeAfter: false },
    { id: 'lc-2', title: 'Mascot Logo for Gaming Brand', client: 'Sample / Concept — Gaming / Esports', niche: 'Gaming', filter: 'Mascot', metric: '94% recognition lift', thumbnailGradient: 'from-purple-800 to-pink-900', challenge: 'A gaming brand entering a saturated esports market needed a mascot that stood apart from the oversaturated hawk/wolf/dragon archetype.', approach: 'We designed an abstract geometric phoenix built entirely from hexagonal tiles — referencing both game-grid logic and mythological resilience.', result: 'Brand recognition in post-launch surveys reached 94% within the target demographic after a 60-day campaign.', metrics: [{ label: 'Recognition Lift', value: '94', unit: '%' }, { label: 'Revision Rounds', value: '2' }, { label: 'Final Assets', value: '18' }], tools: ['Illustrator', 'Procreate', 'After Effects'], hasBeforeAfter: false },
    { id: 'lc-3', title: 'Lettermark for Legal Consultancy', client: 'Sample / Concept — Professional Services', niche: 'Legal', filter: 'Lettermark', metric: '2 revision rounds', thumbnailGradient: 'from-slate-700 to-violet-900', challenge: 'A boutique legal firm needed gravitas without stuffiness — a mark that worked on letterheads and LinkedIn profile pictures equally well.', approach: 'A monogram built on a classical serif baseline, redrawn with hairline-contrast strokes for a contemporary editorial feel.', result: 'The mark was adopted across 4 office locations and a 6-partner sub-brand system in a single rollout.', metrics: [{ label: 'Revision Rounds', value: '2' }, { label: 'Sub-Brand Variants', value: '4' }, { label: 'Delivery Days', value: '5' }], tools: ['Illustrator', 'InDesign'], hasBeforeAfter: false },
    { id: 'lc-4', title: 'Abstract Mark for Wellness App', client: 'Sample / Concept — Health & Wellness', niche: 'Wellness Tech', filter: 'Abstract', metric: '+67% brand recall', thumbnailGradient: 'from-teal-700 to-emerald-900', challenge: 'A meditation app launching into an already crowded market of lotus flowers and mindful gradients needed a mark that felt modern, not clichéd.', approach: 'Three interlocking arcs derived from a breathing exercise rhythm — distinct from category norms while immediately communicating calm.', result: 'App store icon recognition increased 67% versus the previous placeholder mark in usability testing.', metrics: [{ label: 'Brand Recall', value: '67', unit: '%' }, { label: 'App Store CTR', value: '+18', unit: '%' }, { label: 'Concepts', value: '4' }], tools: ['Illustrator', 'Figma'], hasBeforeAfter: false },
    { id: 'lc-5', title: 'Combination Mark for F&B Chain', client: 'Sample / Concept — Food & Beverage', niche: 'Restaurant', filter: 'Combination Mark', metric: '6 formats delivered', thumbnailGradient: 'from-amber-700 to-orange-900', challenge: 'A fast-casual restaurant chain needed a mark system that worked on packaging, signage, digital ads, and staff uniforms — all simultaneously.', approach: 'A primary combination mark with a secondary icon-only lockup and a tertiary monogram, each tested across 14 surface mockups before approval.', result: 'All three lockups passed print production checks without modification, saving an estimated 3 weeks of revision time.', metrics: [{ label: 'Lockup Variants', value: '3' }, { label: 'Mockup Surfaces', value: '14' }, { label: 'Print-Ready', value: '100', unit: '%' }], tools: ['Illustrator', 'Photoshop', 'Figma'], hasBeforeAfter: false },
    { id: 'lc-6', title: 'Minimal Wordmark for SaaS Platform', client: 'Sample / Concept — B2B SaaS', niche: 'SaaS', filter: 'Wordmark', metric: '48hr delivery', thumbnailGradient: 'from-cyan-700 to-blue-900', challenge: 'A B2B SaaS platform needed a wordmark that could anchor a product family of 6 tools without dominating any individual product UI.', approach: 'Reduced to core letterforms with a single diacritic mark as the differentiator — minimal enough to recede in UI, strong enough to anchor brand campaigns.', result: 'The mark was implemented across 6 product UIs and a full marketing site within 10 days of delivery.', metrics: [{ label: 'Product Implementations', value: '6' }, { label: 'Delivery Time', value: '48', unit: 'hrs' }, { label: 'Approval Rate', value: '100', unit: '%' }], tools: ['Illustrator', 'Figma'], hasBeforeAfter: false },
  ],
  faq: [
    { question: 'How many logo concepts do I receive?', answer: 'Every project begins with three distinct concepts — divergent enough to represent meaningfully different strategic directions, not minor variations. You choose one to develop further, with up to two rounds of revisions included.' },
    { question: 'What file formats are included in the final delivery?', answer: 'You receive SVG (master vector), AI (editable), PDF (print-ready), PNG (transparent, multiple sizes), and EPS. We also provide a dark/light version of each lockup.' },
    { question: 'Do I own the copyright to my logo?', answer: 'Yes. Upon final payment, full intellectual property rights transfer to you. RAVENTECH retains only the right to display the work in our portfolio (with your permission).' },
    { question: 'How long does the process take?', answer: 'Initial concepts are delivered within 48–72 hours. The full process — including revisions and final file prep — typically runs 5–10 business days depending on feedback turnaround.' },
    { question: 'Can you match a logo to an existing brand system?', answer: 'Absolutely. If you have established brand guidelines, we work within them. If not, we can develop accompanying brand guidelines as an add-on service.' },
  ],
  relatedSlugs: ['branding', 'embroidery-logo-design', 'website-designing'],
  pricing: {
    usd: 'Starting at $149',
    pkr: '₨42,000',
    period: 'one-time',
    tiers: [
      { name: 'Starter', usd: '$149', pkr: '₨42,000' },
      { name: 'Professional', usd: '$299', pkr: '₨84,000' },
      { name: 'Premium', usd: '$499', pkr: '₨140,000' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. EMBROIDERY LOGO DESIGN
// ─────────────────────────────────────────────────────────────────────────────
const embroideryLogoDesign: ServiceData = {
  slug: 'embroidery-logo-design',
  name: 'Embroidery Logo Design',
  headline: 'Stitch-ready. Machine-perfect.',
  subheadline: 'Digitized marks that run clean.',
  motifKey: 'EmbroideryMotif',
  accent: 'gold',
  capabilities: [
    { icon: '🧵', title: 'Machine Digitization', description: 'Every path hand-optimized for embroidery machines — correct stitch type, density, underlay, and compensation for the specific fabric.' },
    { icon: '📐', title: 'Multi-Format Output', description: 'Delivered in DST, PES, EMB, JEF, and VP3 formats. Compatible with all major embroidery machine brands.' },
    { icon: '🔬', title: 'Stitch Count Optimization', description: 'Efficient stitch paths that reduce machine time and thread breaks while maintaining crisp detail.' },
  ],
  process: [
    { number: '01', title: 'Artwork Review', description: 'We assess your existing logo or artwork for embroidery viability — flagging elements that need simplification for fabric.', motifProgress: 0 },
    { number: '02', title: 'Digitization', description: 'Manual path creation in professional embroidery software, setting stitch types, densities, and run sequences.', motifProgress: 0.33 },
    { number: '03', title: 'Virtual Proof', description: 'Digital simulation of the finished embroidery sent for approval before any stitching occurs.', motifProgress: 0.66 },
    { number: '04', title: 'File Delivery', description: 'All machine formats plus stitch count report, color thread chart (Madeira/Isacord references), and usage guide.', motifProgress: 1 },
  ],
  filters: ['All', 'Caps', 'Polos', 'Jackets', 'Patches', '3D Puff'],
  portfolio: [
    { id: 'em-1', title: 'Cap Embroidery — Sports Brand', client: 'Sample / Concept — Sportswear', niche: 'Sportswear', filter: 'Caps', metric: '4 thread colors', thumbnailGradient: 'from-yellow-700 to-amber-900', challenge: 'A sportswear brand needed their complex 8-color logo digitized for fitted caps, where fabric tension creates distortion challenges.', approach: 'Reduced to 4 optimized thread colors with compensation paths for cap-front distortion, maintaining legibility at 50mm width.', result: 'Zero stitching defects across the first production run of 500 caps.', metrics: [{ label: 'Thread Colors', value: '4' }, { label: 'Stitch Count', value: '8,400' }, { label: 'Width', value: '50', unit: 'mm' }], tools: ['Wilcom', 'Hatch Embroidery'], hasBeforeAfter: false },
    { id: 'em-2', title: '3D Puff Logo — Streetwear Label', client: 'Sample / Concept — Streetwear', niche: 'Streetwear', filter: '3D Puff', metric: '3D puff effect', thumbnailGradient: 'from-orange-700 to-red-900', challenge: 'A streetwear label wanted a raised 3D puff effect on hoodies — a technique requiring specific foam underlay and stitch angles.', approach: 'Foam underlay mapping with vertical satin stitch columns to maximize the 3D raised effect at the correct height ratios.', result: 'Consistent 4mm puff height across all production units; zero foam bleed-through.', metrics: [{ label: 'Puff Height', value: '4', unit: 'mm' }, { label: 'Stitch Count', value: '12,200' }, { label: 'Production Units', value: '200' }], tools: ['Wilcom', 'PE-Design'], hasBeforeAfter: false },
    { id: 'em-3', title: 'Left Chest Logo — Corporate Uniforms', client: 'Sample / Concept — Corporate', niche: 'Corporate Uniform', filter: 'Polos', metric: '100% production pass', thumbnailGradient: 'from-slate-600 to-gray-900', challenge: 'Corporate polo uniforms required a wordmark with thin letterforms — notoriously difficult to reproduce cleanly in embroidery.', approach: 'Increased minimum letterform weight thresholds and used running stitch outlines rather than satin fill for the thinnest strokes.', result: 'All 300 units passed quality inspection; the client approved for an additional 500-unit order.', metrics: [{ label: 'Pass Rate', value: '100', unit: '%' }, { label: 'Units Produced', value: '300' }, { label: 'Stitch Count', value: '5,600' }], tools: ['Hatch Embroidery', 'Wilcom'], hasBeforeAfter: false },
    { id: 'em-4', title: 'Woven Patch Design', client: 'Sample / Concept — Outdoor Gear', niche: 'Outdoor / Tactical', filter: 'Patches', metric: '6 file formats', thumbnailGradient: 'from-green-800 to-teal-900', challenge: 'Tactical gear patches need high detail in a small format, often 80mm or less, with Velcro backing compatibility.', approach: 'Designed a woven patch spec (separate from embroidery) with 120-thread warp count for maximum detail at 75mm diameter.', result: 'Patch approved for full production with all 6 standard international file formats delivered.', metrics: [{ label: 'File Formats', value: '6' }, { label: 'Patch Size', value: '75', unit: 'mm' }, { label: 'Thread Count', value: '120' }], tools: ['Illustrator', 'Wilcom'], hasBeforeAfter: false },
    { id: 'em-5', title: 'Jacket Back Panel Embroidery', client: 'Sample / Concept — Fashion', niche: 'Fashion / Apparel', filter: 'Jackets', metric: '28,000 stitches', thumbnailGradient: 'from-indigo-700 to-purple-900', challenge: 'A large back-panel embroidery across a denim jacket required managing thread tension across 280mm of curved surface.', approach: 'Section-by-section digitization with underlay compensation for denim stretch, and stitch density calibrated for denim fabric weight.', result: 'Delivered on schedule; zero puckering reported in the 50-unit test production run.', metrics: [{ label: 'Stitch Count', value: '28,000' }, { label: 'Width', value: '280', unit: 'mm' }, { label: 'Puckering', value: '0', unit: 'defects' }], tools: ['Wilcom', 'Hatch'], hasBeforeAfter: false },
  ],
  faq: [
    { question: 'What file formats do you deliver?', answer: 'We deliver DST, PES, EMB, JEF, and VP3 as standard. If your machine requires a different format (XXX, VIP, HUS, etc.), just let us know and we\'ll include it at no extra cost.' },
    { question: 'Do I need to send my existing logo in a specific format?', answer: 'We accept SVG, AI, EPS, PDF, or high-resolution PNG (300dpi+). Lower quality sources are workable but may require a clean-up fee if significant redrawing is needed.' },
    { question: 'Can you digitize very small or complex logos?', answer: 'Yes, but small size and high complexity are opposing forces in embroidery. We\'ll advise on any simplifications needed for your target size, and offer a simplified variant alongside the standard version.' },
    { question: 'What\'s the difference between 2D embroidery and 3D puff?', answer: '2D embroidery lies flat on the fabric. 3D puff uses a foam underlay beneath the stitching, creating a raised dimensional effect. 3D puff works best for bold, blocky letterforms or simple icons — fine detail is not suitable for puff.' },
    { question: 'Do you offer physical stitch-out samples?', answer: 'We provide high-quality digital simulation proofs as standard. Physical stitch-out samples can be arranged as an add-on service for large production runs.' },
  ],
  relatedSlugs: ['logo-creation', 'branding', 'a-plus-content'],
  pricing: {
    usd: 'Starting at $39',
    pkr: '₨11,000',
    period: 'per design',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. SEO
// ─────────────────────────────────────────────────────────────────────────────
const seo: ServiceData = {
  slug: 'seo',
  name: 'SEO',
  headline: 'Rank where it matters.',
  subheadline: 'Built for Google and AI search.',
  motifKey: 'SeoMotif',
  accent: 'cyan',
  capabilities: [
    { icon: '⚡', title: 'Technical SEO', description: 'Core Web Vitals, crawl optimization, schema markup, and site architecture built for both traditional search and AI crawlers.' },
    { icon: '🎯', title: 'Content & GEO Strategy', description: 'Topical authority mapping and Generative Engine Optimization — ranking in AI-generated answers, not just blue links.' },
    { icon: '🔗', title: 'Authority Building', description: 'White-hat link acquisition from genuinely relevant domains. No PBNs, no link farms — only signals Google trusts.' },
  ],
  process: [
    { number: '01', title: 'SEO Audit', description: 'Technical crawl, content gap analysis, backlink profile review, and competitive benchmark across your top 10 keywords.', motifProgress: 0 },
    { number: '02', title: 'Strategy Build', description: 'Keyword universe mapping, content plan, and technical roadmap prioritized by impact and implementation effort.', motifProgress: 0.25 },
    { number: '03', title: 'On-Page Implementation', description: 'Title tags, meta descriptions, heading hierarchy, internal linking, and schema markup applied at scale.', motifProgress: 0.5 },
    { number: '04', title: 'Content Execution', description: 'Topical cluster articles and landing pages created or optimized to match search intent and build authority.', motifProgress: 0.75 },
    { number: '05', title: 'Monitor & Iterate', description: 'Monthly ranking reports, traffic analysis, and strategy refinement based on what the data shows.', motifProgress: 1 },
  ],
  filters: ['All', 'E-Commerce', 'Local SEO', 'SaaS', 'Content/GEO', 'Technical'],
  portfolio: [
    { id: 'seo-1', title: 'E-Commerce SEO — Apparel Brand', client: 'Sample / Concept — Fashion E-Commerce', niche: 'E-Commerce', filter: 'E-Commerce', metric: '+312% organic traffic', thumbnailGradient: 'from-cyan-700 to-blue-900', challenge: 'An apparel e-commerce site had 2,000+ product pages with zero structured schema, duplicate meta descriptions, and a 4.2s LCP score — invisible to both Google and shoppers.', approach: 'We rebuilt site architecture around product category clusters, implemented product and breadcrumb schema at scale, and resolved 340 technical errors in the first 30 days.', result: 'Organic traffic grew 312% within 6 months; 47 category keywords moved to page 1, including 8 to position 1.', metrics: [{ label: 'Organic Traffic', value: '+312', unit: '%' }, { label: 'Keywords P1', value: '47' }, { label: 'LCP Improvement', value: '-2.1', unit: 's' }], tools: ['Screaming Frog', 'Ahrefs', 'Google Search Console', 'Surfer SEO'], hasBeforeAfter: true, beforeLabel: 'Before: 1,200 organic sessions/mo', afterLabel: 'After: 4,944 organic sessions/mo' },
    { id: 'seo-2', title: 'Local SEO — Multi-Location Dental Practice', client: 'Sample / Concept — Healthcare', niche: 'Local SEO', filter: 'Local SEO', metric: '+8 avg. ranking positions', thumbnailGradient: 'from-teal-600 to-cyan-900', challenge: 'A 5-location dental practice had inconsistent NAP data across 40+ citations and was outranked by competitors with half their review count.', approach: 'Citation cleanup across all directories, Google Business Profile optimization for each location, and a review acquisition system using post-appointment SMS sequences.', result: 'Average ranking position improved by 8 places across target keywords; map pack appearances increased from 12 to 67 per month.', metrics: [{ label: 'Avg. Ranking Gain', value: '+8', unit: ' positions' }, { label: 'Map Pack Appearances', value: '+455', unit: '%' }, { label: 'Citations Fixed', value: '40+' }], tools: ['BrightLocal', 'Ahrefs', 'Google Business Profile API'], hasBeforeAfter: false },
    { id: 'seo-3', title: 'SaaS SEO — B2B Project Management Tool', client: 'Sample / Concept — B2B SaaS', niche: 'SaaS', filter: 'SaaS', metric: '89 DR within 8 months', thumbnailGradient: 'from-blue-700 to-indigo-900', challenge: 'A SaaS startup entering a competitive category dominated by Asana, Monday, and ClickUp had zero domain authority and a thin content strategy.', approach: 'Topical authority cluster built around 12 high-intent keyword groups; 3 hero comparison pages targeting competitor brand keywords plus a digital PR campaign generating 18 editorial links.', result: 'Domain rating grew from 12 to 89 in 8 months; organic trial signups increased 140%.', metrics: [{ label: 'Domain Rating', value: '89' }, { label: 'Organic Trial Signups', value: '+140', unit: '%' }, { label: 'Editorial Links', value: '18' }], tools: ['Ahrefs', 'Surfer SEO', 'Clearscope', 'Pitchbox'], hasBeforeAfter: false },
    { id: 'seo-4', title: 'GEO / AI Search Optimization', client: 'Sample / Concept — Personal Finance', niche: 'Content/GEO', filter: 'Content/GEO', metric: 'Featured in 34 AI answers', thumbnailGradient: 'from-emerald-700 to-green-900', challenge: 'A personal finance blog was generating traffic from traditional search but entirely absent from ChatGPT, Perplexity, and Google AI Overviews.', approach: 'Restructured content with explicit FAQ schema, claim-evidence-source formatting, and entity optimization — the three pillars of GEO (Generative Engine Optimization).', result: 'The site now appears in 34 verified AI-generated answers across four major AI search platforms.', metrics: [{ label: 'AI Answer Appearances', value: '34' }, { label: 'Featured Snippets', value: '19' }, { label: 'Content Pieces Optimized', value: '62' }], tools: ['Search Console', 'Perplexity API', 'Clearscope', 'Schema Pro'], hasBeforeAfter: true, beforeLabel: 'Before: 0 AI answer appearances', afterLabel: 'After: 34 verified AI answer citations' },
    { id: 'seo-5', title: 'Technical SEO — Enterprise News Site', client: 'Sample / Concept — Media / Publishing', niche: 'Technical', filter: 'Technical', metric: '+180% crawl coverage', thumbnailGradient: 'from-gray-700 to-slate-900', challenge: 'A 400,000-page news archive had critical crawl budget issues — Google was only indexing 22% of pages due to redirect chains, canonicalization errors, and pagination chaos.', approach: 'Complete URL architecture overhaul, redirect chain consolidation (78→2 hops max), canonical audit, and XML sitemap segmentation by content freshness.', result: 'Crawl coverage increased from 22% to 81% within 60 days; organic sessions grew 180% in the following quarter.', metrics: [{ label: 'Crawl Coverage', value: '+180', unit: '%' }, { label: 'Redirect Hops Reduced', value: '78→2' }, { label: 'Pages Indexed', value: '+260%' }], tools: ['Screaming Frog', 'Botify', 'Google Search Console', 'DeepCrawl'], hasBeforeAfter: false },
    { id: 'seo-6', title: 'E-Commerce Technical + Content SEO', client: 'Sample / Concept — Home Decor', niche: 'E-Commerce', filter: 'E-Commerce', metric: '47 keywords on page 1', thumbnailGradient: 'from-orange-700 to-amber-900', challenge: 'A home decor brand had strong product photography but weak textual content — Google could not understand what most pages were about.', approach: 'Implemented a structured content layer across all category and product pages: keyword-rich descriptions, FAQ sections, and product attribute schema.', result: '47 target keywords reached page 1 within 5 months; organic revenue contribution grew from 8% to 31% of total.', metrics: [{ label: 'Keywords on Page 1', value: '47' }, { label: 'Organic Revenue Share', value: '8%→31%' }, { label: 'Avg. Position', value: '6.2' }], tools: ['Surfer SEO', 'Ahrefs', 'Schema App'], hasBeforeAfter: false },
  ],
  faq: [
    { question: 'How long before I see SEO results?', answer: 'Technical fixes can show results within 4–8 weeks. Content and link-building strategies typically show meaningful organic growth at the 3–6 month mark. SEO compounds over time — the returns you see at month 6 are dramatically larger than month 1.' },
    { question: 'Do you guarantee rankings?', answer: 'No reputable SEO provider guarantees specific rankings — Google\'s algorithm is not purchasable. We guarantee a documented, best-practice strategy and transparent monthly reporting on every metric that matters.' },
    { question: 'What is GEO and do I need it?', answer: 'Generative Engine Optimization is the practice of optimizing content to appear in AI-generated search answers (ChatGPT, Perplexity, Google AI Overviews). If your audience uses AI search tools — and they increasingly do — GEO is a meaningful traffic channel you shouldn\'t ignore.' },
    { question: 'What does your monthly reporting include?', answer: 'Keyword ranking changes, organic traffic trends (sessions, users), conversion data from Search Console, backlink acquisitions, and a written commentary on what we did, what changed, and what\'s next.' },
    { question: 'Can you work with my existing development team?', answer: 'Yes. We deliver a technical SEO brief with exact specifications for your developers to implement, or we can implement directly if you use WordPress, Shopify, or Webflow.' },
    { question: 'Is SEO worth it for a brand-new website?', answer: 'Yes — but the strategy differs. New sites benefit most from tight keyword targeting, strong technical foundations, and early authority-building rather than broad content sprints. We scope accordingly.' },
  ],
  relatedSlugs: ['google-ads', 'website-development', 'product-listing-optimization'],
  pricing: {
    usd: 'From $599',
    pkr: '₨168,000',
    period: '/mo',
    tiers: [
      { name: 'SEO Audit', usd: '$299', pkr: '₨84,000' },
      { name: 'Starter', usd: '$349/mo', pkr: '₨98,000/mo' },
      { name: 'Growth', usd: '$599/mo', pkr: '₨168,000/mo' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. SOCIAL MEDIA MARKETING
// ─────────────────────────────────────────────────────────────────────────────
const socialMediaMarketing: ServiceData = {
  slug: 'social-media-marketing',
  name: 'Social Media Marketing',
  headline: 'Conversations that convert.',
  subheadline: 'Full-funnel social strategy, managed.',
  motifKey: 'SocialMediaMotif',
  accent: 'violet',
  capabilities: [
    { icon: '📱', title: 'Multi-Platform Strategy', description: 'Unified content and paid strategy across Instagram, TikTok, YouTube, and Facebook — with platform-native creative for each.' },
    { icon: '🎬', title: 'Creative Production', description: 'Scroll-stopping static, video, and UGC-style assets built for performance, not just aesthetics.' },
    { icon: '📊', title: 'Performance Analytics', description: 'Weekly performance dashboards with actionable insights — not vanity metrics, but reach, engagement, and conversion data.' },
  ],
  process: [
    { number: '01', title: 'Audit & Strategy', description: 'Full platform audit, competitor analysis, and 90-day content and paid strategy roadmap.', motifProgress: 0 },
    { number: '02', title: 'Content Calendar', description: 'Monthly content calendar with platform-native formats planned 3 weeks ahead for approval.', motifProgress: 0.33 },
    { number: '03', title: 'Creative Production', description: 'Content creation, caption writing, hashtag strategy, and scheduling using optimal posting windows.', motifProgress: 0.66 },
    { number: '04', title: 'Community & Reporting', description: 'Engagement management and monthly performance report with next-month strategy adjustments.', motifProgress: 1 },
  ],
  filters: ['All', 'Facebook/Instagram', 'TikTok', 'YouTube', 'Multi-Platform'],
  portfolio: [
    { id: 'smm-1', title: 'Instagram Growth — Skincare Brand', client: 'Sample / Concept — Beauty / Skincare', niche: 'Beauty', filter: 'Facebook/Instagram', metric: '+18K followers in 90 days', thumbnailGradient: 'from-pink-700 to-rose-900', challenge: 'A DTC skincare brand had a strong product but a dormant Instagram account with 840 followers and sub-2% engagement.', approach: 'Implemented a content mix of 60% educational reels, 25% UGC-style social proof, and 15% product-focused posts, paired with an engagement pod strategy and a micro-influencer seeding campaign.', result: '18,400 net new followers in 90 days; average engagement rate increased from 1.8% to 6.4%.', metrics: [{ label: 'Net New Followers', value: '18,400' }, { label: 'Engagement Rate', value: '6.4', unit: '%' }, { label: 'Reel Avg. Views', value: '42K' }], tools: ['Later', 'Canva', 'CapCut', 'Instagram Insights'], hasBeforeAfter: false },
    { id: 'smm-2', title: 'TikTok Launch — DTC Food Brand', client: 'Sample / Concept — Food & Beverage', niche: 'Food/DTC', filter: 'TikTok', metric: '2.1M video views month 1', thumbnailGradient: 'from-fuchsia-700 to-purple-900', challenge: 'A DTC snack brand needed to establish a TikTok presence from zero — no followers, no brand voice, no video production process.', approach: 'Launched with a "reaction first" content strategy — showing real people trying products — plus a branded sound and creator collaboration with 5 mid-tier food creators.', result: '2.1M organic video views in the first month; 4 videos crossed 100K views individually.', metrics: [{ label: 'Month 1 Views', value: '2.1M' }, { label: 'Videos 100K+', value: '4' }, { label: 'Profile Follows', value: '12,800' }], tools: ['TikTok Creator Marketplace', 'CapCut', 'Sprout Social'], hasBeforeAfter: false },
    { id: 'smm-3', title: 'Full-Funnel Social Strategy — B2B SaaS', client: 'Sample / Concept — B2B Technology', niche: 'B2B SaaS', filter: 'Multi-Platform', metric: '340 qualified leads from social', thumbnailGradient: 'from-blue-700 to-cyan-900', challenge: 'A B2B SaaS tool had no organic social presence and relied entirely on paid search — missing a significant awareness and consideration phase opportunity.', approach: 'Built a LinkedIn thought-leadership content program for the founding team, paired with a YouTube explainer series and a coordinated retargeting campaign across all platforms.', result: '340 verified qualified leads attributed to social channels in Q1; LinkedIn SSI score increased from 22 to 74.', metrics: [{ label: 'Qualified Leads', value: '340' }, { label: 'LinkedIn SSI Score', value: '22→74' }, { label: 'YouTube Watch Time', value: '+890', unit: '%' }], tools: ['LinkedIn Analytics', 'HubSpot', 'YouTube Studio', 'Hootsuite'], hasBeforeAfter: false },
  ],
  faq: [
    { question: 'What platforms do you manage?', answer: 'We specialize in Instagram, TikTok, YouTube, and Facebook. We can also manage LinkedIn for B2B clients. Each platform is managed with platform-native strategy — we don\'t cross-post the same content everywhere.' },
    { question: 'Do you create the content or do we?', answer: 'We handle end-to-end content creation including copywriting, graphic design, and video editing. You provide brand approvals. We can also work with your existing creative team on a strategy-only basis.' },
    { question: 'How is social media marketing priced?', answer: 'Management fees cover strategy and content creation. Paid ad budgets (ad spend) are managed separately and billed directly through your ad accounts — we never hold your ad spend.' },
    { question: 'How quickly will we see follower growth?', answer: 'Organic growth is a compound effect — the first 30 days establish content systems, and meaningful growth acceleration typically begins at day 60–90. We set honest expectations in the onboarding call.' },
  ],
  relatedSlugs: ['meta-ads', 'tiktok-ads', 'youtube-ads'],
  pricing: {
    usd: 'From $499',
    pkr: '₨140,000',
    period: '/mo + ad spend',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. META ADS
// ─────────────────────────────────────────────────────────────────────────────
const metaAds: ServiceData = {
  slug: 'meta-ads',
  name: 'Meta Ads',
  headline: 'Scroll-stopping Meta campaigns.',
  subheadline: 'ROAS-engineered paid social.',
  motifKey: 'MetaAdsMotif',
  accent: 'violet',
  capabilities: [
    { icon: '🎯', title: 'Audience Architecture', description: 'Custom, Lookalike, and interest stacks built from your first-party data — targeting the exact customer your product was built for.' },
    { icon: '🖼️', title: 'Creative Testing Systems', description: 'Structured A/B and multivariate creative tests across hooks, formats, and CTAs — letting data pick the winner, not opinions.' },
    { icon: '📈', title: 'Full-Funnel Attribution', description: 'Pixel health audits, Conversions API setup, and UTM architecture for accurate attribution in a post-iOS14 world.' },
  ],
  process: [
    { number: '01', title: 'Account Audit', description: 'Full audit of pixel setup, attribution, campaign structure, and creative performance history.', motifProgress: 0 },
    { number: '02', title: 'Funnel Architecture', description: 'Top/middle/bottom funnel campaign structure with audience segments mapped to each stage.', motifProgress: 0.33 },
    { number: '03', title: 'Creative Launch', description: 'Multiple creative variants launched simultaneously with structured naming conventions for clean testing.', motifProgress: 0.66 },
    { number: '04', title: 'Optimize & Scale', description: 'Weekly bid, budget, and creative refresh cycles — scaling winners, cutting losers, expanding to new audiences.', motifProgress: 1 },
  ],
  filters: ['All', 'Lead Gen', 'E-com/Catalog', 'Retargeting', 'UGC'],
  portfolio: [
    { id: 'meta-1', title: 'E-Commerce Catalog Ads — Fashion', client: 'Sample / Concept — Fashion E-Commerce', niche: 'Fashion', filter: 'E-com/Catalog', metric: '5.2x ROAS', thumbnailGradient: 'from-violet-700 to-purple-900', challenge: 'A fashion brand\'s dynamic catalog ads were generating 1.8x ROAS — below the 2.5x break-even threshold. Creative was static and audience targeting was broad.', approach: 'Rebuilt catalog creative templates with lifestyle overlays, restructured audiences around 180-day purchaser lookalikes, and implemented a 7-day recency retargeting sequence.', result: '5.2x ROAS at scale ($15K/mo spend); CPA dropped 38% while maintaining volume.', metrics: [{ label: 'ROAS', value: '5.2x' }, { label: 'CPA Reduction', value: '-38', unit: '%' }, { label: 'Monthly Spend', value: '$15K' }], tools: ['Meta Ads Manager', 'Northbeam', 'Canva', 'Klaviyo'], hasBeforeAfter: false },
    { id: 'meta-2', title: 'Lead Gen Campaigns — Real Estate', client: 'Sample / Concept — Real Estate', niche: 'Real Estate', filter: 'Lead Gen', metric: '−38% CPA', thumbnailGradient: 'from-blue-700 to-indigo-900', challenge: 'A real estate developer\'s lead gen campaigns were generating expensive leads at $84 CPL — the industry average for their market was $45.', approach: 'Rewrote lead form questions to qualify intent, rebuilt audiences around in-market housing signals, and A/B tested 6 creative concepts against the control.', result: 'CPL dropped from $84 to $31 within 60 days; qualified lead quality score (internal) increased from 54% to 79%.', metrics: [{ label: 'CPL Reduction', value: '$84→$31' }, { label: 'Lead Quality Score', value: '79', unit: '%' }, { label: 'Creative Variants Tested', value: '6' }], tools: ['Meta Ads Manager', 'Zapier', 'HubSpot'], hasBeforeAfter: false },
    { id: 'meta-3', title: 'UGC-Style Retargeting — Supplements', client: 'Sample / Concept — Health Supplements', niche: 'Supplements', filter: 'UGC', metric: '2.1% CTR', thumbnailGradient: 'from-green-700 to-emerald-900', challenge: 'A supplement brand\'s retargeting ads had exhausted their creative and were seeing severe ad fatigue — CTR had fallen from 1.9% to 0.4% over 6 weeks.', approach: 'Produced 12 UGC-style video ads with 4 different hooks, introduced a 3-day creative rotation rule, and segmented audiences by days-since-visit.', result: 'Average CTR across retargeting campaigns returned to 2.1%; ROAS on retargeting improved from 2.1x to 7.4x.', metrics: [{ label: 'CTR', value: '2.1', unit: '%' }, { label: 'Retargeting ROAS', value: '7.4x' }, { label: 'UGC Variants', value: '12' }], tools: ['Meta Ads Manager', 'MotionApp', 'CapCut'], hasBeforeAfter: false },
  ],
  faq: [
    { question: 'What ROAS can I expect?', answer: 'ROAS varies significantly by product, margin, AOV, and funnel maturity. Reference benchmarks for well-managed Meta accounts sit between 2.5x–6x for e-commerce. We set honest projections after reviewing your account data and margins — not before.' },
    { question: 'Do you manage the ad spend directly?', answer: 'No — ad spend is managed through your own Meta Business Manager account. We manage campaigns on your behalf, but the budget stays under your control and is billed directly to your card.' },
    { question: 'What is your management fee structure?', answer: 'We charge a flat management fee starting at $399/mo. This is separate from your ad spend. Multi-platform bundles receive a 10–15% discount on management fees.' },
    { question: 'How do you handle iOS14+ attribution issues?', answer: 'We implement Meta\'s Conversions API alongside the pixel for server-side attribution, configure aggregated event measurement, and use multi-touch attribution tools for a full picture beyond what Meta reports natively.' },
  ],
  relatedSlugs: ['tiktok-ads', 'google-ads', 'social-media-marketing'],
  pricing: {
    usd: 'From $399',
    pkr: '₨112,000',
    period: '/mo + ad spend',
    note: 'Multi-platform bundle: 10–15% off management fees.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. TIKTOK ADS
// ─────────────────────────────────────────────────────────────────────────────
const tiktokAds: ServiceData = {
  slug: 'tiktok-ads',
  name: 'TikTok Ads',
  headline: 'Native creative that earns the click.',
  subheadline: 'TikTok-first performance campaigns.',
  motifKey: 'TiktokAdsMotif',
  accent: 'cyan',
  capabilities: [
    { icon: '🎬', title: 'TikTok-Native Creative', description: 'Ads that feel organic — not banner ads repurposed for vertical video. Built for the scroll behavior of TikTok\'s algorithm.' },
    { icon: '🛍️', title: 'TikTok Shop Integration', description: 'Product catalog setup, affiliate creator programs, and in-app purchase optimization for TikTok Shop.' },
    { icon: '⚡', title: 'Spark Ads & UGC', description: 'Boost authentic creator content as Spark Ads — the highest-trust paid format on TikTok.' },
  ],
  process: [
    { number: '01', title: 'Creative Strategy', description: 'Trend audit, competitor analysis, and a hook-first creative brief tailored to TikTok scroll behavior.', motifProgress: 0 },
    { number: '02', title: 'Production', description: 'UGC-style and produced video assets created with correct aspect ratios, captions, and native aesthetic.', motifProgress: 0.33 },
    { number: '03', title: 'Campaign Launch', description: 'Ad sets structured around broad, interest, and behavioral audiences with TopView and In-Feed placements tested.', motifProgress: 0.66 },
    { number: '04', title: 'Iterate & Scale', description: 'Hook and thumbnail testing cycles every 2 weeks; winning creatives scaled, losing ones replaced.', motifProgress: 1 },
  ],
  filters: ['All', 'Spark Ads', 'UGC', 'TikTok Shop', 'Top-View'],
  portfolio: [
    { id: 'tt-1', title: 'TikTok Shop Launch — Beauty Brand', client: 'Sample / Concept — Beauty', niche: 'Beauty/DTC', filter: 'TikTok Shop', metric: '4.1x ROAS', thumbnailGradient: 'from-cyan-600 to-teal-900', challenge: 'A beauty brand launching TikTok Shop had no presence on the platform and zero creator relationships.', approach: 'Onboarded 12 affiliate creators in the beauty niche, produced 8 brand-side UGC videos, and launched with a coordinated TikTok Shop sale event.', result: '4.1x ROAS on TikTok Shop in the first 30 days; affiliate creators drove 62% of attributed sales.', metrics: [{ label: 'ROAS', value: '4.1x' }, { label: 'Affiliate Sales Share', value: '62', unit: '%' }, { label: 'Creators Onboarded', value: '12' }], tools: ['TikTok Ads Manager', 'TikTok Creator Marketplace', 'CapCut'], hasBeforeAfter: false },
    { id: 'tt-2', title: 'Spark Ads — DTC Pet Brand', client: 'Sample / Concept — Pet Products', niche: 'Pet/DTC', filter: 'Spark Ads', metric: '$6.40 CPM', thumbnailGradient: 'from-orange-600 to-amber-900', challenge: 'A pet brand had organic TikTok posts going viral but no system for converting that attention into sales.', approach: 'Whitelisted 6 top-performing organic posts as Spark Ads, targeted pet-owner behavioral segments, and added a shop link to each.', result: '$6.40 CPM (vs. $14 industry benchmark) and 3.8x ROAS on converted Spark Ad traffic.', metrics: [{ label: 'CPM', value: '$6.40' }, { label: 'Industry CPM Benchmark', value: '$14' }, { label: 'ROAS', value: '3.8x' }], tools: ['TikTok Ads Manager'], hasBeforeAfter: false },
  ],
  faq: [
    { question: 'How is TikTok different from Meta Ads?', answer: 'TikTok rewards entertainment-first creative — ads that don\'t look like ads. Creative velocity (quantity of variants) matters more on TikTok than on Meta, and audiences tend to be younger and more mobile-native.' },
    { question: 'What is a Spark Ad?', answer: 'Spark Ads allow you to boost existing organic TikTok posts (your own or a creator\'s, with permission) as paid ads. Because they look like organic posts, they typically achieve lower CPMs and higher trust than standard In-Feed ads.' },
    { question: 'Do I need TikTok Shop to run TikTok Ads?', answer: 'No — TikTok Ads work with any landing page or website. TikTok Shop is an optional in-app purchase feature that can significantly improve conversion rates for physical products by removing friction from the path to purchase.' },
  ],
  relatedSlugs: ['meta-ads', 'youtube-ads', 'social-media-marketing'],
  pricing: {
    usd: 'From $449',
    pkr: '₨126,000',
    period: '/mo + ad spend',
    note: 'Multi-platform bundle: 10–15% off management fees.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. YOUTUBE ADS
// ─────────────────────────────────────────────────────────────────────────────
const youtubeAds: ServiceData = {
  slug: 'youtube-ads',
  name: 'YouTube Ads',
  headline: 'Attention that compounds.',
  subheadline: 'Video ads built for the long game.',
  motifKey: 'YoutubeAdsMotif',
  accent: 'gold',
  capabilities: [
    { icon: '▶️', title: 'Skippable & Non-Skip Strategy', description: 'The right format for the right funnel stage — bumpers for awareness, skippable for consideration, non-skip for high-intent retargeting.' },
    { icon: '🎥', title: 'YouTube Shorts Ads', description: 'Vertical short-form ads native to Shorts placement — the fastest-growing ad format on the platform.' },
    { icon: '📊', title: 'Brand Lift Measurement', description: 'Google Brand Lift studies for campaigns above threshold — measuring actual recall and consideration lift, not just clicks.' },
  ],
  process: [
    { number: '01', title: 'Creative Brief', description: 'Hook-first script structure designed to capture attention in the first 5 seconds — before the skip option appears.', motifProgress: 0 },
    { number: '02', title: 'Video Production', description: 'YouTube-format video assets produced or reviewed in 16:9 and 9:16 for Shorts, with captions and end screens.', motifProgress: 0.33 },
    { number: '03', title: 'Targeting Setup', description: 'Custom intent audiences, in-market segments, and YouTube channel targeting for precise reach.', motifProgress: 0.66 },
    { number: '04', title: 'Optimize & Report', description: 'View rate, CPV, and conversion optimization weekly; monthly brand lift and awareness reporting.', motifProgress: 1 },
  ],
  filters: ['All', 'In-stream', 'Shorts', 'Bumper', 'Discovery'],
  portfolio: [
    { id: 'yt-1', title: 'Skippable In-Stream — SaaS Launch', client: 'Sample / Concept — SaaS', niche: 'SaaS', filter: 'In-stream', metric: '32% view rate', thumbnailGradient: 'from-red-700 to-orange-900', challenge: 'A SaaS tool launching via YouTube needed to reach a specific professional audience — marketing managers at companies with 50–500 employees.', approach: 'Custom intent audience built from competitor search terms, product review queries, and G2/Capterra research keywords. Hook scripted as a problem-statement format for maximum 5-second retention.', result: '32% view rate (vs. 15% category benchmark); 4.8x brand lift in awareness surveys.', metrics: [{ label: 'View Rate', value: '32', unit: '%' }, { label: 'Brand Lift', value: '4.8x' }, { label: 'CPV', value: '$0.04' }], tools: ['Google Ads', 'YouTube Studio', 'Wistia'], hasBeforeAfter: false },
    { id: 'yt-2', title: 'YouTube Shorts Ads — E-Commerce', client: 'Sample / Concept — Consumer Electronics', niche: 'Electronics/E-com', filter: 'Shorts', metric: '$0.04 CPV', thumbnailGradient: 'from-yellow-600 to-amber-900', challenge: 'An electronics brand needed to drive product awareness among 18–34 year olds at the lowest possible CPV.', approach: 'Produced 6 vertical Shorts-format ads (15s each) with product-first hooks and tight CTA windows; A/B tested 3 different visual styles.', result: '$0.04 CPV average (61% below industry baseline); top-performing Shorts ad achieved 44% view completion rate.', metrics: [{ label: 'CPV', value: '$0.04' }, { label: 'vs. Baseline', value: '-61', unit: '%' }, { label: 'Completion Rate', value: '44', unit: '%' }], tools: ['Google Ads', 'CapCut'], hasBeforeAfter: false },
  ],
  faq: [
    { question: 'What is the minimum budget for YouTube Ads?', answer: 'YouTube Ads can technically start at any budget, but meaningful data (for optimization) typically requires $1,500–$3,000/mo in ad spend. We recommend a minimum of $2,500/mo to run proper creative tests.' },
    { question: 'Do you produce the video creative?', answer: 'We can advise on script and structure, and work with your existing video assets. Full video production is available as an add-on service. For Shorts, we can produce from raw footage or briefed UGC.' },
    { question: 'How does YouTube Ads differ from social video ads?', answer: 'YouTube audiences are in a lean-back, longer-form viewing mindset compared to social scrollers. This means longer hooks work, brand storytelling is more effective, and retargeting qualified viewers generates high conversion rates.' },
  ],
  relatedSlugs: ['meta-ads', 'tiktok-ads', 'google-ads'],
  pricing: {
    usd: 'From $449',
    pkr: '₨126,000',
    period: '/mo + ad spend',
    note: 'Multi-platform bundle: 10–15% off management fees.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. GOOGLE ADS
// ─────────────────────────────────────────────────────────────────────────────
const googleAds: ServiceData = {
  slug: 'google-ads',
  name: 'Google Ads',
  headline: 'Capture demand at the exact moment.',
  subheadline: 'Intent-first PPC, fully managed.',
  motifKey: 'GoogleAdsMotif',
  accent: 'cyan',
  capabilities: [
    { icon: '🔍', title: 'Search Intent Mapping', description: 'Keyword segmentation by commercial, transactional, and navigational intent — every search query matched to the right bid and ad.' },
    { icon: '🛒', title: 'Google Shopping & PMax', description: 'Product feed optimization, Performance Max campaign architecture, and Shopping campaign structure for e-commerce.' },
    { icon: '🔁', title: 'Remarketing & Display', description: 'Custom audience segments and visually compelling display creative to re-engage high-intent visitors.' },
  ],
  process: [
    { number: '01', title: 'Account Audit', description: 'Keyword quality audit, Quality Score review, conversion tracking verification, and wasted spend identification.', motifProgress: 0 },
    { number: '02', title: 'Campaign Architecture', description: 'Rebuild or restructure campaign hierarchy: Search, Shopping, Display, and PMax with proper segmentation.', motifProgress: 0.33 },
    { number: '03', title: 'Ad Copy & Extensions', description: 'Responsive search ads with 15+ headline/description variants, all extension types configured.', motifProgress: 0.66 },
    { number: '04', title: 'Bid & Budget Optimization', description: 'Smart bidding strategy calibration, budget allocation by campaign performance, and weekly optimization cadence.', motifProgress: 1 },
  ],
  filters: ['All', 'Search', 'Shopping', 'Performance Max', 'Display', 'Remarketing'],
  portfolio: [
    { id: 'ga-1', title: 'Google Shopping — Home Goods', client: 'Sample / Concept — Home Goods E-Commerce', niche: 'E-Commerce', filter: 'Shopping', metric: '6.1x ROAS', thumbnailGradient: 'from-blue-700 to-cyan-900', challenge: 'A home goods brand\'s Shopping campaigns were generating 1.9x ROAS — healthy products buried under a poorly structured feed with missing attributes.', approach: 'Rebuilt the product feed with all required and recommended attributes, implemented a campaign segmentation by product margin tier, and launched a dedicated PMax campaign for top-sellers.', result: '6.1x ROAS within 90 days; impression share increased from 14% to 38%.', metrics: [{ label: 'ROAS', value: '6.1x' }, { label: 'Impression Share', value: '14%→38%' }, { label: 'CPC', value: '$1.20' }], tools: ['Google Ads', 'Merchant Center', 'DataFeedWatch'], hasBeforeAfter: false },
    { id: 'ga-2', title: 'Search Campaigns — Legal Services', client: 'Sample / Concept — Legal Services', niche: 'Professional Services', filter: 'Search', metric: '8.4% conversion rate', thumbnailGradient: 'from-indigo-700 to-violet-900', challenge: 'A personal injury law firm was spending $12K/mo on Google Search with a 1.2% conversion rate — below the legal services benchmark of 4%.', approach: 'Restructured ad groups by practice area, rewrote all ad copy with emotional hooks, added negative keywords (removing 840 irrelevant query types), and rebuilt the landing page for conversion.', result: 'Conversion rate increased from 1.2% to 8.4%; cost-per-lead dropped from $320 to $88.', metrics: [{ label: 'Conversion Rate', value: '8.4', unit: '%' }, { label: 'Cost Per Lead', value: '$320→$88' }, { label: 'Negative Keywords Added', value: '840' }], tools: ['Google Ads', 'Google Analytics 4', 'Unbounce'], hasBeforeAfter: false },
    { id: 'ga-3', title: 'Performance Max — Supplement Brand', client: 'Sample / Concept — Health Supplements', niche: 'E-Commerce', filter: 'Performance Max', metric: '+34% revenue', thumbnailGradient: 'from-green-700 to-teal-900', challenge: 'A supplement brand wanted to expand from manual Search campaigns into Performance Max but feared losing control of budget allocation.', approach: 'Launched PMax with tightly structured asset groups by product category, seeded with high-performing search audiences as signals, and maintained parallel Search campaigns for branded queries.', result: 'PMax drove a 34% increase in total Google Ads revenue with an 18% lower CPA than the Search campaigns alone.', metrics: [{ label: 'Revenue Increase', value: '+34', unit: '%' }, { label: 'CPA Improvement', value: '-18', unit: '%' }, { label: 'Asset Groups', value: '8' }], tools: ['Google Ads', 'Google Analytics 4', 'Merchant Center'], hasBeforeAfter: false },
  ],
  faq: [
    { question: 'What is Performance Max and should I use it?', answer: 'Performance Max is Google\'s AI-driven campaign type that shows ads across all Google inventory (Search, Shopping, Display, YouTube, Gmail, Maps). It\'s powerful but requires substantial conversion data (50+ conversions/mo) to optimize effectively. We recommend it as a complement to, not replacement for, manual Search campaigns.' },
    { question: 'How do you handle wasted ad spend?', answer: 'In most accounts we audit, 20–35% of spend is going to irrelevant queries. Our first action in any new account is a negative keyword audit and campaign restructure to stop the bleeding before scaling.' },
    { question: 'Do you manage both ad spend and creative?', answer: 'We manage campaign setup, ad copy, extensions, bidding, and optimization. Creative assets (display banners, video for YouTube) are available as add-ons or provided by your team.' },
  ],
  relatedSlugs: ['meta-ads', 'seo', 'ecommerce-store-setup'],
  pricing: {
    usd: 'From $499',
    pkr: '₨140,000',
    period: '/mo + ad spend',
    note: 'Multi-platform bundle: 10–15% off management fees.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. E-COMMERCE STORE SETUP (Shopify)
// ─────────────────────────────────────────────────────────────────────────────
const ecommerceStoreSetup: ServiceData = {
  slug: 'ecommerce-store-setup',
  name: 'E-Commerce Store Setup',
  headline: 'Launch-ready. Built to scale.',
  subheadline: 'Conversion-first Shopify stores.',
  motifKey: 'EcommerceMotif',
  accent: 'violet',
  capabilities: [
    { icon: '🏪', title: 'Shopify Architecture', description: 'Store structure, navigation, and product organization designed for maximum discoverability and minimum friction to purchase.' },
    { icon: '⚡', title: 'Conversion Optimization', description: 'Every element — from product page layout to checkout flow — engineered for conversion rate, not just aesthetics.' },
    { icon: '🚀', title: 'App & Integration Stack', description: 'The right apps selected and configured: reviews, upsells, email capture, analytics, and fulfillment integrations.' },
  ],
  process: [
    { number: '01', title: 'Discovery & Scope', description: 'Brand brief, product catalog review, competitor store analysis, and feature requirements documentation.', motifProgress: 0 },
    { number: '02', title: 'Design & Wireframe', description: 'Homepage, PDP, collection, and checkout wireframes — approved before any development begins.', motifProgress: 0.25 },
    { number: '03', title: 'Development', description: 'Shopify theme setup or custom build, product import, app configuration, and payment gateway integration.', motifProgress: 0.5 },
    { number: '04', title: 'QA & Launch', description: 'Cross-browser and mobile testing, checkout flow testing, speed optimization, and SEO metadata setup.', motifProgress: 0.75 },
    { number: '05', title: 'Post-Launch Support', description: '30-day post-launch support window for bug fixes, adjustments, and team training.', motifProgress: 1 },
  ],
  filters: ['All', 'Fashion', 'Beauty', 'Electronics', 'Food & Beverage', 'Niche/DTC'],
  portfolio: [
    { id: 'ec-1', title: 'DTC Skincare Store Launch', client: 'Sample / Concept — Beauty / Skincare', niche: 'Beauty', filter: 'Beauty', metric: '4.2% conversion rate', thumbnailGradient: 'from-rose-700 to-pink-900', challenge: 'A skincare startup needed a Shopify store launched in under 14 days for a product launch tied to a PR moment.', approach: 'Used a pre-built premium theme as the foundation, customized heavily for brand identity, configured subscription bundles, and implemented a one-page checkout.', result: 'Launched in 11 days; achieved 4.2% conversion rate from day 1 traffic and a 92 Lighthouse performance score.', metrics: [{ label: 'Conversion Rate', value: '4.2', unit: '%' }, { label: 'Lighthouse Score', value: '92' }, { label: 'Launch Time', value: '11', unit: 'days' }], tools: ['Shopify', 'Recharge', 'Klaviyo', 'Gorgias'], hasBeforeAfter: true, beforeLabel: 'Wireframe', afterLabel: 'Live Store' },
    { id: 'ec-2', title: 'Fashion Multi-Collection Store', client: 'Sample / Concept — Fashion Apparel', niche: 'Fashion', filter: 'Fashion', metric: '98 Lighthouse score', thumbnailGradient: 'from-slate-700 to-gray-900', challenge: 'A fashion brand with 6 distinct collections needed filtering, lookbook pages, and video-heavy product pages that still loaded fast.', approach: 'Custom Shopify 2.0 theme built from scratch with lazy-loaded media, infinite scroll collection pages, and a lookbook page template.', result: '98 Lighthouse score; 0.8s LCP; average session duration 2x industry benchmark.', metrics: [{ label: 'Lighthouse Score', value: '98' }, { label: 'LCP', value: '0.8', unit: 's' }, { label: 'Session Duration', value: '2x avg.' }], tools: ['Shopify 2.0', 'Figma', 'WebPageTest'], hasBeforeAfter: false },
    { id: 'ec-3', title: 'F&B Subscription Box Store', client: 'Sample / Concept — Food & Beverage', niche: 'Food/DTC', filter: 'Food & Beverage', metric: '+180% AOV', thumbnailGradient: 'from-amber-700 to-yellow-900', challenge: 'A subscription food box brand needed to upsell one-time purchasers to subscriptions and increase average order value through bundle offers.', approach: 'Implemented Recharge subscription, a bundle builder app with volume discounts, and a post-purchase upsell flow with 3-step AOV optimization.', result: 'Average order value increased 180%; subscription to one-time purchase ratio shifted from 20:80 to 55:45.', metrics: [{ label: 'AOV Increase', value: '+180', unit: '%' }, { label: 'Subscription Rate', value: '55', unit: '%' }, { label: 'Upsell Acceptance', value: '34', unit: '%' }], tools: ['Shopify', 'Recharge', 'ReConvert', 'Bold Bundles'], hasBeforeAfter: false },
  ],
  faq: [
    { question: 'Do you only build on Shopify?', answer: 'Shopify is our primary platform and where we have the deepest expertise. We can also work with WooCommerce and Webflow Commerce for specific use cases, but recommend Shopify for most DTC brands.' },
    { question: 'What is included in the launch package?', answer: 'Theme setup/customization, product import (up to 100 SKUs), payment gateway configuration, essential apps (reviews, email capture), basic SEO metadata, and 30 days of post-launch support.' },
    { question: 'How long does the build take?', answer: 'Standard builds: 7–14 days. Custom builds with bespoke design: 3–6 weeks. Timeline depends on content and product data readiness on your end.' },
    { question: 'Do you offer ongoing Shopify maintenance?', answer: 'Yes — we offer monthly maintenance retainers covering app updates, conversion optimization, and feature additions. Pricing on request.' },
  ],
  relatedSlugs: ['website-development', 'amazon-ebay-etsy', 'google-ads'],
  pricing: {
    usd: 'Starting at $899',
    pkr: '₨252,000',
    period: 'one-time',
    tiers: [
      { name: 'Starter', usd: '$899', pkr: '₨252,000' },
      { name: 'Professional', usd: '$1,499', pkr: '₨420,000' },
      { name: 'Custom', usd: 'From $2,499', pkr: 'From ₨700,000' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. AMAZON / EBAY / ETSY
// ─────────────────────────────────────────────────────────────────────────────
const amazonEbayEtsy: ServiceData = {
  slug: 'amazon-ebay-etsy',
  name: 'Amazon / eBay / Etsy',
  headline: 'Marketplace-ready from day one.',
  subheadline: 'Setup, compliant, optimized.',
  motifKey: 'MarketplaceMotif',
  accent: 'gold',
  capabilities: [
    { icon: '🏆', title: 'Account Setup & Compliance', description: 'Full account creation, verification, and policy compliance review — avoiding the pitfalls that get new sellers suspended.' },
    { icon: '📦', title: 'Listing Creation & Optimization', description: 'Keyword-rich titles, bullet points, descriptions, and backend search terms built to rank in marketplace search.' },
    { icon: '📊', title: 'Multi-Channel Synchronization', description: 'Inventory, pricing, and order management synchronized across all active marketplaces.' },
  ],
  process: [
    { number: '01', title: 'Account Setup', description: 'Account creation, business verification, category approval, and brand registry enrollment (where applicable).', motifProgress: 0 },
    { number: '02', title: 'Listing Build', description: 'Full listing creation: titles, bullets, descriptions, backend keywords, and category/attribute mapping.', motifProgress: 0.33 },
    { number: '03', title: 'Image Preparation', description: 'Main image compliance review (white background, zoom-ready) and A+ content recommendations.', motifProgress: 0.66 },
    { number: '04', title: 'Launch & Monitor', description: 'Launch review, initial ranking checks, and first-30-days health score monitoring.', motifProgress: 1 },
  ],
  filters: ['All', 'Amazon', 'eBay', 'Etsy', 'Multi-channel'],
  portfolio: [
    { id: 'mkt-1', title: 'Amazon Launch — Kitchen Gadgets', client: 'Sample / Concept — Kitchen & Home', niche: 'Kitchen/Home', filter: 'Amazon', metric: 'Top 3% BSR', thumbnailGradient: 'from-orange-600 to-yellow-900', challenge: 'A kitchen gadget brand entering Amazon with 12 SKUs needed account setup, brand registry, and full listing creation in under 30 days.', approach: 'Account setup with brand registry enrolled, all 12 listings created with PPC-ready keyword sets, and A+ content for the 3 hero products.', result: 'All 12 products live within 28 days; top-selling product reached top 3% BSR in its subcategory within 60 days.', metrics: [{ label: 'BSR Rank', value: 'Top 3%' }, { label: 'Products Launched', value: '12' }, { label: 'Account Health', value: '100', unit: '%' }], tools: ['Seller Central', 'Helium 10', 'Jungle Scout'], hasBeforeAfter: false },
    { id: 'mkt-2', title: 'Etsy Shop Launch — Handmade Jewelry', client: 'Sample / Concept — Handmade / Crafts', niche: 'Jewelry/Handmade', filter: 'Etsy', metric: '+220% sales in 60 days', thumbnailGradient: 'from-teal-700 to-emerald-900', challenge: 'A jewelry maker had an Etsy shop with 40 listings but was generating almost no organic traffic due to poor titles and no SEO strategy.', approach: 'Rewrote all 40 listings with Etsy search-optimized titles (up to 140 characters), relevant tags, and category/attribute optimization.', result: '220% sales increase within 60 days of relisting; shop moved from page 8 to page 1 for 6 core keywords.', metrics: [{ label: 'Sales Increase', value: '+220', unit: '%' }, { label: 'Listings Optimized', value: '40' }, { label: 'Page 1 Keywords', value: '6' }], tools: ['Etsy Seller Hub', 'Marmalead', 'EtsyRank'], hasBeforeAfter: false },
    { id: 'mkt-3', title: 'Multi-Channel Setup — Fitness Equipment', client: 'Sample / Concept — Fitness / Sports', niche: 'Fitness', filter: 'Multi-channel', metric: '3 marketplaces, 1 system', thumbnailGradient: 'from-blue-700 to-indigo-900', challenge: 'A fitness equipment brand wanted to sell on Amazon, eBay, and their own Shopify store simultaneously, but feared inventory chaos and overselling.', approach: 'Implemented a multi-channel listing software (Linnworks) with centralized inventory, created platform-specific listings optimized for each marketplace\'s search algorithm.', result: 'All 3 channels live in 30 days; zero oversell incidents in first 90 days of operation.', metrics: [{ label: 'Channels Live', value: '3' }, { label: 'Oversell Incidents', value: '0' }, { label: 'Setup Time', value: '30', unit: 'days' }], tools: ['Linnworks', 'Seller Central', 'eBay Seller Hub', 'Shopify'], hasBeforeAfter: false },
  ],
  faq: [
    { question: 'Can you set up accounts in countries other than the US?', answer: 'Yes — we\'ve set up accounts across Amazon US, UK, CA, AU, UAE, and the EU marketplaces. International setup may require additional entity verification documents.' },
    { question: 'Do you handle brand registry enrollment on Amazon?', answer: 'Yes — brand registry requires an active trademark, which we can guide you through applying for. Enrollment itself typically takes 2–5 business days once trademark verification is confirmed.' },
    { question: 'What is included in a "marketplace setup"?', answer: 'Account creation/verification, category approval (where needed), brand registry (if applicable), up to 10 initial listings fully optimized, and a post-launch health review at day 30.' },
  ],
  relatedSlugs: ['product-listing', 'product-listing-optimization', 'a-plus-content'],
  pricing: {
    usd: 'Starting at $349',
    pkr: '₨98,000',
    period: 'per marketplace',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 11. WEBSITE DEVELOPMENT
// ─────────────────────────────────────────────────────────────────────────────
const websiteDevelopment: ServiceData = {
  slug: 'website-development',
  name: 'Website Development',
  headline: 'Sites engineered to convert.',
  subheadline: 'Fast, custom, SEO-ready builds.',
  motifKey: 'WebDevMotif',
  accent: 'cyan',
  capabilities: [
    { icon: '⚡', title: 'Performance-First Engineering', description: 'Core Web Vitals as a requirement, not an afterthought. Every build targets 95+ Lighthouse and sub-2s LCP.' },
    { icon: '🔍', title: 'SEO Architecture', description: 'URL structure, schema markup, sitemap, robots.txt, and meta data configured before the first line of copy is written.' },
    { icon: '🎨', title: 'Design-to-Code Precision', description: 'Pixel-perfect implementation of approved designs — no template constraints, no visual compromise.' },
  ],
  process: [
    { number: '01', title: 'Discovery', description: 'Requirements gathering, tech stack selection, sitemap planning, and project timeline agreement.', motifProgress: 0 },
    { number: '02', title: 'Design Handoff', description: 'Figma files reviewed, component inventory mapped, and design system documented before development starts.', motifProgress: 0.25 },
    { number: '03', title: 'Development', description: 'Component-first build with staging environment, weekly progress updates, and client review checkpoints.', motifProgress: 0.5 },
    { number: '04', title: 'QA & Optimization', description: 'Cross-browser testing, mobile testing, Lighthouse audit, and accessibility (WCAG AA) review.', motifProgress: 0.75 },
    { number: '05', title: 'Launch & Handover', description: 'Production deployment, DNS configuration, analytics setup, and team training session.', motifProgress: 1 },
  ],
  filters: ['All', 'Business', 'E-commerce', 'SaaS/Web App', 'Landing Page', 'Headless'],
  portfolio: [
    { id: 'wd-1', title: 'Headless Commerce — Luxury Fashion', client: 'Sample / Concept — Luxury Fashion', niche: 'E-Commerce', filter: 'Headless', metric: '98 Lighthouse score', thumbnailGradient: 'from-cyan-700 to-blue-900', challenge: 'A luxury fashion brand needed a headless storefront (Shopify backend + custom Next.js frontend) for full design freedom without Shopify theme constraints.', approach: 'Built a Next.js 14 frontend with App Router, Shopify Storefront API, incremental static regeneration for product pages, and a custom animation system for the editorial experience.', result: '98 Lighthouse score; 0.8s LCP; 2.4s TTI on 4G mobile.', metrics: [{ label: 'Lighthouse Score', value: '98' }, { label: 'LCP', value: '0.8', unit: 's' }, { label: 'Conversion Lift', value: '+180', unit: '%' }], tools: ['Next.js 14', 'Shopify Storefront API', 'TypeScript', 'Tailwind', 'Vercel'], hasBeforeAfter: false },
    { id: 'wd-2', title: 'SaaS Landing Page — B2B Analytics', client: 'Sample / Concept — B2B Analytics SaaS', niche: 'SaaS', filter: 'SaaS/Web App', metric: '+180% conversion lift', thumbnailGradient: 'from-indigo-700 to-purple-900', challenge: 'A B2B analytics SaaS had a conversion rate of 0.8% on their marketing site — below the SaaS benchmark of 2.5%.', approach: 'Rebuilt the site with a problem-first narrative structure, interactive product demo embeds, social proof architecture, and a frictionless trial CTA.', result: 'Conversion rate increased from 0.8% to 3.2% within 45 days of launch — a 300% improvement.', metrics: [{ label: 'Conversion Rate', value: '0.8%→3.2%' }, { label: 'Trial Signups', value: '+300', unit: '%' }, { label: 'Lighthouse Score', value: '96' }], tools: ['Next.js', 'Framer Motion', 'Vercel', 'HubSpot'], hasBeforeAfter: true, beforeLabel: 'Old site: 0.8% CVR', afterLabel: 'New site: 3.2% CVR' },
    { id: 'wd-3', title: 'Business Website — Architecture Firm', client: 'Sample / Concept — Architecture', niche: 'Professional Services', filter: 'Business', metric: '0.8s LCP', thumbnailGradient: 'from-gray-700 to-slate-900', challenge: 'A high-end architecture firm\'s website took 8.4 seconds to load due to unoptimized image delivery and a bloated WordPress install.', approach: 'Rebuilt on Next.js with sharp image optimization, a CDN-first media strategy, and a custom portfolio gallery with infinite scroll and dynamic filtering.', result: 'LCP reduced from 8.4s to 0.8s; inquiry form submissions increased 140% in the first quarter.', metrics: [{ label: 'LCP', value: '0.8', unit: 's' }, { label: 'Inquiry Submissions', value: '+140', unit: '%' }, { label: 'Lighthouse Score', value: '99' }], tools: ['Next.js', 'Cloudinary', 'Vercel', 'Sanity CMS'], hasBeforeAfter: false },
  ],
  faq: [
    { question: 'What tech stack do you build with?', answer: 'Our primary stack is Next.js 14 (App Router) + TypeScript + Tailwind CSS, deployed on Vercel. For CMS-driven sites, we integrate Sanity or Contentful. For e-commerce, we use Shopify Storefront API or WooCommerce.' },
    { question: 'Do you offer website maintenance?', answer: 'Yes — monthly maintenance retainers include dependency updates, performance monitoring, bug fixes, and minor content updates. Pricing starts at $199/mo.' },
    { question: 'Can you take over an existing website?', answer: 'Yes — we can audit, optimize, and iteratively improve existing sites, or conduct a full rebuild where the technical debt makes improvement more expensive than starting fresh.' },
    { question: 'Is accessibility included?', answer: 'WCAG AA compliance is standard on all our builds — focus states, alt text, ARIA labels, and color contrast ratios are checked as part of our QA process.' },
  ],
  relatedSlugs: ['website-designing', 'seo', 'ecommerce-store-setup'],
  pricing: {
    usd: 'Starting at $999',
    pkr: '₨280,000',
    period: 'one-time',
    tiers: [
      { name: 'Business Site', usd: '$999', pkr: '₨280,000' },
      { name: 'E-Commerce', usd: '$1,999', pkr: '₨560,000' },
      { name: 'SaaS / Web App', usd: 'Custom Quote', pkr: 'Custom Quote' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. WEBSITE DESIGNING (UI/UX)
// ─────────────────────────────────────────────────────────────────────────────
const websiteDesigning: ServiceData = {
  slug: 'website-designing',
  name: 'Website Designing',
  headline: 'Design that performs, not just appears.',
  subheadline: 'UX that guides the click.',
  motifKey: 'WebDesignMotif',
  accent: 'violet',
  capabilities: [
    { icon: '🎨', title: 'UX Research & Wireframing', description: 'User journey mapping, wireframes, and information architecture reviewed before pixel-perfect design begins.' },
    { icon: '✨', title: 'High-Fidelity UI Design', description: 'Figma-based designs with component libraries, responsive breakpoints, and interactive prototypes.' },
    { icon: '📱', title: 'Design System Creation', description: 'Scalable design tokens, component libraries, and documentation — so your team can build consistently after handoff.' },
  ],
  process: [
    { number: '01', title: 'UX Discovery', description: 'User persona definition, competitor UX audit, and user flow mapping for all key conversion paths.', motifProgress: 0 },
    { number: '02', title: 'Wireframes', description: 'Low-fidelity wireframes for all pages, approved before visual design begins.', motifProgress: 0.33 },
    { number: '03', title: 'Visual Design', description: 'High-fidelity Figma screens with brand-aligned visual system, component library, and interactive prototypes.', motifProgress: 0.66 },
    { number: '04', title: 'Developer Handoff', description: 'Design tokens, spacing system, and Figma Dev Mode handoff with all states and responsive breakpoints documented.', motifProgress: 1 },
  ],
  filters: ['All', 'Web UI', 'Mobile App', 'Dashboard/SaaS', 'Design System'],
  portfolio: [
    { id: 'ui-1', title: 'SaaS Dashboard Design — Analytics Platform', client: 'Sample / Concept — Analytics SaaS', niche: 'SaaS', filter: 'Dashboard/SaaS', metric: '94 usability score', thumbnailGradient: 'from-violet-700 to-indigo-900', challenge: 'A data analytics platform\'s dashboard had a 34% day-7 retention rate — users weren\'t finding the features that delivered value.', approach: 'User interviews identified a discovery problem — key features were 4+ clicks deep. We redesigned the navigation IA and surfaced the 5 most-used features in a persistent sidebar.', result: 'Usability score improved from 62 to 94 in post-launch testing; day-7 retention increased from 34% to 61%.', metrics: [{ label: 'Usability Score', value: '94' }, { label: 'Day-7 Retention', value: '34%→61%' }, { label: 'Screens Designed', value: '48' }], tools: ['Figma', 'Maze', 'UserTesting'], hasBeforeAfter: true, beforeLabel: 'Before: 4-click feature access', afterLabel: 'After: 1-click persistent sidebar' },
    { id: 'ui-2', title: 'Mobile App UI — Fitness Tracker', client: 'Sample / Concept — Health & Fitness', niche: 'Mobile App', filter: 'Mobile App', metric: '48 prototype screens', thumbnailGradient: 'from-green-700 to-cyan-900', challenge: 'A fitness app startup needed a complete UI design for their iOS app — from onboarding to daily tracking to social features.', approach: 'Designed a 48-screen complete UI in Figma, including a component library of 120+ elements and an interactive prototype for investor demo and developer handoff.', result: 'Full design system delivered in 3 weeks; developer team reported 40% faster build time due to design token implementation.', metrics: [{ label: 'Screens Designed', value: '48' }, { label: 'Component Library', value: '120+', unit: 'elements' }, { label: 'Build Time Saved', value: '40', unit: '%' }], tools: ['Figma', 'Principle', 'Lottie'], hasBeforeAfter: false },
    { id: 'ui-3', title: 'E-Commerce Redesign — Fashion', client: 'Sample / Concept — Fashion E-Commerce', niche: 'E-Commerce', filter: 'Web UI', metric: '+62% add-to-cart rate', thumbnailGradient: 'from-rose-700 to-pink-900', challenge: 'A fashion e-commerce store had a high bounce rate on product pages — customers were viewing but not adding to cart.', approach: 'Redesigned the product detail page with above-the-fold size selector, persistent add-to-cart CTA on scroll, trust signals (reviews, returns policy), and social proof carousel.', result: 'Add-to-cart rate increased 62%; product page bounce rate dropped from 71% to 44%.', metrics: [{ label: 'Add-to-Cart Rate', value: '+62', unit: '%' }, { label: 'Bounce Rate', value: '71%→44%' }, { label: 'Revision Rounds', value: '3' }], tools: ['Figma', 'Hotjar', 'Google Optimize'], hasBeforeAfter: true, beforeLabel: 'Before: scattered CTA, no trust signals', afterLabel: 'After: persistent CTA, full social proof' },
  ],
  faq: [
    { question: 'Do you design in Figma?', answer: 'Yes — all designs are delivered as Figma files with organized frames, auto-layout components, and named layers. Developer handoff includes Figma Dev Mode access.' },
    { question: 'How many revision rounds are included?', answer: 'Three rounds of revisions are included in all packages. A revision round covers meaningful direction feedback, not micro-adjustments. Additional rounds are available at an hourly rate.' },
    { question: 'Do you conduct user research?', answer: 'User research (interviews, usability testing) is included in our Professional and Premium packages. Starter packages include competitive UX analysis and best-practice heuristic review.' },
    { question: 'Can you design and hand off to my existing developers?', answer: 'Absolutely — a large share of our design projects are handoff-only, where our developers never touch the build. The Figma handoff is thorough enough for any competent development team to implement accurately.' },
  ],
  relatedSlugs: ['website-development', 'branding', 'logo-creation'],
  pricing: {
    usd: 'Starting at $449',
    pkr: '₨126,000',
    period: 'one-time',
    tiers: [
      { name: 'Starter (5 pages)', usd: '$449', pkr: '₨126,000' },
      { name: 'Professional (15 pages)', usd: '$899', pkr: '₨252,000' },
      { name: 'Design System', usd: '$1,499', pkr: '₨420,000' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 13. BRANDING
// ─────────────────────────────────────────────────────────────────────────────
const branding: ServiceData = {
  slug: 'branding',
  name: 'Branding',
  headline: 'Identity with intent.',
  subheadline: 'A complete system, not just a logo.',
  motifKey: 'BrandingMotif',
  accent: 'gold',
  capabilities: [
    { icon: '🌐', title: 'Brand Strategy', description: 'Positioning, personality, voice, and messaging architecture — the strategic foundations that every visual decision is built on.' },
    { icon: '🎨', title: 'Visual Identity System', description: 'Logo, color palette, typography, photography style, and iconography — a complete visual language, not a logo kit.' },
    { icon: '📖', title: 'Brand Guidelines', description: 'Comprehensive brand book documenting every rule, with real usage examples for digital, print, and environmental applications.' },
  ],
  process: [
    { number: '01', title: 'Brand Strategy', description: 'Positioning workshop, competitor mapping, audience personas, and brand personality definition.', motifProgress: 0 },
    { number: '02', title: 'Visual Exploration', description: 'Moodboards and visual direction concepts — 2-3 territories explored before committing to execution.', motifProgress: 0.25 },
    { number: '03', title: 'Identity Design', description: 'Logo, color, typography, and supporting visual elements designed and tested across real contexts.', motifProgress: 0.5 },
    { number: '04', title: 'System Expansion', description: 'Business cards, social templates, email signatures, and any category-specific collateral designed.', motifProgress: 0.75 },
    { number: '05', title: 'Brand Guidelines Delivery', description: 'Complete brand book in PDF and Figma, plus all master files in every format.', motifProgress: 1 },
  ],
  filters: ['All', 'Startup', 'Rebrand', 'Product Brand', 'Personal Brand', 'Packaging'],
  portfolio: [
    { id: 'br-1', title: 'Full Brand Identity — FinTech Startup', client: 'Sample / Concept — Financial Technology', niche: 'FinTech Startup', filter: 'Startup', metric: '34 brand assets delivered', thumbnailGradient: 'from-gold-600 to-amber-900', challenge: 'A FinTech startup raising a Series A needed a brand identity that communicated trust and innovation simultaneously — to both enterprise clients and retail consumers.', approach: 'Built a dual-audience visual system: a primary identity anchored in deep navy and gold for enterprise seriousness, with a geometric secondary language that communicated digital modernity.', result: '34 brand assets delivered; the brand was cited by the Series A lead investor as a factor in their investment decision.', metrics: [{ label: 'Brand Assets', value: '34' }, { label: 'Brand Guideline Pages', value: '52' }, { label: 'Recognition Lift', value: '+67', unit: '%' }], tools: ['Figma', 'Illustrator', 'InDesign'], hasBeforeAfter: false },
    { id: 'br-2', title: 'Rebrand — Heritage Food Brand', client: 'Sample / Concept — Food & Beverage', niche: 'F&B Rebrand', filter: 'Rebrand', metric: '+67% recognition lift', thumbnailGradient: 'from-amber-600 to-yellow-900', challenge: 'A 40-year-old food brand needed modernization without alienating its existing loyal customer base — a brand evolution, not revolution.', approach: 'Retained the heritage color and a simplified version of the original mark; replaced dated typography with a contemporary craft-food aesthetic and updated packaging templates.', result: 'Brand recognition in new demographic (25–40) increased 67%; existing customer retention remained at 94%.', metrics: [{ label: 'New Demographic Recognition', value: '+67', unit: '%' }, { label: 'Retention Rate', value: '94', unit: '%' }, { label: 'Guideline Pages', value: '38' }], tools: ['Figma', 'Illustrator', 'Photoshop', 'InDesign'], hasBeforeAfter: true, beforeLabel: 'Before: dated heritage mark', afterLabel: 'After: modernized with heritage cues' },
    { id: 'br-3', title: 'Personal Brand — Executive Coach', client: 'Sample / Concept — Professional Services', niche: 'Personal Brand', filter: 'Personal Brand', metric: '52-page brand book', thumbnailGradient: 'from-slate-700 to-gray-900', challenge: 'A senior executive transitioning to coaching needed a personal brand that positioned her above the commodity coaching market.', approach: 'Developed a brand positioning around "precision thinking" — translated into a monochrome visual identity with gold accents, and a content voice framework for LinkedIn and speaking engagements.', result: '52-page brand book delivered; LinkedIn profile revamp using the new brand system achieved a 340% increase in inbound messages in 60 days.', metrics: [{ label: 'Brand Book Pages', value: '52' }, { label: 'LinkedIn Inbound', value: '+340', unit: '%' }, { label: 'Assets Delivered', value: '28' }], tools: ['Figma', 'Illustrator', 'InDesign'], hasBeforeAfter: false },
  ],
  faq: [
    { question: 'What is included in a complete branding package?', answer: 'Logo system (primary, secondary, monogram), color palette with CMYK/RGB/HEX specs, typography system, photography/illustration style guide, business card design, social media templates, and a brand guidelines document. Exact deliverables vary by tier.' },
    { question: 'How is branding different from just getting a logo?', answer: 'A logo is a mark. A brand is a system — it defines not just how you look, but how you sound, what you stand for, and how every touchpoint (digital, print, environmental) is expressed. A strong brand makes every marketing dollar work harder.' },
    { question: 'How long does a full branding project take?', answer: 'Essentials tier: 2–3 weeks. Complete tier: 4–6 weeks. Premium tier with strategy and guidelines: 6–10 weeks. Timelines depend heavily on feedback speed and stakeholder alignment on your end.' },
    { question: 'Can you extend an existing brand instead of replacing it?', answer: 'Yes — brand extension (adding sub-brands, new product lines, or digital-first updates to a heritage identity) is a service we offer. We\'ll audit the existing brand first and recommend whether extension or evolution is the right approach.' },
  ],
  relatedSlugs: ['logo-creation', 'website-designing', 'a-plus-content'],
  pricing: {
    usd: 'Starting at $599',
    pkr: '₨168,000',
    period: 'one-time',
    tiers: [
      { name: 'Essentials', usd: '$599', pkr: '₨168,000' },
      { name: 'Complete', usd: '$999', pkr: '₨280,000' },
      { name: 'Premium', usd: '$1,799', pkr: '₨504,000' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 14. A+ CONTENT (Amazon EBC)
// ─────────────────────────────────────────────────────────────────────────────
const aPlusContent: ServiceData = {
  slug: 'a-plus-content',
  name: 'A+ Content Creation',
  headline: 'Pages that convert, not just describe.',
  subheadline: 'Rufus-AI-ready Enhanced Brand Content.',
  motifKey: 'APlusContentMotif',
  accent: 'cyan',
  capabilities: [
    { icon: '📄', title: 'Enhanced Brand Content', description: 'Module-based A+ layouts that tell a brand story, highlight key benefits, and drive conversion beyond the bullet points.' },
    { icon: '🤖', title: 'AI Search Optimization', description: 'Content structured for Amazon\'s Rufus AI and Alexa — using natural language queries that match how AI reads and ranks.' },
    { icon: '📱', title: 'Mobile-First Design', description: 'A+ modules designed for the 68% of Amazon shoppers who browse on mobile — no desktop-only layouts.' },
  ],
  process: [
    { number: '01', title: 'Product Research', description: 'Competitor A+ audit, customer review mining for key objections, and conversion opportunity identification.', motifProgress: 0 },
    { number: '02', title: 'Content Strategy', description: 'Module selection, information hierarchy, and copy brief aligned to conversion goals.', motifProgress: 0.33 },
    { number: '03', title: 'Design & Copywriting', description: 'High-quality A+ module designs with conversion-focused copy, submitted in Amazon\'s specifications.', motifProgress: 0.66 },
    { number: '04', title: 'Upload & Monitor', description: 'A+ content uploaded to Seller Central, approved, and live. Conversion rate tracking for 30 days post-launch.', motifProgress: 1 },
  ],
  filters: ['All', 'Basic A+', 'Premium A+', 'Brand Story', 'Comparison Module', 'FAQ Module'],
  portfolio: [
    { id: 'aplus-1', title: 'Premium A+ — Skincare Supplement', client: 'Sample / Concept — Health & Beauty', niche: 'Supplements', filter: 'Premium A+', metric: '+18% conversion lift', thumbnailGradient: 'from-teal-700 to-emerald-900', challenge: 'A skincare supplement listing had a 7.2% conversion rate — high traffic but losing sales to competitor listings with stronger visual storytelling.', approach: 'Designed a Premium A+ layout with a full-width hero video module, before/after comparison module, ingredient breakdown, and a 5-star review highlight reel.', result: 'Conversion rate increased from 7.2% to 8.5% — an 18% lift — within 30 days of A+ content going live.', metrics: [{ label: 'Conversion Lift', value: '+18', unit: '%' }, { label: 'A+ Modules', value: '7' }, { label: 'Mobile Score', value: '98' }], tools: ['Seller Central', 'Photoshop', 'Figma'], hasBeforeAfter: true, beforeLabel: 'Before: basic text listing', afterLabel: 'After: Premium A+ with video hero' },
    { id: 'aplus-2', title: 'Brand Story — Pet Food Brand', client: 'Sample / Concept — Pet Products', niche: 'Pet Food', filter: 'Brand Story', metric: '7 modules', thumbnailGradient: 'from-orange-700 to-amber-900', challenge: 'A premium pet food brand needed to communicate their "human-grade ingredients" positioning across a product catalog of 22 SKUs consistently.', approach: 'Created a brand story template that deployed across all 22 ASINs, plus custom A+ for the top 5 hero products with unique comparison and ingredient modules.', result: 'Brand story live across all 22 products; top 5 hero products saw an average 14% conversion lift.', metrics: [{ label: 'Products Updated', value: '22' }, { label: 'Conversion Lift (Top 5)', value: '+14', unit: '%' }, { label: 'Modules per ASIN', value: '7' }], tools: ['Seller Central', 'Photoshop'], hasBeforeAfter: false },
  ],
  faq: [
    { question: 'What is A+ Content and who can use it?', answer: 'A+ Content (formerly Enhanced Brand Content) allows brand-registered Amazon sellers to add rich media — images, comparison charts, text layouts — to product detail pages below the bullet points. It\'s exclusive to brands enrolled in Amazon Brand Registry.' },
    { question: 'What is Premium A+ and how does it differ?', answer: 'Premium A+ unlocks additional module types including full-width hero images, video modules, interactive comparison tables, and enhanced FAQ. It\'s available to sellers who meet Amazon\'s eligibility requirements (typically Brand Store + 15+ published A+ pages). Conversion lifts of up to 20% have been reported by Amazon.' },
    { question: 'How long does A+ content take to go live?', answer: 'Amazon reviews A+ submissions within 7–10 business days. We submit on your behalf and notify you when it goes live.' },
    { question: 'What is Rufus AI optimization?', answer: 'Amazon\'s Rufus AI shopping assistant answers customer questions by drawing from your product content — including A+ modules. We structure your content with natural-language Q&A formatting and explicit claim-evidence patterns to maximize Rufus citations.' },
  ],
  relatedSlugs: ['product-listing', 'product-listing-optimization', 'amazon-ebay-etsy'],
  pricing: {
    usd: 'Starting at $179',
    pkr: '₨50,000',
    period: 'per listing',
    tiers: [
      { name: 'Basic A+', usd: '$179', pkr: '₨50,000' },
      { name: 'Premium A+', usd: '$349', pkr: '₨98,000' },
      { name: 'Brand Story', usd: '$149', pkr: '₨42,000' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 15. PRODUCT LISTING (Creation)
// ─────────────────────────────────────────────────────────────────────────────
const productListing: ServiceData = {
  slug: 'product-listing',
  name: 'Product Listing',
  headline: 'Listings that sell themselves.',
  subheadline: 'Compliant, keyword-rich, complete.',
  motifKey: 'ProductListingMotif',
  accent: 'violet',
  capabilities: [
    { icon: '🔑', title: 'Keyword Research', description: 'PPC-grade keyword sets for each listing — 250+ indexed terms per ASIN with search volume and competition data.' },
    { icon: '✍️', title: 'Conversion Copywriting', description: 'Titles, bullets, and descriptions written for both algorithm indexing and human persuasion — not one at the expense of the other.' },
    { icon: '✅', title: 'Compliance Review', description: 'Every listing reviewed against the latest marketplace policies before submission — preventing suppression and account risk.' },
  ],
  process: [
    { number: '01', title: 'Keyword Research', description: 'Comprehensive keyword research using market-leading tools to identify high-volume, high-converting search terms.', motifProgress: 0 },
    { number: '02', title: 'Copywriting', description: 'Title, 5 bullet points, description, and backend search terms written with keyword density balanced against readability.', motifProgress: 0.5 },
    { number: '03', title: 'Compliance Check', description: 'Full review against the target marketplace\'s policies — category restrictions, prohibited claims, image requirements.', motifProgress: 0.75 },
    { number: '04', title: 'Delivery & Upload', description: 'Flat file upload or manual listing creation, with confirmation screenshot and indexation verification.', motifProgress: 1 },
  ],
  filters: ['All', 'Amazon', 'eBay', 'Etsy', 'Shopify', 'Walmart'],
  portfolio: [
    { id: 'pl-1', title: '50-ASIN Amazon Listing Build', client: 'Sample / Concept — Kitchen Products', niche: 'Kitchen/Home', filter: 'Amazon', metric: '250+ keywords indexed', thumbnailGradient: 'from-violet-700 to-purple-900', challenge: 'A kitchen products brand launching 50 new ASINs on Amazon needed complete listings built from scratch, with consistent brand voice and keyword optimization.', approach: 'Built a keyword matrix for all 50 ASINs, grouped by product subcategory, and wrote listings in batches using a structured template for consistency and speed.', result: 'All 50 listings live within 72 hours; average of 267 indexed keywords per ASIN on day 7.', metrics: [{ label: 'ASINs Listed', value: '50' }, { label: 'Avg. Keywords Indexed', value: '267' }, { label: 'Delivery Time', value: '72', unit: 'hrs' }], tools: ['Helium 10', 'Jungle Scout', 'Seller Central'], hasBeforeAfter: false },
    { id: 'pl-2', title: 'Etsy Bulk Listing — Handmade Ceramics', client: 'Sample / Concept — Handmade Ceramics', niche: 'Handmade/Etsy', filter: 'Etsy', metric: '100% compliance pass', thumbnailGradient: 'from-amber-700 to-orange-900', challenge: 'A ceramics maker with 80 new products needed Etsy listings written for search optimization while maintaining the handmade, artisan voice authentic to the brand.', approach: 'Research-led keyword integration with handcrafted narrative structure — each listing reads as artisan storytelling while containing Etsy\'s full 140-character title and 13 searchable tags.', result: 'All 80 listings passed Etsy compliance review without modification; average position improved to page 2 within 30 days.', metrics: [{ label: 'Listings Created', value: '80' }, { label: 'Compliance Pass Rate', value: '100', unit: '%' }, { label: 'Search Tags Used', value: '13/13' }], tools: ['Marmalead', 'EtsyRank', 'Etsy Seller Hub'], hasBeforeAfter: false },
  ],
  faq: [
    { question: 'What is included in a "product listing"?', answer: 'Each listing includes: keyword-optimized title (within character limits), 5 benefit-first bullet points, long-form description (where applicable), backend search terms, and category/attribute mapping. Image guidance notes are included but not image production.' },
    { question: 'How fast can you deliver listings?', answer: 'Standard turnaround is 24–48 hours per listing (or batch). For 10+ listings, expect 3–5 business days. Bulk orders (50+ listings) are quoted separately.' },
    { question: 'Do you offer discounts for bulk listing orders?', answer: 'Yes — bulk orders of 10+ listings receive a 20% discount off the per-listing rate. Catalog pricing (100+ listings) is available on request.' },
    { question: 'Which marketplaces do you support?', answer: 'Amazon (all regions), eBay, Etsy, Shopify product pages, Walmart Marketplace, and TikTok Shop. If you sell on a different platform, ask us — we can likely accommodate.' },
  ],
  relatedSlugs: ['product-listing-optimization', 'a-plus-content', 'amazon-ebay-etsy'],
  pricing: {
    usd: 'Starting at $25',
    pkr: '₨7,000',
    period: 'per listing',
    note: 'Bulk 10+ listings: 20% discount. Catalog rates on request.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 16. PRODUCT LISTING OPTIMIZATION
// ─────────────────────────────────────────────────────────────────────────────
const productListingOptimization: ServiceData = {
  slug: 'product-listing-optimization',
  name: 'Listing Optimization',
  headline: 'Turn views into add-to-carts.',
  subheadline: 'Data-driven listing rewrites.',
  motifKey: 'ListingOptimizationMotif',
  accent: 'cyan',
  capabilities: [
    { icon: '📊', title: 'Conversion Rate Analysis', description: 'Session-to-order rate benchmarked against category averages — identifying exactly what\'s preventing the add-to-cart.' },
    { icon: '🔍', title: 'Keyword Gap Identification', description: 'Current indexation audited against a full keyword universe — finding high-volume terms you\'re missing.' },
    { icon: '🖼️', title: 'Image & A+ Recommendations', description: 'Image stack critique and A+ content roadmap — because the listing is only as strong as its weakest element.' },
  ],
  process: [
    { number: '01', title: 'Listing Audit', description: 'Current indexation check, conversion rate review, review mining for customer language, and competitor listing analysis.', motifProgress: 0 },
    { number: '02', title: 'Keyword Strategy', description: 'Full keyword gap analysis with volume and competition data, prioritized by estimated revenue impact.', motifProgress: 0.33 },
    { number: '03', title: 'Copy Rewrite', description: 'Title, bullets, description, and backend keywords rewritten with conversion-optimized structure and keyword integration.', motifProgress: 0.66 },
    { number: '04', title: 'Results Tracking', description: '30-day post-optimization check on indexation, ranking, and conversion rate — with a before/after report.', motifProgress: 1 },
  ],
  filters: ['All', 'Title & Bullets', 'Backend Keywords', 'Images & A+', 'Full Overhaul'],
  portfolio: [
    { id: 'lopt-1', title: 'Full Overhaul — Fitness Tracker', client: 'Sample / Concept — Consumer Electronics', niche: 'Electronics', filter: 'Full Overhaul', metric: '+34% CVR', thumbnailGradient: 'from-cyan-700 to-blue-900', challenge: 'A fitness tracker ASIN had high impressions from PPC but a 2.8% conversion rate — below the electronics category average of 4.5%.', approach: 'Complete listing overhaul: keyword-gap analysis identified 140 missing high-volume terms; title restructured for the most commercial keyword; bullets rewritten to address top-3 review objections.', result: 'Conversion rate increased from 2.8% to 4.1% — a 34% lift. PPC ACOS dropped from 38% to 22% as organic rank improved.', metrics: [{ label: 'CVR Lift', value: '+34', unit: '%' }, { label: 'PPC ACOS', value: '38%→22%' }, { label: 'Keywords Added', value: '140' }], tools: ['Helium 10', 'Brand Analytics', 'Seller Central'], hasBeforeAfter: true, beforeLabel: 'Before: 2.8% CVR, 38% ACOS', afterLabel: 'After: 4.1% CVR, 22% ACOS' },
    { id: 'lopt-2', title: 'Backend Keyword Optimization — Supplement', client: 'Sample / Concept — Health Supplements', niche: 'Supplements', filter: 'Backend Keywords', metric: '+62 keyword rank gains', thumbnailGradient: 'from-emerald-700 to-green-900', challenge: 'A supplement brand had strong front-end copy but backend search terms that were wasting character allowance on already-indexed terms.', approach: 'Full backend keyword audit — removed duplicate and redundant terms, replaced with 67 missing high-volume synonym and alternate phrasing queries.', result: '+62 net keyword ranking improvements tracked at day 30; organic sessions increased 28%.', metrics: [{ label: 'Keyword Rank Gains', value: '+62' }, { label: 'Organic Sessions', value: '+28', unit: '%' }, { label: 'Backend Terms Updated', value: '250' }], tools: ['Helium 10', 'Brand Analytics'], hasBeforeAfter: false },
    { id: 'lopt-3', title: 'CTR Optimization — Home Office Chair', client: 'Sample / Concept — Office Furniture', niche: 'Furniture', filter: 'Title & Bullets', metric: '2.8% → 4.1% CTR', thumbnailGradient: 'from-slate-700 to-gray-900', challenge: 'A home office chair listing had good organic rank but low CTR — appearing in search but not earning the click.', approach: 'Title restructured to lead with the highest-CTR keyword variation (based on PPC split test data); main image critique and alt-title A/B test recommendations provided.', result: 'CTR improved from 2.8% to 4.1% within 45 days; no other changes made during the test window.', metrics: [{ label: 'CTR', value: '2.8%→4.1%' }, { label: 'Sessions Increase', value: '+47', unit: '%' }, { label: 'Rank Change', value: 'P8→P3' }], tools: ['Amazon Search Term Report', 'Brand Analytics', 'Helium 10'], hasBeforeAfter: true, beforeLabel: 'Before: feature-first title, 2.8% CTR', afterLabel: 'After: keyword-first title, 4.1% CTR' },
  ],
  faq: [
    { question: 'How is listing optimization different from creating a new listing?', answer: 'Optimization starts from your existing listing data — conversion rate, indexation, PPC search term reports, and review analysis. It\'s a data-informed rewrite, not a blank-slate creation. The result is more targeted and more likely to move the specific metrics that are currently underperforming.' },
    { question: 'What results can I expect?', answer: 'Typical outcomes include 10–35% conversion rate improvement and meaningful keyword rank gains within 30–60 days. Results vary by category, competition level, and how suboptimal the original listing was.' },
    { question: 'Do you need access to my Seller Central account?', answer: 'Read-only Seller Central access is ideal — it lets us pull conversion data, search term reports, and Brand Analytics. If you prefer, we can work from exported reports and screenshots instead.' },
    { question: 'What if my conversion rate doesn\'t improve?', answer: 'If we don\'t see measurable improvement in indexation and conversion at the 30-day check, we conduct a second analysis pass at no additional charge to identify whether the issue is in the copy, the images, the price, or a category-level factor.' },
  ],
  relatedSlugs: ['product-listing', 'a-plus-content', 'seo'],
  pricing: {
    usd: 'Starting at $49',
    pkr: '₨14,000',
    period: 'per ASIN',
    note: 'Catalog rates available on request.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MASTER EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export const ALL_SERVICES: ServiceData[] = [
  logoCreation,
  embroideryLogoDesign,
  seo,
  socialMediaMarketing,
  metaAds,
  tiktokAds,
  youtubeAds,
  googleAds,
  ecommerceStoreSetup,
  amazonEbayEtsy,
  websiteDevelopment,
  websiteDesigning,
  branding,
  aPlusContent,
  productListing,
  productListingOptimization,
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return ALL_SERVICES.find((s) => s.slug === slug);
}
