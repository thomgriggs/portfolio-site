interface KickerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Kicker({ children, className = "" }: KickerProps) {
  return (
    <div className={`text-sm uppercase tracking-wide text-muted ${className}`}>
      {children}
    </div>
  );
}


