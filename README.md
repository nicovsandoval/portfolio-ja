# Portfolio - Julio César Álvarez Gallo

Portafolio profesional online para Julio César Álvarez Gallo, Analista de Riesgo & Planeación Financiera.

## 🚀 Stack Tecnológico

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Internationalization**: react-i18next
- **Code Quality**: ESLint + Prettier

## 🎨 Características

### Diseño
- **Tema dual** (claro/oscuro) con detección automática de `prefers-color-scheme`
- **Bilingüe** (ES/EN) con detección automática del idioma del navegador
- **Responsive** mobile-first
- **Accesible** con navegación por teclado y ARIA labels
- **Menú flotante** tipo "pill" con efecto glass/blur (iOS-like)
- **Animaciones suaves** con respeto a `prefers-reduced-motion`

### Paleta de colores

#### Light Mode
- Background: `#F7F8FA`
- Surface: `#FFFFFF`
- Text: `#0F172A`
- Text Muted: `#475569`
- Border: `#E2E8F0`
- Primary: `#1E3A8A`
- Accent: `#0F766E`

#### Dark Mode
- Background: `#0B1220`
- Surface: `#0F172A`
- Text: `#E5E7EB`
- Text Muted: `#94A3B8`
- Border: `#1F2937`
- Primary: `#60A5FA`
- Accent: `#2DD4BF`

### Secciones
1. Hero
2. About / Perfil
3. Skills / Habilidades
4. Experience / Experiencia
5. Education & Courses / Educación y cursos
6. Impact Highlights / Impacto destacado
7. Contact / Contacto
8. Footer

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Format code
npm run format
```

## 🌐 Configuración de idioma y tema

### Detección automática de idioma

El sitio detecta automáticamente el idioma del navegador:
- Si el idioma del navegador comienza con "es", se muestra en español
- En cualquier otro caso, se muestra en inglés
- El usuario puede cambiar manualmente usando el selector ES/EN en el menú
- La preferencia manual se guarda en `localStorage` como `i18nextLng`
- Si el usuario NO ha elegido manualmente, el sitio responderá a cambios del idioma del sistema

### Detección automática de tema

El tema se detecta desde `prefers-color-scheme`:
- Si el sistema está en modo oscuro, se aplica el tema dark
- Si está en modo claro, se aplica el tema light
- El usuario puede cambiar manualmente con el botón de sol/luna
- La preferencia manual se guarda en `localStorage` como `theme-preference`
- Si el usuario NO ha fijado el tema manualmente, el sitio responderá a cambios del sistema en runtime

### Reducción de movimiento

El sitio respeta `prefers-reduced-motion: reduce`:
- Las animaciones se desactivan o reducen drásticamente
- El scroll suave se convierte en scroll instantáneo
- La duración de las transiciones se reduce a ~0ms

## 📂 Estructura del proyecto

```
portfolio/
├── public/
│   └── avatar.jpg          # Foto de perfil (placeholder)
├── src/
│   ├── components/         # Componentes de React
│   │   ├── GlassPillNav.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Education.tsx
│   │   ├── Impact.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── content/
│   │   └── cvData.ts       # Single source of truth (datos del CV)
│   ├── hooks/
│   │   ├── useTheme.ts     # Hook de tema (auto-detect + manual)
│   │   ├── useLanguage.ts  # Hook de idioma
│   │   └── useReducedMotion.ts
│   ├── i18n/
│   │   ├── config.ts       # Configuración de i18next
│   │   └── locales/
│   │       ├── es.json     # Traducciones en español
│   │       └── en.json     # Traducciones en inglés
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css           # Estilos globales + tokens CSS
├── .eslintrc.cjs
├── .prettierrc
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

## 📝 Datos del portafolio

Todos los datos se encuentran en [src/content/cvData.ts](src/content/cvData.ts) como single source of truth. Los textos de UI están en los archivos de traducción:
- [src/i18n/locales/es.json](src/i18n/locales/es.json)
- [src/i18n/locales/en.json](src/i18n/locales/en.json)

### Información personal
- Nombre: Julio César Álvarez Gallo
- Ubicación: Medellín, Colombia
- Email: jcalvarezg7@gmail.com
- Teléfono: (+57) 3114349546 (enmascarado por defecto)
- LinkedIn: https://www.linkedin.com/in/julalvar/

### Fechas de educación

La educación se muestra como **2019 – 2023** para mantener consistencia y evitar discrepancias entre las fechas de finalización (septiembre/agosto 2023 según versión ES/EN del CV). Se optó por mostrar solo años para mayor claridad.

## 🔒 Privacidad

- El teléfono personal se muestra enmascarado por defecto (`+57 311 ••• ••••`)
- El usuario debe hacer clic en "Mostrar teléfono" para revelarlo
- No se muestra fecha de nacimiento
- No se publican teléfonos de referencia

## 🎯 SEO

El sitio incluye meta tags básicos:
- Title y description dinámicos
- OpenGraph tags para compartir en redes sociales
- HTML semántico con etiquetas apropiadas

## 📱 Responsive

El diseño es mobile-first y se adapta a:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## ♿ Accesibilidad

- Navegación por teclado completa
- ARIA labels en botones y controles
- Focus visible en todos los elementos interactivos
- Contraste de colores WCAG AA
- Respeto a preferencias del sistema (reduced motion, color scheme)

## 🚀 Deployment

Para desplegar en producción:

```bash
npm run build
```

El contenido de la carpeta `dist/` puede ser servido por cualquier servidor estático o plataforma de hosting:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## 📄 Licencia

© 2026 Julio César Álvarez Gallo. Portafolio profesional.

---

Desarrollado con React + TypeScript + Tailwind CSS + Framer Motion
