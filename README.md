# JINNO8 Celebrations

A React and Vite event production website with an editorial black-and-gold design. Tailwind CSS and Lucide provide the styling utilities and icons; animations use IntersectionObserver, CSS, and the browser's Web Animations API.

## Local development

```sh
npm install
npm run dev
```

Production checks:

```sh
npm run build
npm run lint
npm run preview
```

## Design and content

- `src/components/Hero.jsx`: split-screen hero, decorative particles and original business statistics. Replace the `HERO_IMAGE` constant to update its photograph.
- `src/components/Accordion.jsx`: keyboard-accessible FAQ with animated opening and closing.
- `src/components/RegionOverview.jsx`: state and city coverage using the existing service-area data.
- `src/App.jsx`: business content, portfolio filtering, showreel controls, quotation dialogs and enquiry state.
- `src/index.css`: shared typography, champagne-gold palette, responsive layouts and motion preferences.
- `src/hooks/useScrollAnimations.js`: scroll reveals that keep content visible if animation support is unavailable.

The logo and hero photography are local assets under `public/images`. The hero and stage image are local copies of photographs already referenced by the original website; portfolio image sources are preserved.

Cormorant Garamond and Manrope are served locally from `public/fonts`. Their SIL Open Font License files are included alongside the font files.

The enquiry forms retain the original client-side confirmation behavior. They do not send enquiries to a backend; no new integration has been added.

Reduced-motion preferences disable animation and smooth scrolling. Mobile navigation, filters, video controls, dialogs and form state are maintained.
