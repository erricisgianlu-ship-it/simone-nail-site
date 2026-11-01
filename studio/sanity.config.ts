import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

if (!projectId) {
  throw new Error(
    'SANITY_STUDIO_PROJECT_ID non configurato. Copia .env.example in .env e inserisci il project ID pubblico.',
  );
}

export default defineConfig({
  name: 'simone-nails',
  title: 'Simone Nails — Listino',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
