# Portfolio - Julio Cesar Alvarez Gallo

Portafolio profesional en React, Vite y Tailwind con tema claro/oscuro y contenido bilingue (ES/EN).

Requisitos

- Node.js 18+ y npm

Instalacion y uso

```bash
npm install
npm run dev
```

Comandos utiles

```bash
npm run build
npm run preview
npm run lint
npm run format
```

Contenido y edicion

- Datos del CV: `src/content/cvData.ts`
- Textos UI ES/EN: `src/i18n/locales/es.json`, `src/i18n/locales/en.json`
- Estilos globales y tokens CSS: `src/index.css`

Assets

- Avatar: `public/avatar.jpg`
- CVs por idioma (descarga en Contact):
  - `public/cv/CV-Julio-ES.pdf`
  - `public/cv/CV-Julio-EN.pdf`

Comportamiento clave

- Idioma: i18next detecta navegador y guarda preferencia en localStorage (`i18nextLng`).
- Tema: auto-deteccion por `prefers-color-scheme` y toggle manual.
- Reduced motion: respeta `prefers-reduced-motion`.

Estructura principal

```
public/
  avatar.jpg
  cv/
    CV-Julio-ES.pdf
    CV-Julio-EN.pdf
src/
  components/
  content/cvData.ts
  hooks/
  i18n/
  App.tsx
  main.tsx
  index.css
```

Deploy

```bash
npm run build
```

Sirve el contenido de `dist/` en cualquier hosting estatico (Vercel, Netlify, Cloudflare Pages, etc.).

Licencia
Copyright (c) 2026 Julio Cesar Alvarez Gallo.
