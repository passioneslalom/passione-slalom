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
export const EMAIL_CONTATTO = "passioneslalom2021@gmail.com";
/** Claim del sito: hero della homepage e meta description predefinita. */
export const DESCRIZIONE_SITO =
  "Entra nel nostro Discord, scarica mod, tracciati e auto e partecipa ai campionati virtuali di Passione Slalom.";
