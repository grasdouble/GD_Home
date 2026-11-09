import { ArrowDown } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero({ headline, intro, explore, illustrationLabel }) {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.copy}>
        <h1>{headline}</h1>
        <p className={styles.intro}>{intro}</p>
        <a className={styles.exploreLink} href="#projets" data-analytics-link="hero_explore_projects">{explore} <ArrowDown size={15} /></a>
      </div>
      <div className={styles.art}>
        <img className={styles.heroImage} src={`${import.meta.env.BASE_URL}images/hero-panda.webp`} alt={illustrationLabel} width="1240" height="620" fetchPriority="high" decoding="async" />
      </div>
    </section>
  );
}
