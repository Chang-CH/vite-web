import WindowsButton from '@components/stdlib/button/WindowsButton';
import styles from './s.module.css';
import { ImExit } from 'react-icons/im';

const WindowsCard = ({
  children,
  className,
  style,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  style?: {
    [key: string]: any;
  };
  rest?: {
    [key: string]: any;
  };
}) => {
  return (
    <div
      className={
        className ? `${styles.container} ${className}` : styles.container
      }
      style={style}
      {...rest}
    >
      <div className={styles.header}>
        <h2 className={styles.headerText}>Title</h2>
        <WindowsButton className={styles.headerButton}>
          <ImExit />
        </WindowsButton>
      </div>
      {children}
    </div>
  );
};

export default WindowsCard;
