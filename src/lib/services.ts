import { createClient } from '@sanity/client';
import { fallbackServices, type NailService } from '@/data/services';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = import.meta.env.PUBLIC_SANITY_DATASET?.trim() || 'production';

const servicesQuery = `*[_type == "servizio" && visibile != false] | order(ordine asc) {
  "_id": _id,
  servizio,
  prezzo,
  "da": coalesce(da, false),
  "supplemento": coalesce(supplemento, false),
  "ordine": coalesce(ordine, 999),
  "visibile": coalesce(visibile, true)
}`;

type SanityService = {
  _id: string;
  servizio: string;
  prezzo: number;
  da: boolean;
  supplemento: boolean;
  ordine: number;
  visibile: boolean;
};

const hasSanityConfig = Boolean(
  projectId && /^[a-z0-9-]+$/.test(projectId) && dataset,
);

export async function getServices(): Promise<NailService[]> {
  if (!hasSanityConfig || !projectId) {
    return fallbackServices;
  }

  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion: '2026-01-01',
      useCdn: false,
    });
    const entries = await client.fetch<SanityService[]>(servicesQuery);

    if (!entries.length) return fallbackServices;

    return entries.map((entry) => ({
      id: entry._id,
      service: entry.servizio,
      price: entry.prezzo,
      from: entry.da,
      supplement: entry.supplemento,
      order: entry.ordine,
      visible: entry.visibile,
    }));
  } catch (error) {
    console.warn(
      'Sanity non raggiungibile: viene usato il listino locale.',
      error instanceof Error ? error.message : error,
    );
    return fallbackServices;
  }
}
