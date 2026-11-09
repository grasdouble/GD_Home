import { ArrowUpRight, Github } from 'lucide-react';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, index, locale, text }) {
  function handleImageError(event) {
    const image = event.currentTarget;
    if (project.placeholderImage && image.dataset.placeholder !== 'true') {
      image.dataset.placeholder = 'true';
      image.src = `${import.meta.env.BASE_URL}images/project-placeholders/${project.placeholderImage}`;
      return;
    }
    image.classList.add(styles.imageMissing);
  }
  return (
    <article className={styles.card}>
      <div className={`${styles.visual} ${styles[`visual${index % 4}`]}`}>
        <span className={styles.visualIndex}>{String(index + 1).padStart(2, '0')}</span>
        <span className={styles.monogram}>{project.name.replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase()}</span>
        <img
          className={styles.image}
          src={`${import.meta.env.BASE_URL}images/projects/${project.id}.webp`}
          alt={`${locale === 'fr' ? 'Aperçu de' : 'Preview of'} ${project.name}`}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
        />
        <span className={styles.visualCaption}>{project.tags[0]}</span>
        <span className={`${styles.shape} ${styles.shapeOne}`} />
        <span className={`${styles.shape} ${styles.shapeTwo}`} />
      </div>
      <div className={styles.meta}>
        <div className={styles.metaTags}>
          {project.tags.map((tag) => <span key={tag} className={styles.metaTag}>{tag}</span>)}
        </div>
        <span><span className={styles.statusDot} /> {project.siteUrl ? text.online : text.github}</span>
      </div>
      <h3 className={styles.title}>{project.name}</h3>
      <p className={styles.description}>{project.description[locale]}</p>
      <div className={styles.footer}>
        <a href={project.siteUrl || project.repositoryUrl} target="_blank" rel="noreferrer" data-analytics-link={`${project.id}_${project.siteUrl ? 'website' : 'repository'}`}>
          {project.siteUrl ? text.visit : text.view} <ArrowUpRight size={15} />
        </a>
        <span className={styles.repoActions}>
          <a href={project.repositoryUrl} target="_blank" rel="noreferrer" aria-label={`GitHub ${project.name}`} data-analytics-link={`${project.id}_repository`}><Github size={16} /></a>
        </span>
      </div>
    </article>
  );
}
