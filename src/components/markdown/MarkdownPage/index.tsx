import CodeBlock from '../CodeBlock';
import GithubLink from '../Links/GithubLink';
import InternalLink from '../Links/InternalLink';
import SideGrid from '../SideGrid';
import styles from './s.module.scss';
import { useLoaderData } from 'react-router-dom';

function MarkdownArticle() {
  const { MDXContent, CustomComponents } = useLoaderData() as any;

  return (
    <div className={styles.rootContainer}>
      <MDXContent
        components={{
          code: CodeBlock,
          InternalLink,
          GithubLink,
          SideGrid,
          ...CustomComponents,
        }}
      />
    </div>
  );
}

export default MarkdownArticle;
