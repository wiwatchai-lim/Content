# Asset sources — Ferrari FZ6002U beat clip

| Asset | Used as | Source page | Author | License |
|---|---|---|---|---|
| Ferrari SF90 Stradale, red, head-on on a track | `hf/assets/ferrari-sf90-front.png` (cut out with rembg BiRefNet, track/sky removed, soft contact shadow added by us); rushes at the camera behind the glasses at beat 4 and beat 16. Original: `sources/01_ferrari_sf90_03.jpeg` | — | supplied by the user | Supplied by the user; appears to be an official Ferrari press image — press images are usually licensed for editorial use, the shop decides on ad use |
| Flag girl (woman in a red/black racing outfit holding a chequered flag) | `gen/flag-girl.png` (original), `gen/flag-girl-cutout.png`, split into `hf/assets/flag-girl-body.png` + `flag-girl-flag.png` so the flag swings from the grip; `export/flag-girl.gif` | — | generated with Codex/ChatGPT for TIMEOPTIC (built-in image_gen via `codex exec -m gpt-5.6-luna`, 2026-09-25, one approved run) | AI-generated for TIMEOPTIC; original face, not a real person |
| Ferrari wordmark | `brand/partner-logos/ferrari.svg`, top left | https://commons.wikimedia.org/wiki/File:Ferrari_wordmark.svg | Ferrari | Public domain (Wikimedia Commons); trademark of Ferrari S.p.A. |
| Frame photos FZ6002U 504/81 (_1 front, _2 three-quarter, _3 side, _4 folded) | glasses layers | https://www.glasses.com/gl-us/scuderia-ferrari/8056262070499 | Retailer product images | Product photos of the item we sell |

Notes
- Earlier car photos from Pexels (F1 #15350765, SF90 #12801144) were replaced by the user's own photo and their files deleted.
- The first Codex attempt failed with `token_revoked` and produced nothing; after re-login the one approved run produced `gen/flag-girl.png`.
