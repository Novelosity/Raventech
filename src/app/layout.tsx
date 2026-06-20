import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Sora, Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['300', '400', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'RAVENTECH — Digital Marketing, Engineered.',
  description:
    'We don\'t follow trends. We build them. RAVENTECH is a premium digital marketing agency specializing in SEO, Social Media, Branding, Web Development, and SaaS applications.',
  keywords: [
    'digital marketing agency',
    'SEO',
    'social media marketing',
    'graphic design',
    'branding',
    'web development',
    'SaaS',
    'RAVENTECH',
  ],
  authors: [{ name: 'RAVENTECH' }],
  openGraph: {
    type: 'website',
    title: 'RAVENTECH — Digital Marketing, Engineered.',
    description: 'Premium digital marketing agency. We engineer brands that dominate.',
    images: [{ url: '/images/hero-raven.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAVENTECH',
    description: 'Digital Marketing, Engineered.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${sora.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
