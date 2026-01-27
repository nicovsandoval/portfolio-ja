import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ImpactCard {
  title: string;
  body: string;
  metric: string;
}

export function Impact() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const cards = t('impact.cards', { returnObjects: true }) as ImpactCard[];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-3 text-center">
            {t('impact.heading')}
          </h2>
          <p className="text-light-textMuted dark:text-dark-textMuted text-center mb-12">
            {t('impact.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                }}
                className="bg-light-surface dark:bg-dark-surface rounded-xl p-6 border border-light-border dark:border-dark-border hover:border-light-accent dark:hover:border-dark-accent transition-colors"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full text-sm font-semibold">
                    {card.metric}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-2">
                  {card.title}
                </h3>

                <p className="text-light-textMuted dark:text-dark-textMuted text-sm">
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
