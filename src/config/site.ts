const cleanHandle = (value: string) => value.trim().replace(/^@/, '');
const cleanPhone = (value: string) => value.replace(/\D/g, '');

const defaultContacts = {
  whatsappNumber: '393296038993',
  instagramHandle: 'simonenailmaster',
} as const;

const whatsappNumber = cleanPhone(
  import.meta.env.PUBLIC_WHATSAPP_NUMBER?.trim() ||
    defaultContacts.whatsappNumber,
);
const instagramHandle = cleanHandle(
  import.meta.env.PUBLIC_INSTAGRAM_HANDLE?.trim() ||
    defaultContacts.instagramHandle,
);

export const siteConfig = {
  name: 'Simone Nail Master',
  tagline: 'Le tue mani. Il tuo stile. Il mio carattere.',
  intro:
    'Non si tratta soltanto di avere belle unghie. Si tratta di trovare lo stile che ti rappresenta, curando ogni dettaglio.',
  treatmentsLine:
    'Manicure, semipermanente, gel, ricostruzione e nail art.',
  ctaHeading: 'È il momento di dedicarti alle tue mani.',
  ctaBody:
    'Per informazioni, appuntamenti o per raccontarmi la tua prossima idea, scrivimi direttamente su WhatsApp.',
  description:
    'Non si tratta soltanto di avere belle unghie. Si tratta di trovare lo stile che ti rappresenta, curando ogni dettaglio.',
  whatsappNumber,
  instagramHandle,
  whatsappMessage: 'Ciao Simone, vorrei chiederti informazioni per un appuntamento.',
} as const;

export const contactLinks = {
  whatsapp: whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
    : null,
  instagram: instagramHandle
    ? `https://www.instagram.com/${instagramHandle}/`
    : null,
} as const;
