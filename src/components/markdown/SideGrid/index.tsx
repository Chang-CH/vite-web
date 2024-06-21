import styles from './s.module.scss';

export default function SideGrid({ children }: { children?: any }) {
  return <div className={styles.side}>{children}</div>;
}
