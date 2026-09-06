import React from 'react';
import Link from 'next/link';
export const Button = ({ href = '#', children, className }) => (<Link href={href} className={`inline-block bg-primary text-secondary font-bold py-3 px-6 rounded hover:bg-secondary hover:text-primary transition-colors ${className}`}>
    {children}
  </Link>);
