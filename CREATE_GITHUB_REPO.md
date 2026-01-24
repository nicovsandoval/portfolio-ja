# Crear repositorio en GitHub

## Opción 1: Usando GitHub CLI (Recomendado)

Si tienes GitHub CLI instalado, ejecuta:

```bash
# Crear repositorio público
gh repo create portfolio-ja --public --source=. --remote=origin --push

# O si prefieres privado
gh repo create portfolio-ja --private --source=. --remote=origin --push
```

## Opción 2: Manualmente desde GitHub.com

### Paso 1: Crear el repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `portfolio-ja`
3. Descripción: `Professional portfolio for Julio César Álvarez Gallo - Risk & Financial Planning Analyst`
4. Selecciona Público o Privado
5. **NO** inicialices con README, .gitignore o licencia (ya los tienes)
6. Click en "Create repository"

### Paso 2: Conectar el repositorio local con GitHub

Copia y pega estos comandos en tu terminal (reemplaza TU_USUARIO con tu usuario de GitHub):

```bash
cd "c:\Users\Nicolas\Desktop\julio\portfolio"

# Agregar el remote (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/portfolio-ja.git

# Renombrar branch a main (si prefieres main en vez de master)
git branch -M main

# Push inicial
git push -u origin main
```

## Opción 3: Installar GitHub CLI

### Windows (con winget)
```bash
winget install --id GitHub.cli
```

### Windows (con Chocolatey)
```bash
choco install gh
```

### Windows (con Scoop)
```bash
scoop install gh
```

Después de instalar, autentica con:
```bash
gh auth login
```

Y luego ejecuta el comando de la Opción 1.

---

## Verificación

Después de crear el repositorio, verifica que esté conectado:

```bash
git remote -v
```

Deberías ver:
```
origin  https://github.com/TU_USUARIO/portfolio-ja.git (fetch)
origin  https://github.com/TU_USUARIO/portfolio-ja.git (push)
```

## Próximos pasos

Una vez creado el repositorio en GitHub:

1. **Deploy en Vercel** (recomendado):
   - Ve a https://vercel.com
   - Click en "Import Project"
   - Conecta tu repositorio `portfolio-ja`
   - Vercel detectará automáticamente Vite
   - Deploy

2. **Deploy en Netlify**:
   - Ve a https://netlify.com
   - Click en "Add new site" > "Import an existing project"
   - Conecta GitHub y selecciona `portfolio-ja`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy

3. **Actualizar README.md**:
   - Agrega el link al sitio en vivo
   - Agrega badges (build status, etc.)

## Comandos útiles

```bash
# Ver status
git status

# Ver log
git log --oneline

# Crear nueva rama
git checkout -b feature/nueva-funcionalidad

# Push cambios
git add .
git commit -m "Descripción del cambio"
git push

# Pull cambios
git pull origin main
```

---

**Nota**: El commit inicial ya está creado localmente con 43 archivos y 7392 líneas de código.
