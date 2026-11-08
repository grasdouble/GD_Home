import { ArrowUpRight, Github } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ locale, onLocaleChange, organizationLabel, languageLabel }) {
  return (
    <header className={styles.topbar}>
      <div className={styles.actions}>
        <div className={styles.languageSwitch} role="group" aria-label={languageLabel}>
          {['fr', 'en'].map((language) => (
            <button
              key={language}
              type="button"
              className={locale === language ? styles.selected : ''}
              aria-pressed={locale === language}
              onClick={() => onLocaleChange(language)}
            >
              {language.toUpperCase()}
            </button>
          ))}
        </div>
        <a className={styles.orgLink} href="https://github.com/grasdouble" target="_blank" rel="noreferrer">
          <Github size={16} /> {organizationLabel} <ArrowUpRight size={14} />
        </a>
      </div>
    </header>
  );
}
