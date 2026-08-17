// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://passioneslalom.it",
  output: "static",
  integrations: [
    // Gli indirizzi della sitemap nascono da `site`, non dall'host che serve il
    // sito: restano quelli definitivi anche finché siamo su netlify.app.
    sitemap({
      // La 404 è raggiungibile come pagina statica ma non va segnalata a Google.
      filter: (pagina) => !pagina.endsWith("/404/"),
    }),
  ],
});
