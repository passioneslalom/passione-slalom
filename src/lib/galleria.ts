import type { ImageMetadata } from "astro";

export interface Foto {
  /** Nome del file senza estensione: è la chiave usata da DESCRIZIONI e da IN_EVIDENZA. */
  id: string;
  immagine: ImageMetadata;
  alt: string;
}

// Il pattern deve essere una stringa letterale: è il motivo per cui le foto
// stanno in una sottocartella, così il logo in src/assets non finisce qui dentro.
const moduli = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/galleria/*.{jpg,JPG,jpeg,JPEG}",
  { eager: true },
);

/**
 * Testi alternativi per id. Le foto che non compaiono qui ricadono su ALT_GENERICO:
 * il sito resta valido, ma chi usa uno screen reader non sa cosa sta guardando.
 */
const DESCRIZIONI: Record<string, string> = {};

const ALT_GENERICO = "Scatto da una gara di Passione Slalom";

/** Tutte le foto, in ordine di nome file: è l'ordine della pagina /galleria/. */
export const FOTO: Foto[] = Object.entries(moduli)
  .map(([percorso, modulo]) => {
    const id = percorso.split("/").pop()!.replace(/\.[^.]+$/, "");
    return { id, immagine: modulo.default, alt: DESCRIZIONI[id] ?? ALT_GENERICO };
  })
  .sort((a, b) => a.id.localeCompare(b.id, "it", { numeric: true }));

/**
 * Le sei foto mostrate in homepage, nell'ordine in cui appaiono.
 * La prima e l'ultima occupano due colonne: conviene metterci gli scatti più larghi.
 */
const IN_EVIDENZA = [
  "21102018-DSC_5502",
  "_DSC0125",
  "_DSC0596",
  "_DSC4858",
  "18112018-DSC_1229",
  "07072019-DSC_3505",
];

export const FOTO_IN_EVIDENZA: Foto[] = IN_EVIDENZA.map((id) => {
  const foto = FOTO.find((f) => f.id === id);
  // Meglio fermare la build che pubblicare una homepage con una cella in meno.
  if (!foto) throw new Error(`Foto in evidenza non trovata in src/assets/galleria: ${id}`);
  return foto;
});
