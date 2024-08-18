import BrutalistCard from './BrutalistCard';
import TurboCard from './TurboCard';

export enum CardVariant {
  BRUTALIST,
  TURBO,
}

export default function Card({
  variant,
  ...props
}: {
  variant: CardVariant;
  children: React.ReactNode;
  [key: string]: any;
}) {
  switch (variant) {
    case CardVariant.BRUTALIST:
      return <BrutalistCard {...props} />;
    case CardVariant.TURBO:
      return <TurboCard {...props} />;
    default:
      return <TurboCard {...props} />;
  }
}
