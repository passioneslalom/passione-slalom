import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
// In Astro 7 `z` non si importa più da "astro:content".
import { z } from "astro/zod";

const tracciati = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/tracciati" }),
  schema: z.object({
    titolo: z.string(),
    foto: z.string(),
    video: z.url(),
    gioco: z.enum(["assetto-corsa", "rfactor", "trackday-r"]),
    ordine: z.number().optional(),
  }),
});

const staff = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/staff" }),
  schema: z.object({
    nome: z.string(),
    ruolo: z.string(),
    foto: z.string(),
    ordine: z.number().optional(),
  }),
});

export const collections = { tracciati, staff };
