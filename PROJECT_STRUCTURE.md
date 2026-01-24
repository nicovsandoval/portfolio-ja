# Estructura del Proyecto

```
portfolio/
│
├── public/                      # Assets estáticos
│   ├── avatar.jpg              # Foto de perfil (placeholder - reemplazar)
│   ├── avatar.svg              # Alternativa SVG
│   └── vite.svg                # Logo de Vite
│
├── src/                        # Código fuente
│   ├── components/             # Componentes de React
│   │   ├── GlassPillNav.tsx   # Menú flotante con glass effect
│   │   ├── Hero.tsx           # Sección principal/hero
│   │   ├── About.tsx          # Perfil profesional
│   │   ├── Skills.tsx         # Habilidades técnicas
│   │   ├── Experience.tsx     # Experiencia laboral (timeline)
│   │   ├── Education.tsx      # Educación y cursos
│   │   ├── Impact.tsx         # Impacto y logros destacados
│   │   ├── Contact.tsx        # Información de contacto
│   │   └── Footer.tsx         # Pie de página
│   │
│   ├── content/               # Datos estructurados
│   │   └── cvData.ts          # Single source of truth (CV data)
│   │
│   ├── hooks/                 # React hooks personalizados
│   │   ├── useTheme.ts        # Hook para tema claro/oscuro
│   │   ├── useLanguage.ts     # Hook para cambio de idioma
│   │   └── useReducedMotion.ts # Hook para accesibilidad
│   │
│   ├── i18n/                  # Internacionalización
│   │   ├── config.ts          # Configuración de i18next
│   │   └── locales/
│   │       ├── es.json        # Traducciones español
│   │       └── en.json        # Traducciones inglés
│   │
│   ├── App.tsx                # Componente raíz
│   ├── main.tsx               # Entry point
│   ├── index.css              # Estilos globales + tokens CSS
│   └── vite-env.d.ts          # TypeScript definitions
│
├── .eslintrc.cjs              # Configuración ESLint
├── .prettierrc                # Configuración Prettier
├── .gitignore                 # Git ignore
├── index.html                 # HTML principal
├── package.json               # Dependencias y scripts
├── postcss.config.js          # PostCSS config (Tailwind)
├── tailwind.config.js         # Configuración Tailwind
├── tsconfig.json              # TypeScript config
├── tsconfig.node.json         # TypeScript config para Node
├── vite.config.ts             # Configuración Vite
├── README.md                  # Documentación principal
├── SETUP.md                   # Guía de setup rápido
├── DEPLOYMENT.md              # Guía de deployment
└── PROJECT_STRUCTURE.md       # Este archivo
```

## Archivos clave

### Configuración
- `package.json`: Dependencias y scripts npm
- `vite.config.ts`: Configuración del bundler
- `tailwind.config.js`: Tema y colores personalizados
- `tsconfig.json`: Configuración de TypeScript

### Datos
- `src/content/cvData.ts`: Todos los datos del CV (personal, skills, experience, education)
- `src/i18n/locales/es.json`: Todos los textos en español
- `src/i18n/locales/en.json`: Todos los textos en inglés

### Lógica principal
- `src/hooks/useTheme.ts`: Auto-detección y cambio de tema
- `src/hooks/useLanguage.ts`: Auto-detección y cambio de idioma
- `src/App.tsx`: Composición de todos los componentes

### Estilos
- `src/index.css`: Variables CSS, glass effect, focus states
- `tailwind.config.js`: Paleta de colores light/dark

## Flujo de datos

1. **Datos del CV**: `cvData.ts` → Componentes
2. **Traducciones**: `locales/*.json` → `useTranslation()` → Componentes
3. **Tema**: `prefers-color-scheme` → `useTheme()` → CSS classes
4. **Idioma**: `navigator.language` → `useLanguage()` → i18next

## Componentes reutilizables

Todos los componentes son modulares y pueden editarse independientemente:
- Cambiar el contenido: Edita `cvData.ts` y `locales/*.json`
- Cambiar estilos: Edita `tailwind.config.js` o clases inline
- Cambiar animaciones: Edita las configuraciones de Framer Motion

## Personalización

### Colores
Edita `tailwind.config.js` en `theme.extend.colors`

### Tipografía
Cambia la fuente en `index.html` (Google Fonts) y `tailwind.config.js`

### Contenido
Edita `src/content/cvData.ts` y `src/i18n/locales/*.json`

### Animaciones
Ajusta durations y delays en cada componente (Framer Motion)
