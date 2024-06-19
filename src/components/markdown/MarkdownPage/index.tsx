import CodeBlock from '../CodeBlock';
import styles from './s.module.scss';
import { useLoaderData } from 'react-router-dom';

function MarkdownArticle() {
  const { MDXContent, CustomComponents } = useLoaderData() as any;

  return (
    <div className={styles.rootContainer}>
      <MDXContent components={{ code: CodeBlock, ...CustomComponents }} />
    </div>
  );
}

export default MarkdownArticle;
