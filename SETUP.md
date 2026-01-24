# Setup Rápido

## 1. Instalar dependencias

```bash
npm install
```

## 2. Ejecutar en desarrollo

```bash
npm run dev
```

El sitio estará disponible en: http://localhost:3000

## 3. Build para producción

```bash
npm run build
```

## 4. Preview del build

```bash
npm run preview
```

## Comandos adicionales

```bash
# Linting
npm run lint

# Format code con Prettier
npm run format
```

## Notas importantes

### Idioma
- Se detecta automáticamente desde `navigator.language`
- Se puede cambiar manualmente con el selector ES/EN
- Se guarda en `localStorage` como `i18nextLng`

### Tema
- Se detecta automáticamente desde `prefers-color-scheme`
- Se puede cambiar manualmente con el botón sol/luna
- Se guarda en `localStorage` como `theme-preference`

### Avatar
- Reemplaza `/public/avatar.jpg` con una foto real de perfil
- Formato recomendado: JPG o PNG, 400x400px mínimo

### CV para descarga
- Agrega los archivos PDF del CV en `/public/`:
  - `cv-es.pdf` (versión español)
  - `cv-en.pdf` (versión inglés)
- Luego actualiza los enlaces en el componente Hero.tsx

## Verificación

Después de `npm install`, verifica que:
1. El servidor de desarrollo inicie sin errores
2. El tema cambie correctamente (botón sol/luna)
3. El idioma cambie correctamente (botón ES/EN)
4. Todas las secciones se muestren correctamente
5. El menú flotante funcione en scroll
6. Las animaciones sean suaves
7. El sitio sea responsive en mobile

## Troubleshooting

Si encuentras errores:

1. **Error de módulos no encontrados**: Ejecuta `npm install` nuevamente
2. **Error de Tailwind**: Verifica que `postcss.config.js` exista
3. **Error de TypeScript**: Ejecuta `npm run build` para ver errores específicos
4. **Error de i18next**: Verifica que los archivos JSON en `src/i18n/locales/` sean válidos
