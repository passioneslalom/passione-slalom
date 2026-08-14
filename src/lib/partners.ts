import { getEntry } from "astro:content";
import type { ImageMetadata } from "astro";

export interface Partner {
  /** Ragione sociale: fa anche da testo alternativo del logo. */
  nome: string;
  logo: ImageMetadata;
  /** Facoltativo: se c'è, la cella diventa un link che si apre in una nuova scheda. */
  sito?: string;
}

/** L'ordine è quello della lista in src/content/partners/partners.md. */
export async function getPartners(): Promise<Partner[]> {
  const voce = await getEntry("partners", "partners");
  // Meglio fermare la build che pubblicare la homepage senza la fascia partner.
  if (!voce) throw new Error("Manca src/content/partners/partners.md");
  return voce.data.partners;
}
