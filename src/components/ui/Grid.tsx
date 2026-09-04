import React from 'react';

interface GridProps {
  columns: number;
  gap?: string; // Tailwind gap size, e.g., '8' => 'gap-8'
  children: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({ columns, gap = '6', children }) => {
  const columnClass = `grid-cols-${columns}`;
  const gapClass = `gap-${gap}`;
  return (
    <div className={`grid ${columnClass} ${gapClass} w-full`}>{children}</div>
  );
};
