import { useCallback, useEffect, useRef } from 'react';
import styles from './s.module.scss';
import { throttle } from 'lodash';

// isolate the client component so children of background do not need to be client component
const BgBlob = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactElement;
  [key: string]: any;
}) => {
  const blobRef = useRef<HTMLDivElement>(null);
  const moveBlob = useCallback(
    throttle((e: MouseEvent) => {
      blobRef.current?.animate(
        {
          left: `${e.clientX + window.scrollX}px`,
          top: `${e.clientY + window.scrollY}px`,
        },
        {
          duration: 5000,
          fill: 'forwards',
        }
      );
    }, 300),
    [blobRef.current]
  );

  useEffect(() => {
    document.onmousemove = moveBlob;
  });

  console.log();

  return (
    <div
      className={
        className ? className + ' ' + styles.divContainer : styles.divContainer
      }
      {...props}
    >
      {children}
      <div className={styles.divBlur} />
      <div className={styles.divBlob} ref={blobRef} />
    </div>
  );
};

export default BgBlob;
