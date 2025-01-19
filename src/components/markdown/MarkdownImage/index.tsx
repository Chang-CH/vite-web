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
  if (src.endsWith('.mp4')) {
    return (
      <video controls className={styles.img} {...props}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
  return <img src={src} alt={alt} className={styles.img} {...props} />;
}
