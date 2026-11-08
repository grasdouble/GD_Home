import { useMemo } from 'react';
import { Search } from 'lucide-react';
import { filterProjects } from '../project-filter.js';
import ProjectCard from './ProjectCard.jsx';
import styles from './Projects.module.css';

export default function Projects({ repos, locale, text, query, onQueryChange, activeFilter, onFilterChange }) {
  const categories = useMemo(
    () => [locale === 'fr' ? 'Tous' : 'All', ...new Set(repos.map((repo) => repo.language).filter(Boolean))],
    [repos, locale],
  );
  const filteredRepos = useMemo(
    () => filterProjects(repos, { language: activeFilter === 'All' ? 'Tous' : activeFilter, query }),
    [repos, activeFilter, query],
  );

  return (
    <section className={styles.projects} id="projets">
      <div className={styles.heading}>
        <h2>{text.discover}<span>.</span></h2>
        <div className={styles.count}><span>{String(filteredRepos.length).padStart(2, '0')}</span> {text.visible}</div>
      </div>
      <div className={styles.toolbar}>
        <div className={styles.filters} aria-label={text.filter}>
          {categories.map((category) => {
            const selected = activeFilter === category
              || (category === 'All' && activeFilter === 'Tous')
              || (category === 'Tous' && activeFilter === 'All');
            return (
              <button key={category} type="button" aria-pressed={selected} className={`${styles.filterChip} ${selected ? styles.selected : ''}`} onClick={() => onFilterChange(category === 'All' ? 'Tous' : category)}>
                {category}
              </button>
            );
          })}
        </div>
        <label className={styles.searchBox}>
          <Search size={16} />
          <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={text.search} aria-label={text.search} />
          <kbd>⌘ K</kbd>
        </label>
      </div>
      {filteredRepos.length === 0
        ? <div className={styles.emptyState}>{text.empty}</div>
        : <div className={styles.grid}>{filteredRepos.map((repo, index) => (
          <ProjectCard key={repo.id} project={repo} index={index} locale={locale} text={text} />
        ))}</div>}
    </section>
  );
}
