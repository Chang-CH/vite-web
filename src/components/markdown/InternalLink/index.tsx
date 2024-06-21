import { Link } from 'react-router-dom';

export default function InternalLink({
  to,
  text,
  children,
  ...properties
}: {
  to: string;
  text?: string;
  children?: any;
  style?: any;
}) {
  return (
    <Link to={to} {...properties}>
      {text}
      {children}
    </Link>
  );
}
