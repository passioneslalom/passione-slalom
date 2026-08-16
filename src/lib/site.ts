import type { Social } from "./social-icons";

/** Link esterni della community. */
export const DISCORD_URL = "https://discord.gg/c28wHBjE5K";

export const SOCIAL: { social: Social; url: string }[] = [
  { social: "youtube", url: "https://www.youtube.com/@passioneslalom" },
  { social: "instagram", url: "https://www.instagram.com/passioneslalom.official/" },
  { social: "facebook", url: "https://www.facebook.com/PassioneSlalom/" },
  { social: "tiktok", url: "https://www.tiktok.com/@passioneslalom_official" },
  { social: "twitch", url: "https://www.twitch.tv/passioneslalom" },
  { social: "discord", url: DISCORD_URL },
];

export const NOME_SITO = "Passione Slalom";

/** Recapito pubblicato nelle informative legali. DA SOSTITUIRE con quello reale. */
export const NOME_CONTATTO = "Daniel D'Esposito";
export const EMAIL_CONTATTO = "passioneslalom2021@gmail.com";
/** Claim del sito: hero della homepage e meta description predefinita. */
export const DESCRIZIONE_SITO =
  "Entra nel nostro Discord, scarica mod, tracciati e auto e partecipa ai campionati virtuali di Passione Slalom.";

/**
 * Immagine mostrata da social e chat quando si incolla un link del sito.
 * Sta in public/ perché deve restare a un indirizzo stabile e non passare
 * dall'ottimizzatore: i crawler non seguono i nomi con hash generati in build.
 * Formato 1200×630, il rapporto che tutte le piattaforme ritagliano senza tagli.
 */
export const IMMAGINE_ANTEPRIMA = {
  percorso: "/logo-anteprima.webp",
  larghezza: 1200,
  altezza: 630,
  alt: `Il logo di ${NOME_SITO}`,
} as const;
