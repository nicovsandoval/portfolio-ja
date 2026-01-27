import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { education, courses } from '../content/cvData';

export function Education() {
  const { t, i18n } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const currentLang = i18n.language.startsWith('es') ? 'es' : 'en';

  return (
    <section className="py-20 px-4 bg-light-surface dark:bg-dark-surface">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-12 text-center">
            {t('education.heading')}
          </h2>

          <div className="bg-light-bg dark:bg-dark-bg rounded-xl p-6 md:p-8 border border-light-border dark:border-dark-border mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-light-primary dark:bg-dark-primary rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-1">
                  {education.program[currentLang]}
                </h3>
                <p className="text-light-primary dark:text-dark-primary font-semibold">
                  {education.institution}
                </p>
                <p className="text-sm text-light-textMuted dark:text-dark-textMuted">
                  {education.location} · {education.period}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
              {t('education.coursesTitle')}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.4,
                    delay: prefersReducedMotion ? 0 : index * 0.1,
                  }}
                  className="bg-light-bg dark:bg-dark-bg rounded-lg p-4 border border-light-border dark:border-dark-border"
                >
                  <p className="font-semibold text-light-text dark:text-dark-text mb-1">
                    {course.name[currentLang]}
                  </p>
                  <p className="text-sm text-light-textMuted dark:text-dark-textMuted">
                    {course.date}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
