type Theme = 'light' | 'dark';

const FALLBACK_LIGHT_BG = '#F8FAFC';
const FALLBACK_DARK_BG = '#0B1020';

function isIOSWebKit() {
  if (typeof navigator === 'undefined') return false;

  const ua = navigator.userAgent;
  const platform = navigator.platform;
  const isIOSDevice =
    /iPad|iPhone|iPod/.test(platform) ||
    (platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  return isIOSDevice && /AppleWebKit/i.test(ua);
}

function resolveThemeColor(theme: Theme) {
  const cssBg = getComputedStyle(document.documentElement)
    .getPropertyValue('--bg')
    .trim();

  if (cssBg) return cssBg;
  return theme === 'dark' ? FALLBACK_DARK_BG : FALLBACK_LIGHT_BG;
}

type ThemeMetas = {
  lightMeta: HTMLMetaElement;
  darkMeta: HTMLMetaElement;
};

function createThemeMeta(media: string, content: string) {
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'theme-color');
  meta.setAttribute('media', media);
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
  return meta;
}

function ensureDualThemeMetas(): ThemeMetas {
  const allThemeMetas = [
    ...document.head.querySelectorAll<HTMLMetaElement>(
      'meta[name="theme-color"]'
    ),
  ];

  let lightMeta = document.head.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"][media="(prefers-color-scheme: light)"]'
  );
  let darkMeta = document.head.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]'
  );

  if (!lightMeta && allThemeMetas.length > 0) {
    lightMeta = allThemeMetas[0];
    lightMeta.setAttribute('media', '(prefers-color-scheme: light)');
  }

  if (!lightMeta) {
    lightMeta = createThemeMeta(
      '(prefers-color-scheme: light)',
      FALLBACK_LIGHT_BG
    );
  }

  if (!darkMeta) {
    darkMeta = createThemeMeta(
      '(prefers-color-scheme: dark)',
      FALLBACK_DARK_BG
    );
  }

  const unique = new Set([lightMeta, darkMeta]);
  allThemeMetas.forEach((meta) => {
    if (!unique.has(meta)) {
      meta.remove();
    }
  });

  return { lightMeta, darkMeta };
}

function ensureColorSchemeMeta() {
  let meta = document.head.querySelector<HTMLMetaElement>(
    'meta[name="color-scheme"]'
  );
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'color-scheme');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', 'light dark');
}

function logThemeDebug(theme: Theme, activeColor: string, cssBg: string) {
  if (!import.meta.env.DEV) return;

  const activeMeta = document.head.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"][media="all"]'
  );

  console.log('[theme-color-sync]', {
    theme,
    cssBg,
    activeColor,
    activeMetaContent: activeMeta?.content,
    htmlDarkClass: document.documentElement.classList.contains('dark'),
    colorScheme: document.documentElement.style.colorScheme,
  });
}

/**
 * iOS Safari can ignore single theme-color updates at runtime.
 * We keep dual media theme-color metas and switch active one via media=all/not all.
 * Then we do a 2x rAF and replace the active node to force WebKit repaint.
 */
export function applyThemeToSafari(theme: Theme) {
  if (typeof document === 'undefined') return;

  const cssBg = resolveThemeColor(theme);
  const { lightMeta, darkMeta } = ensureDualThemeMetas();

  lightMeta.setAttribute(
    'content',
    theme === 'light' ? cssBg : FALLBACK_LIGHT_BG
  );
  darkMeta.setAttribute('content', theme === 'dark' ? cssBg : FALLBACK_DARK_BG);

  if (theme === 'dark') {
    darkMeta.setAttribute('media', 'all');
    lightMeta.setAttribute('media', 'not all');
  } else {
    lightMeta.setAttribute('media', 'all');
    darkMeta.setAttribute('media', 'not all');
  }

  document.documentElement.style.setProperty(
    'background-color',
    cssBg,
    'important'
  );
  if (document.body) {
    document.body.style.setProperty('background-color', cssBg, 'important');
  }

  ensureColorSchemeMeta();

  const activeMeta = theme === 'dark' ? darkMeta : lightMeta;

  if (isIOSWebKit()) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const replacement = activeMeta.cloneNode(true) as HTMLMetaElement;
        replacement.setAttribute('content', cssBg);
        activeMeta.replaceWith(replacement);

        document.documentElement.style.setProperty(
          'background-color',
          cssBg,
          'important'
        );
        if (document.body) {
          document.body.style.setProperty(
            'background-color',
            cssBg,
            'important'
          );
        }

        logThemeDebug(theme, cssBg, cssBg);
      });
    });
    return;
  }

  logThemeDebug(theme, cssBg, cssBg);
}
