'use client';

/**
 * ServiceChapters — 5 cinematic chapter headings, each followed by a product grid.
 * Headings use word-mask scroll reveal (overflow-hidden + slide-up stagger).
 * Product cards animate in with whileInView stagger.
 */

import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Product {
  name: string;
  description: string;
  tags: string[];
  path: string; // Heroicons outline SVG path
}

interface Chapter {
  id: string;
  number: string;
  lines: string[];     // heading split into display lines
  accentLine: number;  // index of line that gets gradient treatment
  accent: 'violet' | 'cyan' | 'gold';
  service: string;
  serviceHref: string; // links to the service detail page
  subtext: string;
  products: Product[];
}

// ─── CHAPTER DATA ─────────────────────────────────────────────────────────────
const CHAPTERS: Chapter[] = [
  // ── 01 SEO ──────────────────────────────────────────────────────────────────
  {
    id: 'seo',
    number: '01',
    lines: ['RANK WHERE', 'IT', 'MATTERS.'],
    accentLine: 0,
    accent: 'cyan',
    service: 'SEO Optimization',
    serviceHref: '/services/seo',
    subtext:
      'Search dominance engineered through technical precision, content architecture, and relentless authority building.',
    products: [
      {
        name: 'Technical SEO Audit',
        description:
          'Full-site crawl, structured data, Core Web Vitals, and indexability — diagnosed and fixed completely.',
        tags: ['Crawl Errors', 'Schema Markup', 'Indexability'],
        path: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803M10.5 7.5v6m3-3h-6',
      },
      {
        name: 'Keyword Strategy',
        description:
          'Search intent mapping, competitor gap analysis, and long-tail clustering that captures buyers at every funnel stage.',
        tags: ['Intent Mapping', 'Gap Analysis', 'Clustering'],
        path: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
      },
      {
        name: 'Content Architecture',
        description:
          'Topic clusters, pillar pages, and internal link graphs built to rank — and compound — over time.',
        tags: ['Pillar Pages', 'Internal Links', 'Topic Clusters'],
        path: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zm9.75-9.75H15a2.25 2.25 0 012.25 2.25v2.25A2.25 2.25 0 0115 12.75h-2.25A2.25 2.25 0 0110.5 10.5V8.25A2.25 2.25 0 0112.75 6zm3 9.75H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25a2.25 2.25 0 012.25-2.25z',
      },
      {
        name: 'Link Authority Building',
        description:
          'White-hat digital PR, HARO responses, and editorial placements that compound domain authority month over month.',
        tags: ['Digital PR', 'HARO', 'Editorial Links'],
        path: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244',
      },
      {
        name: 'Core Web Vitals',
        description:
          'LCP, CLS, and INP optimized for the Page Experience signal — the technical edge most competitors miss entirely.',
        tags: ['LCP', 'CLS', 'INP'],
        path: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
      },
      {
        name: 'Local & National SEO',
        description:
          'Google Business Profile, citation building, and geo-targeted campaigns that own local pack results.',
        tags: ['Google Business', 'Citations', 'Local Pack'],
        path: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
      },
    ],
  },

  // ── 02 SOCIAL MEDIA MARKETING ────────────────────────────────────────────────
  {
    id: 'smm',
    number: '02',
    lines: ['CONVERSATIONS', 'THAT', 'CONVERT.'],
    accentLine: 0,
    accent: 'violet',
    service: 'Social Media Marketing',
    serviceHref: '/services/social-media-marketing',
    subtext:
      'Social presences that compound — not just grow. Data-driven content, community architecture, and paid amplification that turns followers into fanatics.',
    products: [
      {
        name: 'Platform Strategy & Setup',
        description:
          'Audience-first platform selection, full profile optimization, bio engineering, and content pillar definition before a single post goes live.',
        tags: ['Platform Audit', 'Profile Optimization', 'Pillar Strategy'],
        path: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5',
      },
      {
        name: 'Content Creation & Scheduling',
        description:
          'Platform-native content — Reels, carousels, Stories, and long-form — produced in-house, batched monthly, and scheduled for peak engagement windows.',
        tags: ['Reels', 'Carousels', 'Content Calendar'],
        path: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
      },
      {
        name: 'Community Management',
        description:
          'Daily engagement across comments, DMs, and mentions — building loyalty loops that turn your audience into advocates.',
        tags: ['DM Management', 'Comment Replies', 'Engagement Loops'],
        path: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
      },
      {
        name: 'Paid Social Campaigns',
        description:
          'Meta, TikTok, and LinkedIn ad campaigns built around conversion objectives — with creative testing, audience segmentation, and ROAS tracking baked in.',
        tags: ['Meta Ads', 'TikTok Ads', 'LinkedIn Ads'],
        path: 'M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z',
      },
      {
        name: 'Influencer Partnerships',
        description:
          'Vetted creator sourcing, campaign briefs, negotiation, and performance tracking — influencer marketing without the guesswork or inflated rates.',
        tags: ['Creator Sourcing', 'Brief Writing', 'Performance Tracking'],
        path: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
      },
      {
        name: 'Analytics & Monthly Reporting',
        description:
          'Live dashboards, monthly performance decks, and strategic reviews — you see every metric we see, with plain-English interpretation.',
        tags: ['Live Dashboards', 'Monthly Decks', 'Strategy Reviews'],
        path: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
      },
    ],
  },

  // ── 03 BRANDING ─────────────────────────────────────────────────────────────
  {
    id: 'branding',
    number: '03',
    lines: ['IDENTITY', 'WITH', 'INTENT.'],
    accentLine: 2,
    accent: 'violet',
    service: 'Logo & Branding',
    serviceHref: '/services/branding',
    subtext:
      'Brand identities built to mean something — not just look good. Strategy-first thinking, then relentless aesthetics.',
    products: [
      {
        name: 'Brand Strategy & Positioning',
        description:
          'Audience mapping, competitive differentiation, and voice definition that shapes every brand decision downstream.',
        tags: ['Positioning', 'Audience', 'Voice'],
        path: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5',
      },
      {
        name: 'Logo Design System',
        description:
          'Primary mark, secondary variants, monochrome, and favicon — built for every surface and scale.',
        tags: ['Primary Mark', 'Variants', 'Favicon'],
        path: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42',
      },
      {
        name: 'Visual Identity System',
        description:
          'Color palette, typography hierarchy, iconography, and pattern libraries that scale with consistency across teams.',
        tags: ['Color Palette', 'Typography', 'Iconography'],
        path: 'M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88',
      },
      {
        name: 'Brand Guidelines Document',
        description:
          'A complete style guide — usage rules, do/dont examples, and application specs across every touchpoint.',
        tags: ['Style Guide', 'Usage Rules', 'Examples'],
        path: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
      },
      {
        name: 'Brand Applications',
        description:
          'Email signatures, social templates, business cards, and packaging — identity applied perfectly across every touchpoint.',
        tags: ['Social Templates', 'Business Cards', 'Packaging'],
        path: 'M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122',
      },
      {
        name: 'Brand Refresh',
        description:
          'Strategic evolution of existing brands — modernize the look without losing the equity you have already built.',
        tags: ['Evolution', 'Equity Retention', 'Modernization'],
        path: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99',
      },
    ],
  },

  // ── 04 WEB DEV ────────────────────────────────────────────────────────────────
  {
    id: 'webdev',
    number: '04',
    lines: ['SITES THAT PERFORM,', 'NOT JUST', 'APPEAR.'],
    accentLine: 0,
    accent: 'cyan',
    service: 'Web Design & Development',
    serviceHref: '/services/website-development',
    subtext:
      'Digital experiences engineered for Core Web Vitals perfection, conversion rate lift, and lasting brand authority.',
    products: [
      {
        name: 'Next.js Development',
        description:
          'App Router, RSC, and edge deployment — the fastest possible web stack, custom-built to your exact specification.',
        tags: ['App Router', 'Edge Deployed', 'TypeScript'],
        path: 'M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z',
      },
      {
        name: 'UX/UI Design',
        description:
          'Wireframes, interactive prototypes, and design systems — fully validated before a single line of code is written.',
        tags: ['Wireframes', 'Prototypes', 'Design System'],
        path: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42',
      },
      {
        name: 'E-commerce Builds',
        description:
          'Headless Shopify, WooCommerce, and custom storefronts — optimized for conversion from browse to buy.',
        tags: ['Shopify', 'WooCommerce', 'Headless'],
        path: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z',
      },
      {
        name: 'CMS Integration',
        description:
          'Sanity, Contentful, or Payload CMS — content editing your non-technical team will actually want to use.',
        tags: ['Sanity', 'Contentful', 'Payload CMS'],
        path: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125',
      },
      {
        name: 'Performance Optimization',
        description:
          'Image optimization, code splitting, CDN config, and sub-second LCP — for sites that already exist and need to win.',
        tags: ['Image Optimization', 'Code Splitting', 'CDN'],
        path: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
      },
      {
        name: 'Web Apps & Portals',
        description:
          'Custom dashboards, client portals, and internal tools — software that looks and feels like a real product.',
        tags: ['Dashboards', 'Client Portals', 'Internal Tools'],
        path: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3',
      },
    ],
  },

  // ── 05 SAAS ───────────────────────────────────────────────────────────────────
  {
    id: 'saas',
    number: '05',
    lines: ['SOFTWARE', 'THAT', 'SCALES.'],
    accentLine: 2,
    accent: 'violet',
    service: 'SaaS Applications',
    serviceHref: '/services/ecommerce-store-setup',
    subtext:
      'Full-stack products from MVP to enterprise — designed, built, and launched with the obsession of a founder.',
    products: [
      {
        name: 'MVP Development',
        description:
          'From validated idea to launch-ready product in 6–8 weeks. Focused on what converts users — nothing else.',
        tags: ['6–8 Wk Launch', 'User-Validated', 'Lean Scope'],
        path: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
      },
      {
        name: 'Full-Stack Architecture',
        description:
          'Next.js 14, Node.js, PostgreSQL, and Redis — built to scale from 10 to 100,000 users without re-architecting.',
        tags: ['Next.js 14', 'PostgreSQL', 'Redis'],
        path: 'M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z',
      },
      {
        name: 'Auth & Billing Systems',
        description:
          'Auth.js, Stripe subscriptions, metered billing, and customer portals — revenue infrastructure done right from day one.',
        tags: ['Auth.js', 'Stripe', 'Metered Billing'],
        path: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z',
      },
      {
        name: 'Real-time Features',
        description:
          'WebSockets, live dashboards, collaborative editing, and push notifications — the features that actually retain users.',
        tags: ['WebSockets', 'Live Dashboards', 'Notifications'],
        path: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6.75v6.75',
      },
      {
        name: 'API Design & Documentation',
        description:
          'REST and GraphQL APIs with OpenAPI specs, Postman collections, and developer docs your integrators will love.',
        tags: ['REST', 'GraphQL', 'OpenAPI'],
        path: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
      },
      {
        name: 'Infrastructure & DevOps',
        description:
          'Vercel/AWS deployment, GitHub CI/CD pipelines, error monitoring, and uptime SLAs — production-grade from launch.',
        tags: ['CI/CD', 'Monitoring', '99.9% SLA'],
        path: 'M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z',
      },
    ],
  },

  // ── 06 DESIGN ─────────────────────────────────────────────────────────────────
  {
    id: 'design',
    number: '06',
    lines: ['DESIGN THAT', 'STOPS', 'THE SCROLL.'],
    accentLine: 1,
    accent: 'gold',
    service: 'Graphic Design',
    serviceHref: '/services/logo-creation',
    subtext:
      'Visual communication that commands attention. Every pixel intentional, every asset engineered to convert.',
    products: [
      {
        name: 'Social Media Graphics',
        description:
          'Platform-optimized templates, story formats, and feed layouts — branded, batch-delivered, and ready to post.',
        tags: ['Templates', 'Story Formats', 'Ad Creatives'],
        path: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z',
      },
      {
        name: 'Motion Graphics & Animation',
        description:
          'Animated logos, reels, explainer videos, and scroll-triggered web animations — motion that earns attention.',
        tags: ['Animated Logos', 'Reels', 'Explainers'],
        path: 'M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0c0 .621.504 1.125 1.125 1.125m17.25-2.25c0 .621-.504 1.125-1.125 1.125M2.25 10.5h19.5',
      },
      {
        name: 'Campaign Visual Systems',
        description:
          'Multi-platform campaign assets — cohesive across display ads, social, OOH, and digital — from a single brief.',
        tags: ['Multi-platform', 'Display Ads', 'OOH'],
        path: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
      },
      {
        name: 'Print & Collateral',
        description:
          'Brochures, banners, trade show materials, and packaging — print-ready files with full bleed and CMYK precision.',
        tags: ['Brochures', 'Banners', 'Packaging'],
        path: 'M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z',
      },
      {
        name: 'Presentation Design',
        description:
          'Investor pitch decks, keynote presentations, and slide systems designed to close rooms and win funding rounds.',
        tags: ['Pitch Decks', 'Investor Decks', 'Slide Systems'],
        path: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6.75v6.75',
      },
      {
        name: 'Ad Creative & A/B Testing',
        description:
          'High-converting Meta, Google, and TikTok ad creatives — with variant testing built into every delivery package.',
        tags: ['Meta Ads', 'Google Ads', 'A/B Variants'],
        path: 'M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z',
      },
    ],
  },
];

