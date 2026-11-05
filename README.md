# Simone Nail Master

Landing page mobile-first in Astro, pronta per Cloudflare Pages. Il sito funziona
subito con il listino locale e può leggere lo stesso contenuto da Sanity senza
token in fase di build.

## Sviluppo locale

Requisiti: Node.js 22 e npm.

```bash
npm install
cp .env.example .env
npm run dev
```

La configurazione dei contatti è centralizzata in `src/config/site.ts`. I valori
predefiniti sono WhatsApp `+39 329 6038993` e Instagram
`@simonenailmaster`; le variabili d'ambiente, quando valorizzate, hanno la
precedenza:

| Variabile | Formato | Obbligatoria |
| --- | --- | --- |
| `PUBLIC_WHATSAPP_NUMBER` | prefisso internazionale + numero, solo cifre (es. `39…`) | No |
| `PUBLIC_INSTAGRAM_HANDLE` | username, con o senza `@` | No |
| `PUBLIC_SANITY_PROJECT_ID` | project ID pubblico di Sanity | No |
| `PUBLIC_SANITY_DATASET` | dataset Sanity, default `production` | No |

Se Sanity non è configurato o non è raggiungibile, la build usa
`src/data/services.ts`.

Controlli:

```bash
npm test
npm run build
```

## Cloudflare Workers

Il deploy è un sito **statico**. `wrangler.jsonc` punta `assets.directory` a
`./dist` e non usa adapter SSR: Wrangler non deve eseguire `astro add cloudflare`.

Creare (o ritentare) un progetto Workers collegato a questo repository:

- Production branch: `main`
- Root directory: `/` (lasciare vuoto nel pannello)
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy` (default Cloudflare)
- Node.js version: `22` tramite variabile `NODE_VERSION=22`

Variabili di produzione e preview:

- `PUBLIC_WHATSAPP_NUMBER=393296038993` — opzionale, sovrascrive il default
- `PUBLIC_INSTAGRAM_HANDLE=simonenailmaster` — opzionale, sovrascrive il default
- `PUBLIC_SANITY_PROJECT_ID` — da fornire solo dopo aver creato Sanity
- `PUBLIC_SANITY_DATASET=production`

Non servono adapter, token o secret Cloudflare: l'output è interamente statico.
Ogni modifica al listino su Sanity richiede una nuova build/deploy.

## Gestione listino con Sanity Studio

Lo Studio è isolato in `studio/`, quindi non appesantisce né blocca la build del
sito.

1. Creare un progetto su [sanity.io/manage](https://sanity.io/manage) e annotare
   il project ID pubblico.
2. Configurare lo Studio:

   ```bash
   cd studio
   npm install
   cp .env.example .env
   # inserire SANITY_STUDIO_PROJECT_ID in .env
   npm run dev
   ```

3. Importare una volta il listino iniziale:

   ```bash
   npx sanity dataset import seed/services.ndjson production --replace
   ```

4. In Sanity, aggiungere l'origine Cloudflare (dominio di produzione e preview,
   se usata) tra le CORS origins con credenziali disattivate.
5. Copiare project ID e dataset nelle variabili Cloudflare indicate sopra.

Lo schema `servizio` espone: servizio, prezzo, prefisso “da”, supplemento,
ordine e visibilità. Per pubblicare lo Studio indipendentemente:

```bash
cd studio
npm run deploy
```

Il login e le scritture avvengono solo nello Studio; il sito legge il dataset
pubblico e non richiede secret.

## Dati ancora necessari

- project ID Sanity;
- URL definitivo del sito per impostare la CORS origin in Sanity;
- eventuale dominio/hostname desiderato per Sanity Studio.
