'use client';

interface LogoProps {
  variant?: 'default' | 'minimal' | 'modern' | 'creative' | 'professional' | 'experimental' | 'handwritten' | 'tech' | 'elegant' | 'bold' | 'futuristic' | 'vintage';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  textColor?: 'dark' | 'light';
}

export default function Logo({ 
  variant = 'default', 
  size = 'md', 
  showText = true, 
  className = '',
  textColor = 'dark'
}: LogoProps) {
  const renderIcon = () => {
    const iconClass = `logo-icon logo-icon-${size}`;
    
    switch (variant) {
      case 'minimal':
        return (
          <div className={`${iconClass} logo-minimal`}>
            <span className="logo-text">TG</span>
          </div>
        );
      
      case 'modern':
        return (
          <div className={`${iconClass} logo-modern`}>
            <span className="logo-text">TG</span>
          </div>
        );
      
      case 'creative':
        return (
          <div className={`${iconClass} logo-creative`}>
            <span className="logo-text">TG</span>
          </div>
        );
      
      case 'professional':
        return (
          <div className={`${iconClass} logo-professional`}>
            <span className="logo-text">TG</span>
          </div>
        );
      
      case 'experimental':
        return (
          <div className={`${iconClass} logo-experimental`}>
            <span className="logo-text">TG</span>
          </div>
        );

      case 'handwritten':
        return (
          <div className={`${iconClass} logo-handwritten`}>
            <span className="logo-text">TG</span>
          </div>
        );

      case 'tech':
        return (
          <div className={`${iconClass} logo-tech`}>
            <span className="logo-text">TG</span>
          </div>
        );

      case 'elegant':
        return (
          <div className={`${iconClass} logo-elegant`}>
            <span className="logo-text">TG</span>
          </div>
        );

      case 'bold':
        return (
          <div className={`${iconClass} logo-bold`}>
            <span className="logo-text">TG</span>
          </div>
        );

      case 'futuristic':
        return (
          <div className={`${iconClass} logo-futuristic`}>
            <span className="logo-text">TG</span>
          </div>
        );

      case 'vintage':
        return (
          <div className={`${iconClass} logo-vintage`}>
            <span className="logo-text">TG</span>
          </div>
        );

      default:
        return (
          <div className={`${iconClass} logo-default`}>
            <span className="logo-text">TG</span>
          </div>
        );
    }
  };

  const renderText = () => {
    if (!showText) return null;

    const textClass = `logo-brand-text logo-brand-text-${size} logo-brand-text-${textColor}`;

    switch (variant) {
      case 'minimal':
        return (
          <span className={`${textClass} logo-minimal-text`}>
            thomgriggs
          </span>
        );
      
      case 'modern':
        return (
          <span className={`${textClass} logo-modern-text`}>
            thomgriggs
          </span>
        );
      
      case 'creative':
        return (
          <span className={`${textClass} logo-creative-text`}>
            thomgriggs
          </span>
        );
      
      case 'professional':
        return (
          <span className={`${textClass} logo-professional-text`}>
            thomgriggs
          </span>
        );
      
      case 'experimental':
        return (
          <span className={`${textClass} logo-experimental-text`}>
            thomgriggs
          </span>
        );

      case 'handwritten':
        return (
          <span className={`${textClass} logo-handwritten-text`}>
            thomgriggs
          </span>
        );

      case 'tech':
        return (
          <span className={`${textClass} logo-tech-text`}>
            thomgriggs
          </span>
        );

      case 'elegant':
        return (
          <span className={`${textClass} logo-elegant-text`}>
            thomgriggs
          </span>
        );

      case 'bold':
        return (
          <span className={`${textClass} logo-bold-text`}>
            thomgriggs
          </span>
        );

      case 'futuristic':
        return (
          <span className={`${textClass} logo-futuristic-text`}>
            thomgriggs
          </span>
        );

      case 'vintage':
        return (
          <span className={`${textClass} logo-vintage-text`}>
            thomgriggs
          </span>
        );

      default:
        return (
          <span className={`${textClass} logo-default-text`}>
            thomgriggs
          </span>
        );
    }
  };

  return (
    <div className={`logo-container ${className}`}>
      {renderIcon()}
      {renderText()}
    </div>
  );
}
