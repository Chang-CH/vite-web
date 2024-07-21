import StackSpinner from '@components/stdlib/loader/StackSpinner';
import styles from './s.module.scss';

export default function Loading() {
  return (
    <div className={styles.loadDiv}>
      <StackSpinner />
    </div>
  );
}
