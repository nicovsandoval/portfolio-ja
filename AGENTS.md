# AGENTS

Contexto del proyecto

- Portafolio profesional de Julio Cesar Alvarez Gallo.
- SPA en React 18 + TypeScript con Vite y Tailwind.
- i18n con react-i18next (ES/EN) y tema claro/oscuro.

Stack y tooling

- React, TypeScript, Vite
- Tailwind CSS, PostCSS
- Framer Motion
- i18next + LanguageDetector
- ESLint + Prettier

Archivos y rutas clave

- UI principal: `src/components/*`
- Datos CV: `src/content/cvData.ts`
- Traducciones: `src/i18n/locales/es.json`, `src/i18n/locales/en.json`
- Config i18n: `src/i18n/config.ts`
- Tema/idioma: `src/hooks/useTheme.ts`, `src/hooks/useLanguage.ts`
- Estilos base y tokens CSS: `src/index.css`

Assets importantes

- Avatar: `public/avatar.jpg`
- CVs por idioma (descarga en Contact):
  - `public/cv/CV-Julio-ES.pdf`
  - `public/cv/CV-Julio-EN.pdf`

Comportamiento del sitio

- Idioma: detecta navegador, guarda en localStorage (`i18nextLng`).
- Tema: detecta `prefers-color-scheme` y permite toggle manual.
- Reduced motion: respeta `prefers-reduced-motion`.
- Boton de descarga de CV: solo en Contact, cambia segun idioma.

Navegacion

- Navbar tipo glass pill con indicador activo animado.
- Indicador usa medicion por `requestAnimationFrame` y anima con transform.

Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run format
```

Deploy

- Ejecuta `npm run build` y sirve `dist/` en hosting estatico.
