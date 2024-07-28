import styles from './s.module.scss';

export default function MarkdownImage({
  src,
  alt,
  ...props
}: {
  src: string;
  alt: string;
  props?: any;
}) {
  return <img src={src} alt={alt} className={styles.img} {...props} />;
}
