import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { skills } from '../content/cvData';

export function Skills() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const groupedSkills = {
    data: skills.filter((s) => s.category === 'data'),
    tools: skills.filter((s) => s.category === 'tools'),
    methods: skills.filter((s) => s.category === 'methods'),
    soft: skills.filter((s) => s.category === 'soft'),
  };

  return (
    <section className="py-20 px-4 bg-light-surface dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-3 text-center">
            {t('skills.heading')}
          </h2>
          <p className="text-light-textMuted dark:text-dark-textMuted text-center mb-12">
            {t('skills.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(groupedSkills).map(
              ([key, skillList], groupIndex) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.5,
                    delay: prefersReducedMotion ? 0 : groupIndex * 0.1,
                  }}
                  className="bg-light-bg dark:bg-dark-bg rounded-xl p-6 border border-light-border dark:border-dark-border"
                >
                  <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
                    {t(`skills.groups.${key}`)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.3,
                          delay: prefersReducedMotion ? 0 : index * 0.05,
                        }}
                        className="px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-full text-sm text-light-textMuted dark:text-dark-textMuted"
                      >
                        {t(`skills.items.${skill.name}`)}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
