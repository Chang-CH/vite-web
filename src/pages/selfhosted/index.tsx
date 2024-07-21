import TurboCard from '@components/stdlib/card/TurboCard';
import styles from './s.module.scss';
import BgDots from '@components/backgrounds/BgDots';

function Selfhosted() {
  return (
    <BgDots className={styles.rootContainer}>
      <a href="http://WIP:8000" target="_blank" rel="noopener noreferrer">
        <TurboCard>
          <h2>About</h2>
          <p>How, why, and everything else.</p>
        </TurboCard>
      </a>
      <a href="http://WIP:8000" target="_blank" rel="noopener noreferrer">
        <TurboCard>
          <h2>Setup</h2>
          <p>Getting the machine up and running</p>
        </TurboCard>
      </a>
      <a href="http://WIP:8000" target="_blank" rel="noopener noreferrer">
        <TurboCard>
          <h2>Services setup</h2>
          <p>Setup guides for individual services</p>
        </TurboCard>
      </a>
    </BgDots>
  );
}

export default Selfhosted;
