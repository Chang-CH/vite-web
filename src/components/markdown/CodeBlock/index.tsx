import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
      {...properties}
      style={atomOneDark}
    />
  ) : (
    <code className={className} {...properties} />
  );
}
