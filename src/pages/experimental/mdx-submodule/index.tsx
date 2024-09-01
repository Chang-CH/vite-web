import styles from './s.module.scss';
import BgDots from '@components/backgrounds/BgDots';
import { useEffect, useState } from 'react';

type GithubResponse = {
  name: string;
  description: string;
  type: string;
};
function MdxModule() {
  const [fetchResult, setFetchResult] = useState<Array<GithubResponse>>([]);

  useEffect(() => {
    fetch('https://api.github.com/repos/Chang-CH/markdown/contents/src')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        return data;
      })
      .then(data => setFetchResult(data));

    fetch(
      'https://api.github.com/repos/Chang-CH/markdown/contents/src/frontmatter.mdx'
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        return data;
      });
  }, []);

  return (
    <BgDots className={styles.rootContainer}>
      <h1>Mdx module test url</h1>
      {fetchResult.map((item, index) => {
        return (
          <div key={index}>
            <p>{`${item.name}`}</p>
          </div>
        );
      })}
    </BgDots>
  );
}

export default MdxModule;
