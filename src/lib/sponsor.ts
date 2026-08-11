import { getEntry } from "astro:content";
import type { ImageMetadata } from "astro";

export interface Sponsor {
  /** Ragione sociale: fa anche da testo alternativo del logo. */
  nome: string;
  logo: ImageMetadata;
}

/** L'ordine è quello della lista in src/content/sponsor/sponsor.md. */
export async function getSponsor(): Promise<Sponsor[]> {
  const voce = await getEntry("sponsor", "sponsor");
  // Meglio fermare la build che pubblicare la homepage senza la fascia sponsor.
  if (!voce) throw new Error("Manca src/content/sponsor/sponsor.md");
  return voce.data.sponsor;
}
