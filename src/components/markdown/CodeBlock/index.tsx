import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './s.module.css';

export default function CodeBlock({
  className,
  ...properties
}: {
  className: string;
  children: any;
}) {
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <SyntaxHighlighter
      language={match[1]}
      PreTag="div"
      className={`${className}`}
      {...properties}
      style={atomOneDark}
    />
  ) : (
    <code className={`${styles.noLanguage} ${className}`} {...properties} />
  );
}
