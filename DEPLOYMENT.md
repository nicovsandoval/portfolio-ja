# Guía de Deployment

## Vercel (Recomendado)

1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa el repositorio
4. Vercel detectará automáticamente Vite
5. Deploy

### Configuración Vercel

No requiere configuración adicional. Vercel detecta automáticamente:
- Build Command: `vite build`
- Output Directory: `dist`
- Install Command: `npm install`

## Netlify

1. Sube el proyecto a GitHub
2. Ve a [netlify.com](https://netlify.com)
3. Importa el repositorio
4. Configura:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy

### Configuración Netlify (opcional)

Crea `netlify.toml` en la raíz:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## GitHub Pages

1. Instala gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Agrega en `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://tu-usuario.github.io/portfolio"
}
```

3. Actualiza `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/portfolio/', // nombre de tu repo
  plugins: [react()],
});
```

4. Deploy:
```bash
npm run deploy
```

## Cloudflare Pages

1. Sube a GitHub
2. Ve a Cloudflare Pages
3. Importa el repositorio
4. Configura:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
5. Deploy

## Variables de entorno (si las necesitas)

Si en el futuro necesitas variables de entorno:

1. Crea `.env` en la raíz:
```
VITE_API_URL=https://api.example.com
```

2. Úsalas en el código:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

3. En Vercel/Netlify, agrégalas en el panel de configuración

## Dominio personalizado

### Vercel
1. Ve a Settings > Domains
2. Agrega tu dominio
3. Configura los DNS según las instrucciones

### Netlify
1. Ve a Domain Settings
2. Add custom domain
3. Configura los DNS según las instrucciones

## SSL/HTTPS

Todas las plataformas mencionadas incluyen SSL automático y gratuito.

## Optimizaciones pre-deployment

Antes de hacer deploy, verifica:

1. **Build local exitoso**:
```bash
npm run build
```

2. **No hay warnings de TypeScript**:
```bash
npx tsc --noEmit
```

3. **Linting sin errores**:
```bash
npm run lint
```

4. **Tamaño del bundle**:
Después de `npm run build`, revisa el tamaño en la consola.

5. **Assets optimizados**:
- Comprime imágenes (avatar.jpg)
- Agrega los PDFs del CV

## Performance

Para mejorar performance:

1. **Lazy loading de imágenes** (ya implementado)
2. **Code splitting automático** (Vite lo hace)
3. **Minificación** (Vite lo hace en build)
4. **Compresión Gzip/Brotli** (las plataformas lo hacen)

## Monitoreo

Considera agregar:
- Google Analytics
- Vercel Analytics
- Sentry para error tracking

## Actualizaciones

Para actualizar el sitio:
1. Haz cambios localmente
2. Commit y push a GitHub
3. El deploy se hace automáticamente (CI/CD)

O si prefieres control manual, desactiva auto-deploy en la plataforma.
