import styles from './s.module.scss';
import BgBlob from '@components/backgrounds/BgBlob';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.splashContainer}>
        <div className={styles.splashText}>
          <div>
            <h1 className="text-8xl">Chuan</h1>
            <h2>Web + Mobile Frontend | OKX</h2>
            <div className={styles.divSocials}>
              <a
                href="https://www.linkedin.com/in/chuan-hao-c-57b096208/"
                className={styles.socialLink}
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="https://github.com/Chang-CH"
                className={styles.socialLink}
              >
                <FaGithub size={28} />
              </a>
            </div>
            <div className={styles.divLinks}>
              <Link to="/projects">
                <p className={styles.textLink}>projects</p>
              </Link>
              <Link to="/selfhosted">
                <p className={styles.textLink}>self-hosted</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <BgBlob />
    </div>
  );
}

export default App;
