import mermaid from 'mermaid';
import CodeBlock from '../CodeBlock';
import GithubLink from '../Links/GithubLink';
import InternalLink from '../Links/InternalLink';
import MarkdownImage from '../MarkdownImage';
import SideGrid from '../SideGrid';
import styles from './s.module.scss';
import { useLoaderData } from 'react-router-dom';
import Mermaid from '../Mermaid';

function MarkdownArticle({
  Layout,
}: {
  Layout?: React.FC<{ children: React.ReactNode }>;
  path?: string;
}) {
  const { MDXContent, CustomComponents } = useLoaderData() as any;
  mermaid.initialize({});

  const Wrapper: React.FC<{
    children: React.ReactNode;
  }> =
    Layout ??
    ((props: any) => {
      return <>{props.children}</>;
    });

  return (
    <Wrapper>
      <MDXContent
        components={{
          pre: (props: any) => {
            if (props.className === 'mermaid') {
              return <Mermaid chart={props.children} {...props} />;
            }
            return <code {...props} className={styles.code} />;
          },
          InternalLink,
          GithubLink,
          SideGrid,
          img: MarkdownImage,
          h1: (props: any) => <h1 {...props} className={styles.h1} />,
          code: CodeBlock,
          ...CustomComponents,
        }}
      />
    </Wrapper>
  );
}

export default MarkdownArticle;
