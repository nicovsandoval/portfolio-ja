import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface NavItem {
  id: string;
  label: string;
}

export function GlassPillNav() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState('hero');
  const [isFabOpen, setIsFabOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'about', label: t('nav.about') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'education', label: t('nav.education') },
    { id: 'impact', label: t('nav.impact') },
    { id: 'contact', label: t('nav.contact') },
  ];

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

  return (
    <>
      {/* Main Navigation Pill */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        style={{
          top: 'calc(12px + env(safe-area-inset-top, 0px))',
        }}
        className="fixed left-1/2 -translate-x-1/2 z-50 w-fit"
        aria-label={t('aria.navigation')}
      >
        <div className="glass-pill glass-highlight rounded-full px-1.5 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2 w-[min(92vw,900px)] sm:w-fit">
          {/* Navigation items - scrollable on mobile, fit on desktop */}
          <div className="flex-1 sm:flex-shrink min-w-0 overflow-x-auto no-scrollbar fade-edges">
            <div className="flex items-center gap-0.5 sm:gap-1 flex-nowrap">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    relative flex-shrink-0 px-2 sm:px-3 md:px-4 py-1.5 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap
                    ${
                      activeSection === item.id
                        ? 'text-white'
                        : 'text-light-text dark:text-dark-text hover:bg-light-border/30 dark:hover:bg-dark-border/30'
                    }
                  `}
                  aria-label={t('aria.scrollToSection', { section: item.label })}
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
