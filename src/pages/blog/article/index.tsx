import styles from './s.module.scss';
import { useLoaderData } from 'react-router-dom';

function BlogArticle() {
  const { MDXContent } = useLoaderData() as any;

  return (
    <div className={styles.rootContainer}>
      <MDXContent />
    </div>
  );
}

export default BlogArticle;
