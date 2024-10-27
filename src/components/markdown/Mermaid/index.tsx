import React, { useEffect } from 'react';
import mermaid from 'mermaid';
import style from './s.module.scss';

export default function Mermaid(props: { chart: any }) {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  return (
    <div className={`mermaid ${style.mermaidContainer}`}>{props.chart}</div>
  );
}
