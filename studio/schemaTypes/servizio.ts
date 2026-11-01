import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'servizio',
  title: 'Servizio',
  type: 'document',
  fields: [
    defineField({
      name: 'servizio',
      title: 'Servizio',
      type: 'string',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'prezzo',
      title: 'Prezzo',
      type: 'number',
      description: 'Inserisci solo il numero, senza simbolo €.',
      validation: (rule) => rule.required().min(0).precision(2),
    }),
    defineField({
      name: 'da',
      title: 'Prefisso “da”',
      type: 'boolean',
      description: 'Mostra “da” prima del prezzo.',
      initialValue: false,
    }),
    defineField({
      name: 'supplemento',
      title: 'Supplemento',
      type: 'boolean',
      description: 'Evidenzia la voce come supplemento.',
      initialValue: false,
    }),
    defineField({
      name: 'ordine',
      title: 'Ordine',
      type: 'number',
      description: 'Le voci con numero più basso compaiono prima.',
      initialValue: 100,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'visibile',
      title: 'Visibile',
      type: 'boolean',
      description: 'Disattiva per nascondere la voce dal sito.',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Ordine del listino',
      name: 'ordineAsc',
      by: [{ field: 'ordine', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'servizio',
      price: 'prezzo',
      from: 'da',
      supplement: 'supplemento',
      visible: 'visibile',
    },
    prepare({ title, price, from, supplement, visible }) {
      const amount = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
      }).format(price ?? 0);
      const prefix = from ? 'da ' : '';
      const kind = supplement ? ' · supplemento' : '';
      const state = visible === false ? ' · nascosto' : '';

      return {
        title,
        subtitle: `${prefix}${amount}${kind}${state}`,
      };
    },
  },
});
