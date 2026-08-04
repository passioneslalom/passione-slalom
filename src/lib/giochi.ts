/**
 * Metadati dei tre giochi supportati.
 * Fonte unica per menu, badge e pagine tracciati: cambiando qui si aggiorna tutto.
 */

export type Gioco = "assetto-corsa" | "rfactor" | "trackday-r";

/** Pittogramma associato al gioco (vedi IconaGioco.astro). */
export type Pittogramma = "cono" | "bandiera" | "cronometro";

export interface DatiGioco {
  slug: Gioco;
  nome: string;
  pittogramma: Pittogramma;
  /** Destinazione del gioco dal menu principale. */
  href: string;
}

export const GIOCHI: Record<Gioco, DatiGioco> = {
  "assetto-corsa": {
    slug: "assetto-corsa",
    nome: "Assetto Corsa",
    pittogramma: "cono",
    href: "/gaming/assetto-corsa/",
  },
  rfactor: {
    slug: "rfactor",
    nome: "rFactor",
    pittogramma: "bandiera",
    // rFactor ha solo i tracciati: dal menu si va dritti alla lista.
    href: "/gaming/rfactor/tracciati/",
  },
  "trackday-r": {
    slug: "trackday-r",
    nome: "TrackDay R",
    pittogramma: "cronometro",
    href: "/gaming/trackday-r/tracciati/",
  },
};

export const ELENCO_GIOCHI: DatiGioco[] = Object.values(GIOCHI);
