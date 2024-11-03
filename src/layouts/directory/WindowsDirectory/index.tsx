import styles from './s.module.scss';
import RandomizeText from '@components/textfx/randomize';
import WindowsCard from '@components/stdlib/card/WindowsCard';

type MdxDirectoryMeta = {
  directoryTitle: string;
  directoryDescription: string;
  pages: Array<{
    id: number;
    isMdx: boolean;
    isFolder: boolean;
    createdAt: number;
    modifiedAt: number;
    route: string;

    title: string;
    description?: string;
    icon?: string;
    banner?: string;
    tags?: Array<string>;
  }>;
};

export default function WindowsDirectory({
  mdxData,
}: {
  mdxData: MdxDirectoryMeta;
}) {
  console.log(mdxData);
  return (
    <div className={styles.background}>
      <h1>{mdxData.directoryTitle}</h1>
      <h2>{mdxData.directoryDescription}</h2>
      <div className={styles.highlightsDiv}>
        {mdxData.pages.map(page => {
          return (
            <WindowsCard className={styles.card} key={page.id}>
              {page.banner ? (
                <img src={page.banner} className={styles.cardBanner} />
              ) : null}
              <div className={styles.cardContent}>
                <a href={page.route}>
                  <RandomizeText loops={3}>{page.title}</RandomizeText>
                </a>
                <p>{page.description}</p>
                <p>{new Date(page.createdAt * 1000).toLocaleString()}</p>
              </div>
            </WindowsCard>
          );
        })}
      </div>
    </div>
  );
}
