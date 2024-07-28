import CodeBlock from '../CodeBlock';
import GithubLink from '../Links/GithubLink';
import InternalLink from '../Links/InternalLink';
import MarkdownImage from '../MarkdownImage';
import SideGrid from '../SideGrid';
import styles from './s.module.scss';
import { useLoaderData } from 'react-router-dom';

function MarkdownArticle({
  Layout,
}: {
  Layout?: React.FC<{ children: React.ReactNode }>;
  path?: string;
}) {
  const { MDXContent, CustomComponents } = useLoaderData() as any;

  if (Layout) {
    return (
      <Layout>
        <MDXContent
          components={{
            code: CodeBlock,
            InternalLink,
            GithubLink,
            SideGrid,
            img: MarkdownImage,
            ...CustomComponents,
          }}
        />
      </Layout>
    );
  }
  return (
    <div className={styles.rootContainer}>
      <MDXContent
        components={{
          code: CodeBlock,
          InternalLink,
          GithubLink,
          SideGrid,
          img: MarkdownImage,
          ...CustomComponents,
        }}
      />
    </div>
  );
}

export default MarkdownArticle;
