import TurboCard from '@components/stdlib/card/TurboCard';
import styles from './s.module.scss';
import BgDots from '@components/backgrounds/BgDots';

function About() {
  return (
    <div className={styles.rootContainer}>
      <a
        href="http://dreadnought-ubuntu:8000"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TurboCard>
          <h2>Yacht</h2>
          <p>Docker container monitoring</p>
        </TurboCard>
      </a>
      <BgDots />
    </div>
  );
}

export default About;
