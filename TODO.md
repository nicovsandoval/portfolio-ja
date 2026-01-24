# Checklist de Personalización

Tareas pendientes para finalizar el portafolio:

## 📸 Assets

- [ ] Reemplazar `/public/avatar.jpg` con una foto de perfil profesional
  - Formato: JPG o PNG
  - Tamaño mínimo: 400x400px
  - Fondo neutro o corporativo

- [ ] Agregar PDFs del CV (opcional)
  - `/public/cv-es.pdf` (versión español)
  - `/public/cv-en.pdf` (versión inglés)
  - Actualizar enlaces en `src/components/Hero.tsx` si se agregan

## 🎨 Personalización visual (opcional)

- [ ] Revisar paleta de colores en `tailwind.config.js`
  - Light mode: Ajustar si es necesario
  - Dark mode: Ajustar si es necesario

- [ ] Revisar tipografía
  - Actual: Inter (Google Fonts)
  - Cambiar en `index.html` y `tailwind.config.js` si prefieres otra

- [ ] Ajustar animaciones
  - Si prefieres más o menos movimiento
  - Editar `duration` y `delay` en componentes

## 📝 Contenido

- [ ] Verificar datos en `src/content/cvData.ts`
  - Email correcto
  - Teléfono correcto
  - LinkedIn correcto
  - Skills actualizadas

- [ ] Revisar traducciones
  - `src/i18n/locales/es.json`
  - `src/i18n/locales/en.json`
  - Ajustar textos si es necesario

## 🚀 Deploy

- [ ] Crear repositorio en GitHub
- [ ] Subir código a GitHub
- [ ] Elegir plataforma de hosting
  - [ ] Vercel (recomendado)
  - [ ] Netlify
  - [ ] GitHub Pages
  - [ ] Cloudflare Pages

- [ ] Hacer deploy inicial
- [ ] Verificar que todo funcione en producción
- [ ] Configurar dominio personalizado (opcional)

## 🔍 SEO y Analytics (opcional)

- [ ] Actualizar meta tags en `index.html`
  - Title
  - Description
  - OpenGraph image

- [ ] Agregar Google Analytics (opcional)
- [ ] Agregar favicon personalizado
- [ ] Generar sitemap.xml (opcional)

## ✅ Testing final

- [ ] Probar en diferentes navegadores
  - Chrome
  - Firefox
  - Safari
  - Edge

- [ ] Probar en diferentes dispositivos
  - Mobile (iOS/Android)
  - Tablet
  - Desktop

- [ ] Verificar funcionalidades
  - [ ] Cambio de tema (light/dark)
  - [ ] Cambio de idioma (ES/EN)
  - [ ] Scroll suave a secciones
  - [ ] Enlaces externos (LinkedIn, email)
  - [ ] Botón "Mostrar teléfono"
  - [ ] Navegación por teclado
  - [ ] Animaciones suaves

## 📱 Compartir

- [ ] Agregar el link en LinkedIn
- [ ] Agregar el link en CV
- [ ] Compartir en redes profesionales

## 🔄 Mantenimiento futuro

- [ ] Actualizar experiencia laboral cuando cambie
- [ ] Agregar nuevos cursos/certificaciones
- [ ] Actualizar skills según evolucione
- [ ] Agregar nuevos proyectos/logros

---

## Notas

- Todos los datos están centralizados en `src/content/cvData.ts`
- Todos los textos están en `src/i18n/locales/*.json`
- No hay información inventada, todo es del CV original
- El diseño es corporativo y elegante, apropiado para finanzas/riesgo
