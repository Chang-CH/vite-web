import BgDots from '@components/backgrounds/BgDots';
import styles from './s.module.scss';
import TurboCard from '@components/stdlib/card/TurboCard';
import Tag from '@components/stdlib/tag';
import { FaClock } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';

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
  mdxData?: MdxDirectoryMeta;
}) {
  const loaderData = useLoaderData() as any;

  const data: MdxDirectoryMeta =
    mdxData ?? (loaderData.loaderMdxData as MdxDirectoryMeta);

  return (
    <BgDots className={styles.background}>
      <h1>{data.directoryTitle}</h1>
      <h2>{data.directoryDescription}</h2>
      <div className={styles.highlightsDiv}>
        {data.pages.map(page => {
          return (
            <TurboCard className={styles.card} key={page.id}>
              {page.banner ? (
                <img src={page.banner} className={styles.cardBanner} />
              ) : null}
              <div className={styles.cardContent}>
                <a href={page.route}>
                  <h2>{page.title}</h2>
                </a>
                <Tag
                  LeadingIcon={FaClock}
                  text={new Date(page.createdAt * 1000)
                    .toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: '2-digit',
                    })
                    .toString()}
                />
                <p>{page.description}</p>
              </div>
            </TurboCard>
          );
        })}
      </div>
    </BgDots>
  );
}
