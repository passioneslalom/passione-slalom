import { defineCollection, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
// In Astro 7 `z` non si importa più da "astro:content".
import { z } from "astro/zod";

// Tracciati e auto hanno gli stessi campi e la stessa card (SchedaMedia.astro):
// lo schema sta in un posto solo così le due collection non divergono per sbaglio.
// `image()` risolve il percorso e restituisce un ImageMetadata: è ciò di cui
// <Image> ha bisogno, e un percorso sbagliato ferma la build.
// I percorsi partono dalla radice del progetto (/src/assets/...) perché è la forma
// che PagesCMS scrive nel frontmatter: vedi `media` in .pages.yml.
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

// Staff, galleria e partners sono un file solo con una lista dentro il frontmatter,
// non una voce per elemento: così in PagesCMS l'ordine si cambia trascinando le
// righe, mentre con un file per voce servirebbe riscrivere a mano dei campi `ordine`.
const staff = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/staff" }),
  schema: ({ image }) =>
    z.object({
      staff: z.array(
        z.object({
          // Fa anche da testo alternativo della foto.
          nome: z.string(),
          ruolo: z.string(),
          foto: image(),
        }),
      ),
    }),
});

const galleria = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/galleria" }),
  schema: ({ image }) =>
    z.object({
      foto: z.array(
        z.object({
          file: image(),
          // Mostrata nel visore a schermo intero e usata come testo alternativo.
          // Ancora da scrivere per gli scatti storici: vedi ALT_GENERICO in lib/galleria.ts.
          descrizione: z.string().default(""),
        }),
      ),
    }),
});

const partners = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/partners" }),
  schema: ({ image }) =>
    z.object({
      partners: z.array(
        z.object({
          nome: z.string(),
          logo: image(),
          // Facoltativo: senza sito la cella in homepage non è cliccabile.
          // La stringa vuota è ammessa perché è ciò che PagesCMS salva quando
          // il campo viene lasciato in bianco.
          sito: z.union([z.url(), z.literal("")]).optional(),
        }),
      ),
    }),
});

// Un file per gioco, con dentro la lista dei piloti. In pagina la classifica si
// ordina da sé per crediti decrescenti (vedi lib/carriera.ts): qui dentro
// l'ordine delle righe conta solo a parità di crediti.
const carriera = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/carriera" }),
  schema: z.object({
    // Fino a dove arrivano i conteggi: sopra la tabella diventa "Classifica
    // aggiornata al …". Senza, la riga non compare.
    aggiornato: z.string().optional(),
    piloti: z.array(
      z.object({
        nome: z.string(),
        // Facoltativa: in tabella diventa un trattino finché non c'è.
        auto: z.string().optional(),
        crediti: z.number().default(0),
      }),
    ),
  }),
});

export const collections = { tracciati, auto, staff, galleria, partners, carriera };
