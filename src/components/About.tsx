import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function About() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const highlights = t('about.highlights', { returnObjects: true }) as string[];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-6">
            {t('about.heading')}
          </h2>

          <p className="text-lg text-light-textMuted dark:text-dark-textMuted mb-8 leading-relaxed">
            {t('about.body')}
          </p>

          <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
            {t('about.highlightsTitle')}
          </h3>

          <ul className="space-y-3">
            {highlights.map((highlight, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                }}
                className="flex items-start gap-3"
              >
                <span className="text-light-accent dark:text-dark-accent mt-1">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-light-textMuted dark:text-dark-textMuted">
                  {highlight}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
