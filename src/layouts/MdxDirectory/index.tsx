import BgDots from '@components/backgrounds/BgDots';
import styles from './s.module.scss';
import TurboCard from '@components/stdlib/card/TurboCard';
import RandomizeText from '@components/textfx/randomize';

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

export default function MdxDirectory({
  mdxData,
}: {
  mdxData: MdxDirectoryMeta;
}) {
  console.log(mdxData);
  return (
    <BgDots className={styles.background}>
      <h1>{mdxData.directoryTitle}</h1>
      <h2>{mdxData.directoryDescription}</h2>
      <div className={styles.highlightsDiv}>
        {mdxData.pages.map(page => {
          return (
            <TurboCard className={styles.card} key={page.id}>
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
            </TurboCard>
          );
        })}
      </div>
    </BgDots>
  );
}
