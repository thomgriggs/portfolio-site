interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export default function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <h3 className={`text-lg font-medium leading-tight ${className}`}>
      {children}
    </h3>
  );
}
