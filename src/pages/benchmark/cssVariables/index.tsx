import { useRef, useState } from 'react';
import styles from './s.module.scss';

export default function CssVariableBenchmark() {
  const leftCol = useRef(true);
  const [rightCol, setRightCol] = useState(true);
  return (
    <>
      <div className={styles.flex}>
        <div className={styles.grid}>
          {Array.from({ length: ELEMENT_COUNT * ELEMENT_COUNT }).map(
            (_, index) => (
              <div key={index} className={styles.squareVariable} />
            )
          )}
        </div>
        <div className={styles.grid}>
          {Array.from({ length: ELEMENT_COUNT * ELEMENT_COUNT }).map(
            (_, index) => (
              <div
                // @ts-expect-error only use id here
                id={styles.squareStatic}
                key={index}
                style={{
                  backgroundColor: rightCol ? 'orange' : 'pink',
                }}
              />
            )
          )}
        </div>
      </div>
      <div className={styles.flex}>
        <button
          onClick={() => {
            leftCol.current = !leftCol.current;
            document.documentElement.style.setProperty(
              '--square-color',
              leftCol.current ? 'cyan' : 'red'
            );
          }}
        >
          change left
        </button>
        <button
          onClick={() => {
            setRightCol(!rightCol);
          }}
        >
          change right
        </button>
      </div>
    </>
  );
}

const ELEMENT_COUNT = 100;
