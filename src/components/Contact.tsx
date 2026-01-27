import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLanguage } from '../hooks/useLanguage';
import { personalInfo } from '../content/cvData';

export function Contact() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const [phoneRevealed, setPhoneRevealed] = useState(false);

  const handleEmailClick = () => {
    window.location.href = `mailto:${personalInfo.email}`;
  };

  const handleLinkedInClick = () => {
    window.open(personalInfo.linkedin, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneReveal = () => {
    setPhoneRevealed(true);
  };

  const maskedPhone = phoneRevealed ? personalInfo.phone : `+57 311 ••• ••••`;
  const cvHref =
    language === 'es' ? '/cv/CV-Julio-ES.pdf' : '/cv/CV-Julio-EN.pdf';
  const cvFileName = language === 'es' ? 'CV-Julio-ES.pdf' : 'CV-Julio-EN.pdf';

  return (
    <section className="py-20 px-4 bg-light-surface dark:bg-dark-surface">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-6">
            {t('contact.heading')}
          </h2>

          <p className="text-lg text-light-textMuted dark:text-dark-textMuted mb-8">
            {t('contact.body')}
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <button
              onClick={handleEmailClick}
              className="flex items-center gap-2 px-6 py-3 bg-light-primary dark:bg-dark-primary text-white rounded-full font-medium hover:opacity-90 transition-opacity"
            >
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {t('contact.buttons.email')}
            </button>

            <button
              onClick={handleLinkedInClick}
              className="flex items-center gap-2 px-6 py-3 border-2 border-light-primary dark:border-dark-primary text-light-primary dark:text-dark-primary rounded-full font-medium hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white dark:hover:text-white active:bg-light-primary/90 dark:active:bg-dark-primary/90 active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-primary dark:focus-visible:ring-dark-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              {t('contact.buttons.linkedin')}
            </button>

            <a
              href={cvHref}
              download={cvFileName}
              className="flex items-center gap-2 px-6 py-3 border-2 border-light-primary/70 dark:border-dark-primary/70 text-light-primary dark:text-dark-primary rounded-full font-medium hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white dark:hover:text-white active:bg-light-primary/90 dark:active:bg-dark-primary/90 active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-primary dark:focus-visible:ring-dark-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg transition-colors"
            >
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
                  d="M12 16l4-4m0 0l-4-4m4 4H8m4 8a9 9 0 110-18 9 9 0 010 18z"
                />
              </svg>
              {t('contact.buttons.downloadCv')}
            </a>

            <button
              onClick={handlePhoneReveal}
              className="flex items-center gap-2 px-6 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text rounded-full font-medium hover:border-light-accent dark:hover:border-dark-accent transition-colors"
            >
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {phoneRevealed ? maskedPhone : t('contact.buttons.phoneReveal')}
            </button>
          </div>

          <p className="text-sm text-light-textMuted dark:text-dark-textMuted">
            {t('contact.note')}
          </p>

          <div className="mt-8 p-4 bg-light-bg dark:bg-dark-bg rounded-lg border border-light-border dark:border-dark-border">
            <p className="text-sm text-light-textMuted dark:text-dark-textMuted">
              {personalInfo.email}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
