import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ALL_SERVICES, getServiceBySlug } from '@/data/serviceData';

// Dynamic import — ServicePageTemplate is a heavy client component
const ServicePageTemplate = dynamic(
  () =>
    import('@/components/services/ServicePageTemplate').then((m) => ({
      default: m.ServicePageTemplate,
    })),
  { ssr: false }
);

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return ALL_SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  return {
    title: service.name,
    description: `${service.headline} ${service.subheadline} — RAVENTECH premium digital marketing services.`,
    openGraph: {
      title: `${service.name} | RAVENTECH`,
      description: service.subheadline,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.name} | RAVENTECH`,
      description: service.subheadline,
    },
  };
}

export default function ServicePage({ params }: PageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return <ServicePageTemplate serviceData={service} />;
}
