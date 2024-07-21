import TurboCard from '@components/stdlib/card/TurboCard';
import styles from './s.module.scss';
import BgDots from '@components/backgrounds/BgDots';
import { Link } from 'react-router-dom';

function Projects() {
  return (
    <BgDots className={styles.rootContainer}>
      <h1>Projects</h1>
      <div className={styles.cardContainer}>
        <Link to="/selfhosted" className={styles.cardLink}>
          <TurboCard className={styles.cardProject}>
            <h2>Home server</h2>
            <p>An old laptop with port forwarded docker services.</p>
          </TurboCard>
        </Link>
        <Link
          to={{ pathname: 'https://github.com/source-academy/java-slang' }}
          target="_blank"
          className={styles.cardLink}
        >
          <TurboCard className={styles.cardProject}>
            <h2>Java-slang</h2>
            <p>
              An implementation of the Java Virtual Machine, written in
              typescript.
            </p>
          </TurboCard>
        </Link>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hireside.co"
          className={styles.cardLink}
        >
          <TurboCard className={styles.cardProject}>
            <h2>Hireside</h2>
            <p>
              A platform that provides price estimates for contract services.
            </p>
          </TurboCard>
        </a>
      </div>
    </BgDots>
  );
}

export default Projects;
