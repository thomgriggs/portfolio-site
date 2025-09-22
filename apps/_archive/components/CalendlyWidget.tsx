'use client';

import { useEffect } from 'react';

interface CalendlyWidgetProps {
  username: string;
  eventTypeId?: string;
  prefill?: {
    name?: string;
    email?: string;
  };
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
  };
  className?: string;
}

export default function CalendlyWidget({ 
  username, 
  eventTypeId, 
  prefill, 
  utm, 
  className = '' 
}: CalendlyWidgetProps) {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const openCalendly = () => {
    if (typeof window !== 'undefined' && (window as unknown as { Calendly: { initPopupWidget: (options: unknown) => void } }).Calendly) {
      (window as unknown as { Calendly: { initPopupWidget: (options: unknown) => void } }).Calendly.initPopupWidget({
        url: `https://calendly.com/${username}${eventTypeId ? `/${eventTypeId}` : ''}`,
        prefill,
        utm,
      });
    }
  };

  return (
    <button
      onClick={openCalendly}
      className={`inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors ${className}`}
    >
      📅 Book a Call
    </button>
  );
}

// Inline Calendly widget component
export function CalendlyInline({ 
  username, 
  eventTypeId, 
  prefill, 
  utm, 
  className = '' 
}: CalendlyWidgetProps) {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const calendlyUrl = `https://calendly.com/${username}${eventTypeId ? `/${eventTypeId}` : ''}`;
  const params = new URLSearchParams();
  
  if (prefill?.name) params.append('name', prefill.name);
  if (prefill?.email) params.append('email', prefill.email);
  if (utm?.utmCampaign) params.append('utm_campaign', utm.utmCampaign);
  if (utm?.utmSource) params.append('utm_source', utm.utmSource);
  if (utm?.utmMedium) params.append('utm_medium', utm.utmMedium);

  const fullUrl = `${calendlyUrl}?${params.toString()}`;

  return (
    <div className={`calendly-inline-widget ${className}`} data-url={fullUrl} style={{ minWidth: '320px', height: '700px' }}>
      <div className="calendly-spinner">
        <div className="calendly-bounce1"></div>
        <div className="calendly-bounce2"></div>
        <div className="calendly-bounce3"></div>
      </div>
    </div>
  );
}
