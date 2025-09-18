'use client';

import React from 'react';

interface Service {
  id: string;
  question: string;
}

interface ServiceButtonsProps {
  services: Service[];
}

export default function ServiceButtons({ services }: ServiceButtonsProps) {
  const handleServiceClick = (serviceId: string) => {
    const element = document.getElementById(`answer-${serviceId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="services-grid">
      {services.map((service) => (
        <div
          key={service.id}
          className="service-button"
          onClick={() => handleServiceClick(service.id)}
        >
          <h3 className="service-question">
            {service.question}
          </h3>
        </div>
      ))}
    </div>
  );
}