// ─── ACCENT CONFIG ────────────────────────────────────────────────────────────
const A = {
  cyan: {
    text: 'text-cyan',
    border: 'border-cyan/20',
    bg: 'bg-cyan/[0.08]',
    glow: 'hover:shadow-[0_0_36px_rgba(34,211,238,0.16)]',
    bar: 'bg-cyan',
    divider: 'rgba(34,211,238,0.25)',
    watermark: 'rgba(34,211,238,0.035)',
    accentGrad: { background: 'linear-gradient(135deg,#22D3EE 0%,#7C3AED 100%)', WebkitBackgroundClip: 'text' as const, WebkitTextFillColor: 'transparent' as const, backgroundClip: 'text' as const },
  },
  violet: {
    text: 'text-violet',
    border: 'border-violet/20',
    bg: 'bg-violet/[0.08]',
    glow: 'hover:shadow-[0_0_36px_rgba(124,58,237,0.18)]',
    bar: 'bg-violet',
    divider: 'rgba(124,58,237,0.25)',
    watermark: 'rgba(124,58,237,0.035)',
    accentGrad: { background: 'linear-gradient(135deg,#7C3AED 0%,#22D3EE 100%)', WebkitBackgroundClip: 'text' as const, WebkitTextFillColor: 'transparent' as const, backgroundClip: 'text' as const },
  },
  gold: {
    text: 'text-gold',
    border: 'border-gold/20',
    bg: 'bg-gold/[0.08]',
    glow: 'hover:shadow-[0_0_36px_rgba(245,197,24,0.14)]',
    bar: 'bg-gold',
    divider: 'rgba(245,197,24,0.22)',
    watermark: 'rgba(245,197,24,0.04)',
    accentGrad: { background: 'linear-gradient(135deg,#F5C518 0%,#FF8C00 100%)', WebkitBackgroundClip: 'text' as const, WebkitTextFillColor: 'transparent' as const, backgroundClip: 'text' as const },
  },
};

