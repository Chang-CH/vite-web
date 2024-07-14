import TurboCard from '@components/stdlib/card/TurboCard';
import styles from './s.module.scss';
import BgDots from '@components/backgrounds/BgDots';

function Projects() {
  return (
    <div className={styles.rootContainer}>
      <TurboCard className={styles.cardProject}>
        <h2>Home server</h2>
        <p>
          An old laptop serving as a home server, running a variety of docker
          compose services.
        </p>
      </TurboCard>
      <TurboCard className={styles.cardProject}>
        <h2>Java-slang</h2>
        <p>
          An implementation of the Java Virtual Machine, written in typescript.
        </p>
      </TurboCard>
      <a href="hireside.co">
        <TurboCard className={styles.cardProject}>
          <h2>Hireside</h2>
          <p>
            Submission for the Venture Initiation Program at NUS. A platform
            that provides instant price estimates for contract services using
            historical data.
          </p>
        </TurboCard>
      </a>
      <BgDots />
    </div>
  );
}

export default Projects;
