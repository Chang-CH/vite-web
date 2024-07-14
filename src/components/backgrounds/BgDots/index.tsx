type PageProps = {
  dotColour?: string;
  bgColour?: string;
  dotRadius?: string;
  dotSpacing?: string;
  style?: React.CSSProperties;
  className?: string;
  otherProps?: {
    [key: string]: string;
  };
};

const BgDots = ({
  dotColour = '#333',
  bgColour = '#111',
  dotRadius = '2px',
  dotSpacing = '40px',
  style,
  className,
  ...otherProps
}: PageProps) => {
  return (
    <div
      {...otherProps}
      className={`${className ?? ''}`}
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, ${
          dotColour ?? ''
        }  ${dotRadius ?? '1px'}, ${bgColour ?? ''} 0)`,
        backgroundSize: `${dotSpacing ?? '40px'} ${dotSpacing ?? '40px'}`,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -999,
        top: 0,
        left: 0,
        ...style,
      }}
    />
  );
};

export default BgDots;
