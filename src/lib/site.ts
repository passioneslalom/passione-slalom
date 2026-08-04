import type { Social } from "./social-icons";

/** Link esterni della community. Sostituire con gli URL definitivi. */
export const DISCORD_URL = "https://discord.gg/passioneslalom";

export const SOCIAL: { social: Social; url: string }[] = [
  { social: "youtube", url: "https://www.youtube.com/@passioneslalom" },
  { social: "instagram", url: "https://www.instagram.com/passioneslalom" },
  { social: "facebook", url: "https://www.facebook.com/passioneslalom" },
  { social: "tiktok", url: "https://www.tiktok.com/@passioneslalom" },
  { social: "twitch", url: "https://www.twitch.tv/passioneslalom" },
  { social: "discord", url: DISCORD_URL },
];

export const NOME_SITO = "Passione Slalom";
export const DESCRIZIONE_SITO =
  "La community italiana dello slalom virtuale: tracciati, auto, campionati e staff per Assetto Corsa, rFactor e TrackDay R.";
