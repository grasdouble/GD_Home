import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import projects from './projects.json';
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Search, Sparkles } from 'lucide-react';
import './style.css';

const ORG = 'grasdouble';

function App() {
  const repos = projects;
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');

  const categories = useMemo(() => ['Tous', ...new Set(repos.map((repo) => repo.language).filter(Boolean))], [repos]);
  const filteredRepos = repos
    .filter((repo) => activeFilter === 'Tous' || repo.language === activeFilter)
    .filter((repo) => `${repo.name} ${repo.description || ''} ${repo.language || ''}`.toLowerCase().includes(query.toLowerCase().trim()));

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Grasdouble, accueil"><span className="brand-mark">g.</span><span>grasdouble<span className="brand-dot">/</span>studio</span></a>
        <a className="org-link" href={`https://github.com/${ORG}`} target="_blank" rel="noreferrer"><Github size={16} /> Organisation GitHub <ArrowUpRight size={14} /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> COLLECTION NUMÉRIQUE <Sparkles size={14} /></div>
          <h1>Des idées qui<br /><span>prennent vie.</span></h1>
          <p className="intro">Les sites, expériences et projets web imaginés par <strong>Grasdouble</strong>. Un petit aperçu de ce que nous construisons.</p>
          <a className="explore-link" href="#projets">Explorer les projets <ArrowDown size={15} /></a>
        </div>
        <div className="hero-art" aria-label="Illustration abstraite colorée" role="img">
          <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
          <div className="art-sun" /><div className="art-card card-back" /><div className="art-card card-front"><span>G.</span><i /><i /><i /></div>
          <div className="art-spark spark-a">✳</div><div className="art-spark spark-b">✳</div><div className="art-label">FAIT AVEC<br />CURIOSITÉ</div>
        </div>
        <div className="hero-foot"><span>01 — COLLECTION DE PROJETS</span><span>FRANCE · DEPUIS 2015</span></div>
      </section>

      <section className="projects" id="projets">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> LE PORTFOLIO</div><h2>À découvrir<span className="heading-period">.</span></h2></div><div className="project-count"><span>{String(filteredRepos.length).padStart(2, '0')}</span> projets visibles</div></div>
        <div className="toolbar">
          <div className="filters" aria-label="Filtrer par technologie">{categories.map((category) => <button key={category} className={`filter-chip ${activeFilter === category ? 'selected' : ''}`} onClick={() => setActiveFilter(category)}>{category}</button>)}</div>
          <label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un projet" aria-label="Rechercher un projet" /><kbd>⌘ K</kbd></label>
        </div>
        <div className="grid-heading"><span>PROJETS ({filteredRepos.length})</span><span>ORDRE DE LA CONFIGURATION</span></div>
        {filteredRepos.length === 0 ? <div className="state-panel">Aucun projet ne correspond à cette recherche.</div> : <div className="project-grid">{filteredRepos.map((repo, index) => <article className="project-card" key={repo.id}>
          <div className={`project-visual visual-${index % 4}`}><span className="visual-index">{String(index + 1).padStart(2, '0')}</span><span className="visual-monogram fallback-monogram">{repo.name.replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase()}</span><img className="project-image" src={`${import.meta.env.BASE_URL}images/projects/${repo.id}.webp`} alt={`Aperçu de ${repo.name}`} onError={(event) => event.currentTarget.classList.add('image-missing')} /><span className="visual-caption">{repo.language || 'PROJET WEB'}</span><span className="visual-shape shape-one" /><span className="visual-shape shape-two" /></div>
          <div className="card-meta"><span>{repo.language || 'Projet'}</span><span>{repo.siteUrl ? <><span className="status-dot" /> EN LIGNE</> : 'SUR GITHUB'}</span></div>
          <h3>{repo.name}</h3><p className="card-description">{repo.description || 'Un projet de l’organisation Grasdouble.'}</p>
          <div className="card-footer"><a href={repo.siteUrl || repo.repositoryUrl} target="_blank" rel="noreferrer">{repo.siteUrl ? 'Visiter le site' : 'Voir le projet'} <ArrowUpRight size={15} /></a><span className="repo-actions"><a href={repo.repositoryUrl} target="_blank" rel="noreferrer" aria-label={`Dépôt GitHub ${repo.name}`}><Github size={16} /></a></span></div>
        </article>)}</div>}
      </section>
      <footer className="footer"><a className="brand" href="#top"><span className="brand-mark">g.</span><span>grasdouble<span className="brand-dot">/</span>studio</span></a><span>Collection configurée dans src/projects.json.</span><a href={`https://github.com/${ORG}`} target="_blank" rel="noreferrer">Le code source <ArrowRight size={14} /></a></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
