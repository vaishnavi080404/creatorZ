import React from 'react';
export const Grid = ({ columns, gap = '6', children }) => {
    const columnClass = `grid-cols-${columns}`;
    const gapClass = `gap-${gap}`;
    return (<div className={`grid ${columnClass} ${gapClass} w-full`}>{children}</div>);
};
