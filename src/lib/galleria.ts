import { getEntry } from "astro:content";
import type { ImageMetadata } from "astro";

export interface Foto {
  immagine: ImageMetadata;
  /** Didascalia mostrata nel visore a schermo intero. Vuota se non ancora scritta. */
  descrizione: string;
  /** Testo alternativo: la descrizione se c'è, altrimenti un ripiego generico. */
  alt: string;
}

/**
 * Senza descrizione il sito resta valido, ma chi usa uno screen reader non sa
 * cosa sta guardando: meglio un testo generico che un alt vuoto.
 */
const ALT_GENERICO = "Scatto da una gara di Passione Slalom";

/** Quante foto mostra la homepage: la griglia con `ritmo` è tarata su sei celle. */
const IN_EVIDENZA = 6;

/**
 * L'ordine è quello della lista in src/content/galleria/galleria.md: è l'unica
 * fonte, sia per /galleria/ che per le foto in evidenza in homepage.
 */
export async function getFoto(): Promise<Foto[]> {
  const voce = await getEntry("galleria", "galleria");
  // Meglio fermare la build che pubblicare una galleria vuota senza accorgersene.
  if (!voce) throw new Error("Manca src/content/galleria/galleria.md");

  return voce.data.foto.map(({ file, descrizione }) => ({
    immagine: file,
    descrizione,
    alt: descrizione || ALT_GENERICO,
  }));
}

/**
 * Le prime foto della galleria, nell'ordine in cui appaiono in homepage.
 * La prima e l'ultima occupano due colonne: conviene metterci gli scatti più larghi.
 */
export async function getFotoInEvidenza(): Promise<Foto[]> {
  const foto = await getFoto();
  // Con meno di sei foto la griglia della homepage perde una cella: meglio dirlo.
  if (foto.length < IN_EVIDENZA) {
    throw new Error(
      `La homepage mostra ${IN_EVIDENZA} foto, ma la galleria ne ha ${foto.length}.`,
    );
  }
  return foto.slice(0, IN_EVIDENZA);
}
