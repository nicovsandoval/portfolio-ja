import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface NavItem {
  id: string;
  label: string;
}

interface NavConfig extends NavItem {
  mobileLabel: string;
  priority: number;
}

export function GlassPillNav() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState('hero');
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [moreMenuPosition, setMoreMenuPosition] = useState({
    top: 0,
    right: 0,
  });
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia('(max-width: 767px)').matches
  );
  const [visibleItems, setVisibleItems] = useState<NavItem[]>([]);
  const [overflowItems, setOverflowItems] = useState<NavItem[]>([]);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const navItems = useMemo<NavConfig[]>(
    () => [
      {
        id: 'about',
        label: t('nav.about'),
        mobileLabel: t('nav.mobile.about'),
        priority: 2,
      },
      {
        id: 'skills',
        label: t('nav.skills'),
        mobileLabel: t('nav.mobile.skills'),
        priority: 6,
      },
      {
        id: 'experience',
        label: t('nav.experience'),
        mobileLabel: t('nav.mobile.experience'),
        priority: 3,
      },
      {
        id: 'education',
        label: t('nav.education'),
        mobileLabel: t('nav.mobile.education'),
        priority: 5,
      },
      {
        id: 'impact',
        label: t('nav.impact'),
        mobileLabel: t('nav.mobile.impact'),
        priority: 4,
      },
      {
        id: 'contact',
        label: t('nav.contact'),
        mobileLabel: t('nav.mobile.contact'),
        priority: 1,
      },
    ],
    [t]
  );

  const desktopItems = useMemo(
    () => navItems.map((item) => ({ id: item.id, label: item.label })),
    [navItems]
  );

  const mobileItems = useMemo(
    () => navItems.map((item) => ({ id: item.id, label: item.mobileLabel })),
    [navItems]
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', ...navItems.map((item) => item.id)];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isFabOpen && !target.closest('.fab-container')) {
        setIsFabOpen(false);
      }
    };

    if (isFabOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isFabOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setVisibleItems(desktopItems);
      setOverflowItems([]);
      setIsMoreOpen(false);
      return;
    }

    const pill = pillRef.current;
    const measure = measureRef.current;
    const mobileNav = mobileNavRef.current;
    if (!pill || !measure || !mobileNav) return;

    const calculateLayout = () => {
      const pillStyles = window.getComputedStyle(pill);
      const paddingX =
        parseFloat(pillStyles.paddingLeft) +
        parseFloat(pillStyles.paddingRight);
      const navStyles = window.getComputedStyle(mobileNav);
      const gapValue = parseFloat(navStyles.columnGap || navStyles.gap || '0');
      const availableWidth = pill.clientWidth - paddingX;

      const widthMap = new Map<string, number>();
      measure
        .querySelectorAll<HTMLElement>('[data-measure-id]')
        .forEach((node) => {
          const key = node.dataset.measureId;
          if (key) {
            widthMap.set(key, node.offsetWidth);
          }
        });

      const moreWidth =
        measure.querySelector<HTMLElement>('[data-measure-more]')
          ?.offsetWidth ?? 0;

      const totalItemsWidth = mobileItems.reduce(
        (sum, item) => sum + (widthMap.get(item.id) ?? 0),
        0
      );
      const totalGapWidth = gapValue * Math.max(mobileItems.length - 1, 0);

      if (totalItemsWidth + totalGapWidth <= availableWidth) {
        setVisibleItems(mobileItems);
        setOverflowItems([]);
        setIsMoreOpen(false);
        return;
      }

      let usedWidth = moreWidth;
      const visibleIds = new Set<string>();
      const prioritized = [...navItems].sort((a, b) => a.priority - b.priority);

      prioritized.forEach((item) => {
        const width = widthMap.get(item.id);
        if (!width) return;
        const nextWidth = usedWidth + gapValue + width;
        if (nextWidth <= availableWidth) {
          usedWidth = nextWidth;
          visibleIds.add(item.id);
        }
      });

      const visible = mobileItems.filter((item) => visibleIds.has(item.id));
      const overflow = mobileItems.filter((item) => !visibleIds.has(item.id));

      setVisibleItems(visible);
      setOverflowItems(overflow);
      if (overflow.length === 0) {
        setIsMoreOpen(false);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(calculateLayout);
    });

    resizeObserver.observe(pill);
    requestAnimationFrame(calculateLayout);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isMobile, navItems, desktopItems, mobileItems]);

  useEffect(() => {
    if (!isMoreOpen) return;

    const updatePosition = () => {
      const rect = moreButtonRef.current?.getBoundingClientRect();
      if (!rect) return;
      const rightOffset = Math.max(12, window.innerWidth - rect.right);
      setMoreMenuPosition({
        top: rect.bottom + 8,
        right: rightOffset,
      });
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMoreOpen(false);
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    document.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMoreOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const handleMobileNavClick = (id: string) => {
    scrollToSection(id);
    setIsMoreOpen(false);
  };

  const mobileVisibleItems =
    visibleItems.length > 0 ? visibleItems : mobileItems;
  const showMoreButton = isMobile && overflowItems.length > 0;

  const moreMenuPortal =
    isMoreOpen && showMoreButton
      ? createPortal(
          <>
            <button
              type="button"
              className="fixed inset-0 z-[9998] cursor-default"
              aria-label={t('aria.closeMenu')}
              onClick={() => setIsMoreOpen(false)}
            />
            <div
              className="fixed z-[9999] glass-pill rounded-2xl p-2 min-w-[200px] border border-white/10"
              style={{
                top: `calc(${moreMenuPosition.top}px + env(safe-area-inset-top, 0px))`,
                right: moreMenuPosition.right,
              }}
              role="menu"
            >
              <div className="flex flex-col gap-1">
                {overflowItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMobileNavClick(item.id)}
                    className={`
                    px-3 py-2 rounded-xl text-left text-sm font-medium transition-colors
                    ${
                      activeSection === item.id
                        ? 'text-white bg-light-primary/90 dark:bg-dark-primary/90'
                        : 'text-light-text dark:text-dark-text hover:bg-light-border/30 dark:hover:bg-dark-border/30'
                    }
                  `}
                    role="menuitem"
                    aria-label={t('aria.scrollToSection', {
                      section: item.label,
                    })}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </>,
          document.body
        )
      : null;

  return (
    <>
      {/* Main Navigation Pill */}
      <div
        className="fixed z-50 left-1/2 -translate-x-1/2"
        style={{
          top: 'calc(12px + env(safe-area-inset-top, 0px))',
        }}
      >
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          aria-label={t('aria.navigation')}
        >
          <div
            ref={pillRef}
            className="glass-pill glass-highlight rounded-full px-4 py-2 max-[360px]:px-3 max-[320px]:px-2 sm:px-3 sm:py-2.5 flex items-center gap-3 max-[360px]:gap-2 max-[320px]:gap-1 w-[min(94vw,720px)] md:w-fit md:max-w-[900px] overflow-hidden"
          >
            {/* Mobile Navigation */}
            <div
              ref={mobileNavRef}
              className="flex items-center justify-center gap-2 max-[360px]:gap-1 flex-nowrap md:hidden"
            >
              {mobileVisibleItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMobileNavClick(item.id)}
                  className={`
                    relative flex-shrink-0 px-3 py-1.5 max-[360px]:px-2 max-[320px]:px-1.5 max-[360px]:py-1.5 rounded-full text-sm max-[360px]:tracking-tight font-semibold transition-all whitespace-nowrap
                    ${
                      activeSection === item.id
                        ? 'text-white'
                        : 'text-light-text dark:text-dark-text hover:bg-light-border/30 dark:hover:bg-dark-border/30'
                    }
                  `}
                  aria-label={t('aria.scrollToSection', {
                    section: item.label,
                  })}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSectionMobile"
                      className="absolute inset-0 bg-light-primary dark:bg-dark-primary rounded-full -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {item.label}
                </button>
              ))}

              {showMoreButton && (
                <button
                  ref={moreButtonRef}
                  onClick={() => setIsMoreOpen((prev) => !prev)}
                  className={`
                    relative flex-shrink-0 px-3 py-1.5 max-[360px]:px-2 max-[320px]:px-1.5 max-[360px]:py-1.5 rounded-full text-sm max-[360px]:tracking-tight font-semibold transition-all whitespace-nowrap
                    ${
                      isMoreOpen
                        ? 'text-white'
                        : 'text-light-text dark:text-dark-text hover:bg-light-border/30 dark:hover:bg-dark-border/30'
                    }
                  `}
                  aria-label={t('aria.moreNavigation')}
                  aria-expanded={isMoreOpen}
                  aria-haspopup="menu"
                >
                  {isMoreOpen && (
                    <motion.div
                      layoutId="moreMenuToggle"
                      className="absolute inset-0 bg-light-primary dark:bg-dark-primary rounded-full -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {t('nav.mobile.more')}
                </button>
              )}
            </div>

            <div
              ref={measureRef}
              className="absolute -left-[9999px] top-0 opacity-0 pointer-events-none md:hidden"
            >
              <div className="flex items-center gap-3 max-[360px]:gap-2 max-[320px]:gap-1">
                {mobileItems.map((item) => (
                  <span
                    key={item.id}
                    data-measure-id={item.id}
                    className="px-3 py-1.5 max-[360px]:px-2 max-[320px]:px-1.5 max-[360px]:py-1.5 rounded-full text-sm max-[360px]:tracking-tight font-semibold whitespace-nowrap"
                  >
                    {item.label}
                  </span>
                ))}
                <span
                  data-measure-more
                  className="px-3 py-1.5 max-[360px]:px-2 max-[320px]:px-1.5 max-[360px]:py-1.5 rounded-full text-sm max-[360px]:tracking-tight font-semibold whitespace-nowrap"
                >
                  {t('nav.mobile.more')}
                </span>
              </div>
            </div>

            {/* Desktop Navigation items */}
            <div className="hidden md:flex flex-1 sm:flex-shrink min-w-0 overflow-x-auto no-scrollbar fade-edges">
              <div className="flex items-center gap-0.5 sm:gap-1 flex-nowrap pl-2 pr-4">
                {desktopItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`
                    relative flex-shrink-0 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-1.5 md:py-2 rounded-full text-sm sm:text-sm font-medium transition-all whitespace-nowrap
                    ${
                      activeSection === item.id
                        ? 'text-white'
                        : 'text-light-text dark:text-dark-text hover:bg-light-border/30 dark:hover:bg-dark-border/30'
                    }
                  `}
                    aria-label={t('aria.scrollToSection', {
                      section: item.label,
                    })}
                  >
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-light-primary dark:bg-dark-primary rounded-full -z-10"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Controls - hidden on mobile */}
            <div className="hidden md:flex items-center gap-1 flex-shrink-0 ml-1 pl-2 border-l border-light-border/30 dark:border-dark-border/30">
              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 rounded-full text-sm font-semibold text-light-text dark:text-dark-text hover:bg-light-border/30 dark:hover:bg-dark-border/30 transition-colors"
                aria-label={t('aria.toggleLanguage')}
              >
                {language === 'es' ? 'EN' : 'ES'}
              </button>

              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full text-light-text dark:text-dark-text hover:bg-light-border/30 dark:hover:bg-dark-border/30 transition-colors"
                aria-label={t('aria.toggleTheme')}
              >
                {theme === 'light' ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {moreMenuPortal}

      {/* Mobile FAB - only visible on mobile */}
      <div className="md:hidden fab-container">
        <AnimatePresence>
          {isFabOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              style={{
                bottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
              }}
              className="fixed right-4 z-50"
            >
              <div className="glass-pill rounded-2xl p-3 min-w-[140px]">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      toggleLanguage();
                      setIsFabOpen(false);
                    }}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-light-text dark:text-dark-text hover:bg-light-border/30 dark:hover:bg-dark-border/30 transition-colors"
                    aria-label={t('aria.toggleLanguage')}
                  >
                    <span>Idioma</span>
                    <span className="font-semibold">
                      {language === 'es' ? 'ES' : 'EN'}
                    </span>
                  </button>

                  <div className="h-px bg-light-border/30 dark:bg-dark-border/30" />

                  <button
                    onClick={() => {
                      toggleTheme();
                      setIsFabOpen(false);
                    }}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-light-text dark:text-dark-text hover:bg-light-border/30 dark:hover:bg-dark-border/30 transition-colors"
                    aria-label={t('aria.toggleTheme')}
                  >
                    <span>Tema</span>
                    {theme === 'light' ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.3, type: 'spring' }}
          onClick={() => setIsFabOpen(!isFabOpen)}
          style={{
            bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
          }}
          className={`
            fixed right-4 z-50 w-14 h-14 rounded-full glass-pill shadow-lg
            flex items-center justify-center transition-transform active:scale-95
            ${isFabOpen ? 'rotate-45' : ''}
          `}
          aria-label="Abrir opciones"
        >
          <svg
            className="w-6 h-6 text-light-text dark:text-dark-text transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </motion.button>
      </div>
    </>
  );
}
