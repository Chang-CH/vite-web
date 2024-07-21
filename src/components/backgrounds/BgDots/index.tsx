type PageProps = {
  dotColour?: string;
  bgColour?: string;
  dotRadius?: string;
  dotSpacing?: string;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  otherProps?: {
    [key: string]: any;
  };
};

// Maybe we can set default classname, then inject styles if changed
const BgDots = ({
  dotColour = '#333',
  bgColour = '#111',
  dotRadius = '2px',
  dotSpacing = '40px',
  style,
  className,
  children,
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
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default BgDots;