// ─── WORD REVEAL VARIANTS ─────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const lineVariants = {
  hidden: { y: '108%' },
  visible: {
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// ─── CHAPTER HEADING ─────────────────────────────────────────────────────────
function ChapterHeading({ chapter }: { chapter: Chapter }) {
  const a = A[chapter.accent];

  return (
    <section
      id={chapter.id}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden
                 px-5 sm:px-8 md:px-14 lg:px-24 py-24 md:py-28"
    >
      {/* Ghost watermark number */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 font-headline font-extrabold
                   select-none pointer-events-none leading-none hidden sm:block"
        style={{
          fontSize: 'clamp(8rem, 22vw, 22rem)',
          color: a.watermark,
        }}
      >
        {chapter.number}
      </div>

      {/* Animated top rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`w-12 h-[2px] mb-8 origin-left ${a.bar}`}
      />

      {/* Service label */}
      <motion.p
        initial={{ opacity: 0, x: -14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className={`text-[0.65rem] font-display font-semibold tracking-[0.44em] uppercase ${a.text} mb-10`}
      >
        {chapter.number} &nbsp;/&nbsp; {chapter.service}
      </motion.p>

      {/* Heading — word mask reveal */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
        className="font-headline font-extrabold leading-[0.88] mb-10 md:mb-12"
        style={{ fontSize: 'clamp(2.4rem, 7vw, 8rem)' }}
      >
        {chapter.lines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              className="block"
              variants={lineVariants}
              style={i === chapter.accentLine ? a.accentGrad : {}}
            >
              {i !== chapter.accentLine ? (
                <span className="text-white">{line}</span>
              ) : (
                line
              )}
            </motion.span>
          </div>
        ))}
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="text-white/50 font-body leading-relaxed max-w-lg mb-14"
        style={{ fontSize: 'clamp(0.88rem, 1.7vw, 1.08rem)' }}
      >
        {chapter.subtext}
      </motion.p>

      {/* Scroll nudge + CTA link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-5"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            className={a.text}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
              strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
          <span className="text-[10px] font-display tracking-[0.38em] uppercase text-white/25">
            {chapter.products.length} services
          </span>
        </div>

        <Link
          href={chapter.serviceHref}
          className={`flex items-center gap-2 text-xs font-display font-semibold tracking-widest uppercase
                      ${a.text} opacity-70 hover:opacity-100 transition-opacity duration-200 group`}
        >
          View full page
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            strokeLinecap="round" strokeLinejoin="round"
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200">
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}

// ─── PRODUCT GRID ─────────────────────────────────────────────────────────────
function ProductGrid({ chapter }: { chapter: Chapter }) {
  const a = A[chapter.accent];

  return (
    <section className="relative pb-20 md:pb-32 px-5 sm:px-8 md:px-14 lg:px-24">
      {/* Accent divider */}
      <div
        className="w-full h-px mb-16"
        style={{
          background: `linear-gradient(to right, ${a.divider}, transparent)`,
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl">
        {chapter.products.map((product, i) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
          <Link
            href={chapter.serviceHref}
            className={`group relative flex flex-col h-full p-6 rounded-2xl border bg-white/[0.025]
                        backdrop-blur-sm transition-all duration-300
                        ${a.border} ${a.glow}`}
          >
            {/* Top accent rule */}
            <div
              className={`absolute top-0 left-6 right-6 h-[2px] rounded-b-full ${a.bar}
                          opacity-30 group-hover:opacity-75 transition-opacity duration-300`}
            />

            {/* Icon */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5
                          ${a.bg} ${a.text} border ${a.border}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d={product.path} />
              </svg>
            </div>

            {/* Name */}
            <h3 className="font-display font-semibold text-white text-[0.93rem] mb-2.5 leading-snug">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-white/45 font-body text-sm leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Pill tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-[9px] font-display font-semibold tracking-widest uppercase
                              px-2.5 py-1 rounded-full ${a.bg} ${a.text} border ${a.border}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Explore arrow */}
            <div className={`flex items-center gap-1.5 text-[11px] font-display font-semibold tracking-widest uppercase
                            ${a.text} opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-auto`}>
              Explore
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round"
                className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── CHAPTER DIVIDER ─────────────────────────────────────────────────────────
function ChapterDivider() {
  return (
    <div className="w-full px-6 md:px-14 lg:px-24 py-4">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
export function ServiceChapters() {
  return (
    <div>
      {CHAPTERS.map((chapter, i) => (
        <div key={chapter.id}>
          {i > 0 && <ChapterDivider />}
          <ChapterHeading chapter={chapter} />
          <ProductGrid chapter={chapter} />
        </div>
      ))}
    </div>
  );
}
