import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | RAVENTECH Services',
    default: 'Services | RAVENTECH',
  },
  description:
    'Premium digital marketing services — SEO, paid ads, branding, web development, Amazon optimization, and more.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
