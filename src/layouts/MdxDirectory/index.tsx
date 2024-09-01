import BgDots from '@components/backgrounds/BgDots';
import styles from './s.module.scss';

type MdxDirectoryMeta = {
  directoryTitle: string;
  directoryDescription: string;
  pages: Array<{
    title: string;
    id: number;
    isMdx: boolean;
    isFolder: boolean;
    createdAt: number;
    modifiedAt: number;
    route: string;
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
      <ul>
        {mdxData.pages.map(page => {
          return (
            <li key={page.id}>
              <a href={page.route}>{page.title}</a>
              <p>{page.createdAt}</p>
            </li>
          );
        })}
      </ul>
    </BgDots>
  );
}
