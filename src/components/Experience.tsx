import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { experience } from '../content/cvData';

export function Experience() {
  const { t, i18n } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const currentLang = i18n.language.startsWith('es') ? 'es' : 'en';

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-12 text-center">
            {t('experience.heading')}
          </h2>

          <div className="space-y-12">
            {experience.map((role, roleIndex) => (
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : roleIndex * 0.1,
                }}
                className="relative pl-8 border-l-2 border-light-accent dark:border-dark-accent"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-light-accent dark:bg-dark-accent" />

                <div className="mb-2">
                  <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
                    {role.title[currentLang]}
                  </h3>
                  <p className="text-light-primary dark:text-dark-primary font-semibold">
                    {role.company} · {role.location}
                  </p>
                  <p className="text-sm text-light-textMuted dark:text-dark-textMuted">
                    {role.period[currentLang]}
                  </p>
                </div>

                <ul className="space-y-2 mt-4">
                  {role.achievements[currentLang].map((achievement, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-light-textMuted dark:text-dark-textMuted"
                    >
                      <span className="text-light-accent dark:text-dark-accent mt-1.5">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
