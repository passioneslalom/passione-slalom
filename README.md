# Passione Slalom

Sito informativo della community italiana dello slalom virtuale (Assetto Corsa, rFactor, TrackDay R).
Astro in output statico, senza CMS: i contenuti sono file Markdown dentro `src/content/`.

## Comandi

| Comando           | Cosa fa                                     |
| ----------------- | ------------------------------------------- |
| `npm install`     | Installa le dipendenze                      |
| `npm run dev`     | Avvia il sito su `http://localhost:4321`    |
| `npm run build`   | Genera il sito statico in `dist/`           |
| `npm run preview` | Serve `dist/` in locale come in produzione  |
| `npm run check`   | Controlla i tipi e gli errori nelle pagine  |

## Aggiungere un tracciato

1. Duplica un file esistente in `src/content/tracciati/` e rinominalo (es. `slalom-monte-bianco.md`).
2. Metti la foto in `public/images/tracciati/` e compila il frontmatter:

```yaml
---
titolo: Slalom Monte Bianco
foto: /images/tracciati/slalom-monte-bianco.svg
video: https://www.youtube.com/watch?v=XXXXXXXXXXX
gioco: assetto-corsa # oppure: rfactor | trackday-r
ordine: 3 # facoltativo, decide la posizione nella lista
---
```

Il campo `gioco` decide in quale delle tre pagine tracciati compare la scheda: la collection è una
sola, le pagine la filtrano. Il testo sotto il frontmatter è una nota interna e al momento non
viene mostrato nelle liste.

## Aggiungere un membro dello staff

Stessa procedura in `src/content/staff/`, con foto in `public/images/staff/`:

```yaml
---
nome: Nome Cognome
ruolo: Direzione gara
foto: /images/staff/nome-cognome.svg
ordine: 4
---
```

Se un file ha un errore nel frontmatter, `npm run build` si ferma e indica riga e campo.

## Link esterni

Discord, YouTube, Instagram, Facebook, TikTok e Twitch sono raccolti in `src/lib/site.ts`:
cambiando gli URL lì si aggiornano home e footer insieme.

## Struttura

```
src/
  components/     Card tracciati e staff, divisore a cordolo, bottone, testata, piè di pagina
  content/        Contenuti Markdown (tracciati, staff)
  layouts/        BaseLayout: head, font, header e footer
  lib/            Dati dei giochi, link social, helper di ordinamento
  pages/          Una cartella per rotta, come nella sitemap
  styles/         global.css: palette, tipografia, bottoni, griglie
public/images/    Foto e loghi (attualmente segnaposto SVG da sostituire)
```

## Note

- Le immagini in `public/images/` sono **segnaposto** generati per rendere il sito navigabile:
  vanno sostituite con le foto reali mantenendo lo stesso percorso.
- Le sezioni `auto` e `campionati` sono pagine statiche. Quando ci saranno i contenuti definitivi,
  `auto` diventerà una collection analoga a `tracciati` in `src/content.config.ts`.
- Nessun form, nessun servizio di terze parti caricato dal browser: i font sono serviti dal sito
  stesso (Fontsource) e non serve un banner cookie.
