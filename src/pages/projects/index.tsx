import TurboCard from '@components/stdlib/card/TurboCard';
import styles from './s.module.scss';
import BgDots from '@components/backgrounds/BgDots';

function Projects() {
  return (
    <div className={styles.rootContainer}>
      <a
        href="http://dreadnought-ubuntu:8000"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TurboCard>
          <h2>Home server</h2>
          <p>
            An old laptop serving as a home server, running a variety of docker
            compose services.
          </p>
        </TurboCard>
        <TurboCard>
          <h2>Java-slang</h2>
          <p>
            An implementation of the Java Virtual Machine, written in
            typescript.
          </p>
        </TurboCard>
        <TurboCard>
          <h2>UBS Coding challenge</h2>
          <p>
            UBS Coding challenge setup for team ColonWQ (2nd Runner Up), using a
            NodeJS server and a Flask server.
          </p>
        </TurboCard>
      </a>
      <BgDots />
    </div>
  );
}

export default Projects;
