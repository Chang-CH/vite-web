import TurboCard from '@components/stdlib/card/TurboCard';
import styles from './s.module.scss';
import BgDots from '@components/backgrounds/BgDots';
import { Link } from 'react-router-dom';

function Selfhosted() {
  return (
    <BgDots className={styles.rootContainer}>
      <h1>Self hosted server</h1>
      <div className={styles.cardContainer}>
        <Link to="/selfhosted/about" className={styles.cardLink}>
          <TurboCard className={styles.cardProject}>
            <h2>About</h2>
            <p>How, why, and everything else.</p>
          </TurboCard>
        </Link>
        <Link to="/selfhosted/setup" className={styles.cardLink}>
          <TurboCard className={styles.cardProject}>
            <h2>Setup</h2>
            <p>Getting the machine up and running</p>
          </TurboCard>
        </Link>
        <Link to="/selfhosted/setup" className={styles.cardLink}>
          <TurboCard className={styles.cardProject}>
            <h2>Services setup</h2>
            <p>Setup guides for individual services</p>
          </TurboCard>
        </Link>
      </div>
    </BgDots>
  );
}

export default Selfhosted;
