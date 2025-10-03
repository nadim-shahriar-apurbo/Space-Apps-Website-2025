# StellarX — Space Weather Learning Experience

An interactive React + TypeScript site built with Vite and Tailwind CSS to help students explore space weather through stories, simulations, and visuals.

## Quick Start

1. Ensure Node.js 18+ is installed.
2. Install dependencies:
   - `npm install` (or `pnpm install`)
3. Run the dev server:
   - `npm run dev`
4. Open the app at `http://localhost:5174/`.

5. Live Demo: [team.robosuperior.com](https://team.robosuperior.com) 

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS

## Project Structure

```
finalweb-main/
├── public/            # Static files (served as-is)
├── src/
│  ├── assets/         # Images & media used by components
│  ├── components/     # Core UI & pages
│  │  ├── LandingPage.tsx
│  │  ├── InteractiveSpaceWeatherElements.tsx
│  │  ├── SolarWeatherImpactAnalysis.tsx
│  │  ├── SpaceWeatherImpactSimulation.tsx
│  │  ├── SpaceWeatherSliderSimulation.tsx
│  │  ├── FooterReveal.tsx      # Footer with manual controls
│  │  └── ...
│  ├── App.tsx         # Page routing & global layout
│  └── main.tsx        # App entry
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Footer Controls

- The footer uses manual up/down arrow buttons to show/hide.
- A vertical “Footer” label sits between the buttons.
- Behavior is managed by `src/components/FooterReveal.tsx`.
- To change modes (scroll-based reveal), set `mode` on `<FooterReveal />` in `src/App.tsx` (`auto`, `nearBottom`, `onScroll`, `onScrollUp`, `onScrollDown`, `manual`).

## Customization

- Black bar text (top of footer): set in `FooterReveal.tsx`.
- Green banner text (footer): currently displays:
  `May no child ever weep for a parent lost to the storms of space`.
- Button order/actions and label styling are editable in the same file.

## Assets

- Images are in `Img/` and `src/assets/`.
- Some video references are optional and may not be present. If you see console errors like `net::ERR_ABORTED` for `/assets/video/*.mp4`, add your files under `public/assets/video/` or update the references.
- In `LandingPage.tsx`, images are referenced as `/Img/...`. Ensure the files exist under the project root `Img/` folder (e.g., `/Img/img-9.png`, `/Img/img-10.png`).

## Build & Deploy

1. `npm run build`
2. Serve the `dist/` folder with any static host (Netlify, Vercel, GitHub Pages, or a simple static server).

## License

This project includes a `LICENSE` file. See it for terms.
