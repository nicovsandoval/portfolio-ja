import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-light-textMuted dark:text-dark-textMuted">
          {t('footer.text', { year: currentYear })}
        </p>
      </div>
    </footer>
  );
}
