import { defineCollection, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
// In Astro 7 `z` non si importa più da "astro:content".
import { z } from "astro/zod";

// Tracciati e auto hanno gli stessi campi e la stessa card (SchedaMedia.astro):
// lo schema sta in un posto solo così le due collection non divergono per sbaglio.
// `image()` risolve il percorso relativo alla entry e restituisce un ImageMetadata:
// è ciò di cui <Image> ha bisogno, e un percorso sbagliato ferma la build.
const schemaContenutoGioco = ({ image }: SchemaContext) =>
  z.object({
    titolo: z.string(),
    foto: image(),
    video: z.url(),
    gioco: z.enum(["assetto-corsa", "rfactor", "trackday-r"]),
    ordine: z.number().optional(),
  });

const tracciati = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/tracciati" }),
  schema: schemaContenutoGioco,
});

// Per ora solo Assetto Corsa ha delle auto, ma lo schema accetta tutti i giochi.
const auto = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/auto" }),
  schema: schemaContenutoGioco,
});

const staff = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/staff" }),
  schema: ({ image }) =>
    z.object({
      nome: z.string(),
      ruolo: z.string(),
      foto: image(),
      ordine: z.number().optional(),
    }),
});

export const collections = { tracciati, auto, staff };
