import React from 'react';
export const Card = ({ title, description, className }) => (<div className={`bg-primary text-secondary p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${className}`}>
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-base">{description}</p>
  </div>);
