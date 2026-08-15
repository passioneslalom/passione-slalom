import { NOME_SITO, DESCRIZIONE_SITO, IMMAGINE_ANTEPRIMA, SOCIAL } from "./site";

/**
 * Scheda JSON-LD dell'organizzazione, per la sola homepage: è quella che dice
 * ai motori di ricerca che sito, YouTube, Instagram, Facebook, TikTok, Twitch e
 * Discord sono la stessa entità. Va costruita con l'URL assoluto del sito,
 * perché in JSON-LD i percorsi relativi non valgono.
 */
export function schemaOrganizzazione(base: URL) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: NOME_SITO,
    url: base.href,
    logo: new URL(IMMAGINE_ANTEPRIMA.percorso, base).href,
    description: DESCRIZIONE_SITO,
    sameAs: SOCIAL.map(({ url }) => url),
  };
}
