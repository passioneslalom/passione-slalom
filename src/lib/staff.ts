import { getEntry } from "astro:content";
import type { ImageMetadata } from "astro";

export interface Membro {
  /** Fa anche da testo alternativo della foto. */
  nome: string;
  ruolo: string;
  foto: ImageMetadata;
}

/** L'ordine è quello della lista in src/content/staff/staff.md. */
export async function getStaff(): Promise<Membro[]> {
  const voce = await getEntry("staff", "staff");
  // Meglio fermare la build che pubblicare la pagina /staff/ vuota.
  if (!voce) throw new Error("Manca src/content/staff/staff.md");
  return voce.data.staff;
}
