import { FaGithub } from 'react-icons/fa';
import styles from './s.module.scss';

export default function GithubLink({ link }: { link: string }) {
  return (
    <a href={link} className={styles.socialLink}>
      <FaGithub size={28} />
    </a>
  );
}
