import { useEffect, useState } from 'react';
import projects from './projects.json';
import styles from './App.module.css';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import translations from './translations.jsx';

function getInitialLocale() {
  try {
    const savedLocale = localStorage.getItem('grasdouble-locale');
    if (savedLocale === 'en' || savedLocale === 'fr') return savedLocale;
  } catch {}

  const browserLocales = navigator.languages?.length ? navigator.languages : [navigator.language];
  const preferredLocale = browserLocales.find((language) => /^(en|fr)(-|$)/i.test(language ?? ''));
  return preferredLocale?.toLowerCase().startsWith('en') ? 'en' : 'fr';
}

export default function App() {
  const [locale, setLocale] = useState(getInitialLocale);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');
  const text = translations[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    try { localStorage.setItem('grasdouble-locale', locale); } catch {}
  }, [locale]);

  return (
    <main className={styles.pageShell}>
      <Header
        locale={locale}
        onLocaleChange={setLocale}
        organizationLabel={text.organization}
        languageLabel={text.langLabel}
      />
      <Hero
        headline={text.headline}
        intro={text.intro}
        explore={text.explore}
        illustrationLabel={locale === 'fr' ? 'Panda GrasDouble devant un ordinateur' : 'GrasDouble panda at a computer'}
      />
      <Projects
        repos={projects}
        locale={locale}
        text={text}
        query={query}
        onQueryChange={setQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
    </main>
  );
}
