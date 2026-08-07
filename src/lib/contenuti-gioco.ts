import { getCollection, type CollectionEntry } from "astro:content";
import type { Gioco } from "./giochi";

/**
 * Le collection legate a un gioco (`tracciati`, `auto`) hanno gli stessi campi e
 * la stessa card: qui vive la lettura filtrata per gioco, ordinata per `ordine`
 * (le voci senza `ordine` finiscono in fondo, in ordine alfabetico).
 */
function ordina<T extends { data: { titolo: string; ordine?: number } }>(voci: T[]): T[] {
  return voci.sort((a, b) => {
    const ordineA = a.data.ordine ?? Number.MAX_SAFE_INTEGER;
    const ordineB = b.data.ordine ?? Number.MAX_SAFE_INTEGER;
    if (ordineA !== ordineB) return ordineA - ordineB;
    return a.data.titolo.localeCompare(b.data.titolo, "it");
  });
}

export async function getTracciati(gioco: Gioco): Promise<CollectionEntry<"tracciati">[]> {
  return ordina(await getCollection("tracciati", ({ data }) => data.gioco === gioco));
}

export async function getAuto(gioco: Gioco): Promise<CollectionEntry<"auto">[]> {
  return ordina(await getCollection("auto", ({ data }) => data.gioco === gioco));
}
