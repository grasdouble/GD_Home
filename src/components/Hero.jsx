import { ArrowDown } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero({ headline, intro, explore, made, illustrationLabel }) {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.copy}>
        <h1>{headline}</h1>
        <p className={styles.intro}>{intro}</p>
        <a className={styles.exploreLink} href="#projets">{explore} <ArrowDown size={15} /></a>
      </div>
      <div className={styles.art} aria-label={illustrationLabel} role="img">
        <div className={`${styles.orbit} ${styles.orbitOne}`} />
        <div className={`${styles.orbit} ${styles.orbitTwo}`} />
        <div className={styles.sun} />
        <div className={`${styles.artCard} ${styles.cardBack}`} />
        <div className={`${styles.artCard} ${styles.cardFront}`}><span>G.</span><i /><i /><i /></div>
        <div className={`${styles.spark} ${styles.sparkA}`}>✳</div>
        <div className={`${styles.spark} ${styles.sparkB}`}>✳</div>
        <div className={styles.artLabel}>{made}</div>
      </div>
    </section>
  );
}
