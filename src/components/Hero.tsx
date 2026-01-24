import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { personalInfo } from '../content/cvData';

export function Hero() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mb-6"
        >
          <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-light-border dark:bg-dark-border">
            <img
              src="/avatar.jpg"
              alt={personalInfo.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"%3E%3Crect width="128" height="128" fill="%231E3A8A"/%3E%3Ctext x="50%25" y="50%25" font-size="48" fill="white" text-anchor="middle" dy=".3em"%3EJA%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-light-text dark:text-dark-text mb-2">
            {t('hero.titleName')}
          </h1>

          <p className="text-xl md:text-2xl text-light-primary dark:text-dark-primary font-semibold mb-2">
            {t('hero.role')}
          </p>

          <p className="text-lg text-light-textMuted dark:text-dark-textMuted">
            {t('hero.location')}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
          className="text-lg md:text-xl text-light-textMuted dark:text-dark-textMuted mb-8 max-w-3xl mx-auto"
        >
          {t('hero.tagline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={scrollToContact}
            className="px-8 py-3 bg-light-primary dark:bg-dark-primary text-white rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            {t('hero.ctaPrimary')}
          </button>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-light-primary dark:border-dark-primary text-light-primary dark:text-dark-primary rounded-full font-medium hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white transition-colors"
          >
            {t('hero.ctaSecondary')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
