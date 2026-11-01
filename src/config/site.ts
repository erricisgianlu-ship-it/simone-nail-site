const cleanHandle = (value: string) => value.trim().replace(/^@/, '');
const cleanPhone = (value: string) => value.replace(/\D/g, '');

const whatsappNumber = cleanPhone(import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '');
const instagramHandle = cleanHandle(import.meta.env.PUBLIC_INSTAGRAM_HANDLE ?? '');

export const siteConfig = {
  name: 'Simone Nails',
  eyebrow: 'Nail care',
  description:
    'Manicure, semipermanente, gel e ricostruzione: scegli il trattamento più adatto alle tue unghie.',
  whatsappNumber,
  instagramHandle,
  whatsappMessage: 'Ciao Simone, vorrei chiederti informazioni per un appuntamento.',
} as const;

export const contactLinks = {
  whatsapp: whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
    : null,
  instagram: instagramHandle
    ? `https://instagram.com/${instagramHandle}`
    : null,
} as const;
