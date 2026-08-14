import { getEntry } from "astro:content";
import type { Gioco } from "./giochi";

export interface Pilota {
  nome: string;
  /** Facoltativa: in tabella diventa un trattino finché non c'è. */
  auto?: string;
  crediti: number;
}

export interface Carriera {
  /** Fino a dove arrivano i conteggi, mostrato sopra la tabella. */
  aggiornato?: string;
  piloti: Pilota[];
}

/**
 * Classifica crediti di un gioco, dal più alto al più basso.
 *
 * L'ordine lo decide il numero, non la posizione della riga nel file: così
 * aggiornare i crediti di un pilota basta a rimetterlo al posto giusto, senza
 * doversi ricordare di trascinarne anche la riga. A parità di crediti vince chi
 * sta più in alto nel file, quindi il trascinamento in PagesCMS resta lo
 * spareggio (`sort` conserva l'ordine di partenza fra elementi uguali).
 */
export async function getCarriera(gioco: Gioco): Promise<Carriera> {
  const nomeFile = `carriera-passione-slalom-${gioco}`;
  const voce = await getEntry("carriera", nomeFile);
  // Fermare la build è meglio di una classifica vuota senza spiegazione: se il
  // file cambia nome, l'errore dice subito quale manca.
  if (!voce) throw new Error(`Manca src/content/carriera/${nomeFile}.md`);
  return {
    aggiornato: voce.data.aggiornato,
    // Copia: `sort` lavora sul posto e l'array arriva dal content store.
    piloti: [...voce.data.piloti].sort((a, b) => b.crediti - a.crediti),
  };
}
