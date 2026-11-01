export type NailService = {
  id: string;
  service: string;
  price: number;
  from?: boolean;
  supplement?: boolean;
  order: number;
  visible: boolean;
};

export const fallbackServices: NailService[] = [
  {
    id: 'manicure-semplice',
    service: 'Manicure semplice',
    price: 15,
    order: 10,
    visible: true,
  },
  {
    id: 'manicure-semipermanente',
    service: 'Manicure semplice + semipermanente lucido',
    price: 20,
    order: 20,
    visible: true,
  },
  {
    id: 'semipermanente-rinforzato',
    service: 'Semipermanente rinforzato',
    price: 35,
    order: 30,
    visible: true,
  },
  {
    id: 'refill-gel-corto',
    service: 'Refill gel corto o copertura unghia naturale',
    price: 40,
    order: 40,
    visible: true,
  },
  {
    id: 'refill-gel-medio',
    service: 'Refill gel medio o allungamento senza cartina',
    price: 45,
    order: 50,
    visible: true,
  },
  {
    id: 'refill-gel-lungo',
    service: 'Refill gel lungo',
    price: 50,
    order: 60,
    visible: true,
  },
  {
    id: 'ricostruzione-cartina',
    service: 'Ricostruzione con cartina',
    price: 60,
    from: true,
    order: 70,
    visible: true,
  },
  {
    id: 'rimozione',
    service: 'Rimozione semipermanente o gel',
    price: 5,
    order: 80,
    visible: true,
  },
  {
    id: 'supplemento-nail-art',
    service: 'French, baby boomer o decori',
    price: 5,
    supplement: true,
    order: 90,
    visible: true,
  },
];
