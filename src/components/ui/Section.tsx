import React from 'react';

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className }) => (
  <section className={`max-w-5xl mx-auto py-16 px-4 ${className}`} >
    {title && (
      <h2 className="text-4xl font-bold text-primary mb-8 text-center">
        {title}
      </h2>
    )}
    {children}
  </section>
);
