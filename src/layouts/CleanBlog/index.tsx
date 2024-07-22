import BgDots from '@components/backgrounds/BgDots';
import styles from './s.module.scss';

export default function CleanBlog({ children }: { children: React.ReactNode }) {
  return (
    <BgDots className={styles.background}>
      <div className={styles.divContent}>{children}</div>
    </BgDots>
  );
}
