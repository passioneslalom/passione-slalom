import type { ImageMetadata } from "astro";

export interface Sponsor {
  /** Nome del file senza estensione: è la chiave usata da NOMI. */
  id: string;
  logo: ImageMetadata;
  nome: string;
}

// Il glob accetta anche l'estensione, così sostituire un segnaposto .svg con il
// logo definitivo .png non richiede di toccare una riga di codice.
const moduli = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/sponsor/*.{svg,png,PNG,jpg,jpeg,webp}",
  { eager: true },
);

/** Ragione sociale, dove il nome del file non basta: sigle e maiuscole irregolari. */
const NOMI: Record<string, string> = {
  "3-gd-modding": "GD Modding",
  "4-dd-ph": "DD PH",
  "6-mgg-modding": "MGG Modding",
};

/** "1-central-parking-sorrento" → "Central Parking Sorrento". */
const daNomeFile = (id: string) =>
  id
    .replace(/^\d+-/, "")
    .split("-")
    .map((parola) => parola.charAt(0).toUpperCase() + parola.slice(1))
    .join(" ");

export const SPONSOR: Sponsor[] = Object.entries(moduli)
  .map(([percorso, modulo]) => {
    const id = percorso.split("/").pop()!.replace(/\.[^.]+$/, "");
    return { id, logo: modulo.default, nome: NOMI[id] ?? daNomeFile(id) };
  })
  // Il prefisso numerico nel nome file decide l'ordine di comparsa.
  .sort((a, b) => a.id.localeCompare(b.id, "it", { numeric: true }));
