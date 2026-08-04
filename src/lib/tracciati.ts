import { getCollection, type CollectionEntry } from "astro:content";
import type { Gioco } from "./giochi";

/**
 * Tracciati di un singolo gioco, ordinati per campo `ordine`
 * (i file senza `ordine` finiscono in fondo, in ordine alfabetico).
 */
export async function getTracciati(gioco: Gioco): Promise<CollectionEntry<"tracciati">[]> {
  const tracciati = await getCollection("tracciati", ({ data }) => data.gioco === gioco);

  return tracciati.sort((a, b) => {
    const ordineA = a.data.ordine ?? Number.MAX_SAFE_INTEGER;
    const ordineB = b.data.ordine ?? Number.MAX_SAFE_INTEGER;
    if (ordineA !== ordineB) return ordineA - ordineB;
    return a.data.titolo.localeCompare(b.data.titolo, "it");
  });
}
