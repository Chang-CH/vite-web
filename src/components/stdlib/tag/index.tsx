import styles from './s.module.css';

export default function Tag({
  text,
  LeadingIcon,
  ...props
}: {
  text: string;
  LeadingIcon?: React.FC;
  [key: string]: any;
}) {
  return (
    <div className={styles.tag} {...props}>
      {LeadingIcon ? <LeadingIcon /> : null}
      {text}
    </div>
  );
}
